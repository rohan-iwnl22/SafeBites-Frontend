import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Upload() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();


  console.log(`IMAGE: ${image}`)
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

  const fetchDetails = async (imageUri: string) => {
    setLoading(true);
    
    try {
      // Check if the image is a base64 data URI
      if (imageUri.startsWith('data:image/')) {
        // Extract the base64 data - remove the prefix
        const base64Data = imageUri.split(',')[1];
        
        // Create a file from the base64 data
        const filename = 'photo.jpg'; // Default name since we don't have a real filename
        
        // Determine the file type from the data URI
        const match = imageUri.match(/data:image\/(\w+);base64,/);
        const fileType = match ? match[1] : 'jpeg';
        
        // Create FormData
        const formData = new FormData();
        
        // Convert base64 to blob
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        
        const blob = new Blob(byteArrays, { type: `image/${fileType}` });
        
        // Append the blob to FormData
        formData.append('image', blob, filename);
        
        console.log('Sending base64 image as file:', filename);
        
        const uploadResponse = await fetch('http://127.0.0.1:5000/extract', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error('Error response:', errorText);
          throw new Error(`Server responded with ${uploadResponse.status}: ${errorText}`);
        }
        
        const data = await uploadResponse.json();
        return data;
      } 
      else {
        // Handle as a file URI (your existing code)
        const filename = imageUri.split('/').pop() || 'photo.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';
        
        // Create FormData
        const formData = new FormData();
        
        // Add the file to FormData
        formData.append('image', {
          uri: imageUri,
          type: type,
          name: filename,
        } as any);
        
        console.log('Sending file URI image:', filename);
        
        const uploadResponse = await fetch('http://127.0.0.1:5000/extract', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error('Error response:', errorText);
          throw new Error(`Server responded with ${uploadResponse.status}: ${errorText}`);
        }
        
        const data = await uploadResponse.json();
        return data;
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    const resultData = await fetchDetails(image);

    if (resultData) {
      router.push({
        pathname: '/results',
        params: {
          results: JSON.stringify(resultData),
        },
      });
    }
  };

  return (
    <LinearGradient colors={['#1E1E2F', '#2E2E4D']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInDown" delay={200} style={styles.header}>
          <Text style={styles.title}>Upload a Label</Text>
          <Text style={styles.subtitle}>
            Choose a food label image to analyze its ingredients
          </Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400} style={styles.glassContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
            <Ionicons name="image-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>

          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} resizeMode="contain" />
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!image || loading}
            style={[styles.submitButton, { opacity: image && !loading ? 1 : 0.6 }]}>
            <Ionicons name="checkmark-done" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>
              {loading ? 'Analyzing...' : 'Submit & View Results'}
            </Text>
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
