import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HowItWorks() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(79, 70, 229, 0.9)', 'rgba(124, 58, 237, 0.9)']}
          style={styles.gradientOverlay}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
              {/* Header */}
              <Animatable.View
                animation="fadeInDown"
                duration={800}
                style={styles.headerContainer}
              >
                <View style={styles.logoContainer}>
                  <FontAwesome name="cutlery" size={26} color="#FFF" style={styles.logoIcon} />
                  <Text style={styles.logoText}>SafeBites</Text>
                </View>
              </Animatable.View>

              {/* Banner Section */}
              <Animatable.View 
                animation="fadeIn" 
                delay={300} 
                duration={800}
                style={styles.bannerContainer}
              >
                <LinearGradient
                  colors={['#9333EA', '#7C3AED']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.banner}
                >
                  <View style={styles.bannerIconContainer}>
                    <FontAwesome name="leaf" size={50} color="#FFF" style={styles.bannerIcon} />
                  </View>
                  <Text style={styles.bannerText}>Discover What's{'\n'}Really In Your Food</Text>
                </LinearGradient>
              </Animatable.View>

              {/* How It Works Section */}
              <Animatable.View
                animation="fadeInUp"
                delay={500}
                duration={800}
                style={styles.sectionContainer}
              >
                <Text style={styles.sectionTitle}>How SafeBites Works</Text>
                
                <View style={styles.stepsContainer}>
                  <Step 
                    number="1" 
                    text="Scan any food label with your camera" 
                    icon="camera" 
                    color="#8B5CF6"
                  />
                  <Step 
                    number="2" 
                    text="Identify hidden ingredients and allergens" 
                    icon="search" 
                    color="#7C3AED"
                  />
                  <Step 
                    number="3" 
                    text="Learn about health impacts and alternatives" 
                    icon="heartbeat" 
                    color="#6D28D9"
                  />
                  <Step 
                    number="4" 
                    text="Make informed decisions about your diet" 
                    icon="check-circle" 
                    color="#5B21B6"
                  />
                </View>
              </Animatable.View>

              {/* Why Scan Food Labels Section */}
              <Animatable.View
                animation="fadeInUp"
                delay={700}
                duration={800}
                style={styles.sectionContainer}
              >
                <Text style={styles.sectionTitle}>Why Scan Food Labels?</Text>
                <View style={styles.glassCard}>
                  <Text style={styles.descriptionText}>
                    Food labels often contain hidden ingredients that can affect your health, trigger allergies, 
                    or impact dietary goals. SafeBites empowers you to understand exactly what's in your food 
                    and make choices aligned with your health needs.
                  </Text>
                </View>
              </Animatable.View>

              {/* Benefits Section */}
              <Animatable.View
                animation="fadeInUp"
                delay={900}
                duration={800}
                style={styles.sectionContainer}
              >
                <Text style={styles.sectionTitle}>Benefits of Using SafeBites</Text>
                <View style={styles.benefitsContainer}>
                  <BenefitItem 
                    icon="exclamation-triangle" 
                    text="Identify potentially harmful additives and preservatives" 
                  />
                  <BenefitItem 
                    icon="allergies" 
                    text="Avoid ingredients that trigger your specific allergies or sensitivities" 
                  />
                  <BenefitItem 
                    icon="user-md" 
                    text="Follow dietary recommendations from your healthcare provider" 
                  />
                  <BenefitItem 
                    icon="chart-line" 
                    text="Track your nutrition patterns over time with detailed insights" 
                  />
                </View>
              </Animatable.View>

              {/* Get Started Button */}
              <Animatable.View
                animation="bounceIn"
                delay={1100}
                duration={1000}
                style={styles.buttonContainer}
              >
                <TouchableOpacity
                  onPress={() => router.push('/Upload')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#9333EA', '#7C3AED']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.getStartedButton}
                  >
                    <Text style={styles.getStartedText}>Start Scanning Now</Text>
                    <FontAwesome name="arrow-right" size={18} color="#FFF" style={styles.buttonIcon} />
                  </LinearGradient>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

// Step Component
function Step({ number, text, icon, color }) {
  return (
    <View style={styles.stepContainer}>
      <LinearGradient
        colors={[color, color + 'CC']}
        style={styles.stepIconContainer}
      >
        <FontAwesome name={icon} size={18} color="#FFF" />
      </LinearGradient>
      <View style={styles.stepTextContainer}>
        <Text style={styles.stepNumber}>Step {number}</Text>
        <Text style={styles.stepText}>{text}</Text>
      </View>
    </View>
  );
}

// Benefit Item Component
function BenefitItem({ icon, text }) {
  return (
    <View style={styles.benefitContainer}>
      <View style={styles.benefitIconContainer}>
        <FontAwesome name={icon} size={16} color="#FFF" style={styles.benefitIcon} />
      </View>
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
}

// Prop Validation
Step.propTypes = {
  number: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

BenefitItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradientOverlay: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  logoIcon: {
    marginRight: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  bannerContainer: {
    marginBottom: 36,
  },
  banner: {
    borderRadius: 20,
    padding: 28,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  bannerIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  bannerIcon: {
    // Styles are applied from the container
  },
  bannerText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
    flex: 1,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 18,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  stepsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  stepIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  stepText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
  benefitsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  benefitContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  benefitIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(147, 51, 234, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  benefitIcon: {
    // Styles are applied from the container
  },
  benefitText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
    lineHeight: 22,
    paddingTop: 5,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 36,
    alignItems: 'center',
  },
  getStartedButton: {
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    width: width * 0.85,
  },
  getStartedText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 12,
  },
});