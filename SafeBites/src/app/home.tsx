import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.85)', 'rgba(236, 72, 153, 0.95)']}
          style={styles.gradientOverlay}
        >
          <View style={styles.container}>
            
            {/* Logo Section */}
            <Animatable.View
              animation="fadeInDown"
              delay={200}
              duration={1000}
              style={styles.headerContainer}
            >
              <View style={styles.logoContainer}>
                <FontAwesome name="cutlery" size={30} color="#fff" style={styles.logoIcon} />
                <Text style={styles.logoText}>SafeBites</Text>
              </View>
            </Animatable.View>

            {/* Main Content */}
            <Animatable.View
              animation="zoomIn"
              delay={500}
              duration={1200}
              style={styles.mainContent}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.glassCard}
              >
                <Text style={styles.welcomeText}>Welcome!!</Text>
                <Text style={styles.titleText}>
                  Know Your{'\n'}Food{'\n'}With Ease
                </Text>
              </LinearGradient>
            </Animatable.View>

            {/* Button Section */}
            <Animatable.View
              animation="fadeInUp"
              delay={1000}
              duration={1000}
              style={styles.buttonContainer}
            >
              <TouchableOpacity
                onPress={() => router.push('/HowItWorks')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.getStartedButton}
                >
                  <Text style={styles.getStartedText}>Get Started</Text>
                  <FontAwesome name="arrow-right" size={18} color="#FFF" style={styles.buttonIcon} />
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  logoIcon: {
    marginRight: 12,
  },
  logoText: {
    fontSize: 37,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  glassCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  welcomeText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 48,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  getStartedButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    width: width * 0.85,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  getStartedText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 12,
  },
});
