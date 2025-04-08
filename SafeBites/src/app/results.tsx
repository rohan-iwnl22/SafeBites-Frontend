import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ResultsPage() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.results) {
      const parsedResults = JSON.parse(params.results);
      setResults(parsedResults);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6B21A8" />
        <Text style={styles.loadingText}>Analyzing ingredients...</Text>
      </View>
    );
  }

  if (!results) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No results to display.</Text>
      </View>
    );
  }

  const { detected_additives = [], analysis = {} } = results;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Analysis Results</Text>

      <Image source={require('../assets/Images/bg.jpg')} style={styles.banner} />

      <View style={styles.section}>
        <Text style={styles.header}>Detected Additives</Text>
        {detected_additives.length === 0 ? (
          <Text style={styles.subText}>✅ No harmful additives found!</Text>
        ) : (
          detected_additives.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.additiveName}>{item.additive}</Text>
              <Text style={styles.infoText}>Detected Level: {item.detected_level || 'N/A'}</Text>
              <Text style={styles.infoText}>Max Allowed: {item.max_level}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Analysis Summary</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.infoText}>Total Additives: {analysis.count}</Text>
          <Text style={styles.infoText}>GMP Additives: {analysis.gmp_count}</Text>
          <Text style={styles.infoText}>
            Average Level: {analysis.avg_level?.toFixed(2)}
          </Text>
          <Text style={styles.infoText}>
            Max Level: {analysis.max_level?.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push('/upload')} style={styles.backButton}>
        <Text style={styles.backButtonText}>📤 Upload Another Label</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3E8FF',
    padding: 24,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4C1D95',
    textAlign: 'center',
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    marginBottom: 24,
  },
  section: {
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6B21A8',
    marginBottom: 12,
  },
  subText: {
    fontSize: 16,
    color: '#4B5563',
    backgroundColor: '#D9F99D',
    padding: 10,
    borderRadius: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#EDE9FE',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#6B21A8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  additiveName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 2,
  },
  summaryBox: {
    backgroundColor: '#DDD6FE',
    padding: 16,
    borderRadius: 14,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    padding: 24,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#6B21A8',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#6B21A8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
