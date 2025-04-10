import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Upload() {
  const [image, setImage] = useState(null);
  const router = useRouter();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setImage(selectedAsset.uri);
    }
  };

  const handleSubmit = () => {
    if (!image) return;
    router.push({ pathname: '/results', params: { image } });
  };

  return (
    <LinearGradient colors={['#1E1E2F', '#2E2E4D']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInDown" delay={200} style={styles.header}>
          <Text style={styles.title}>Upload a Label</Text>
          <Text style={styles.subtitle}>Choose a food label image to analyze its ingredients</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400} style={styles.glassContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
            <Ionicons name="image-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image }}
              style={styles.imagePreview}
              resizeMode="contain"
            />
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!image}
            style={[styles.submitButton, { opacity: image ? 1 : 0.6 }]}
          >
            <Ionicons name="checkmark-done" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Submit & View Results</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  glassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  pickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    padding: 14,
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 20,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginVertical: 20,
    backgroundColor: '#ccc',
  },
});
