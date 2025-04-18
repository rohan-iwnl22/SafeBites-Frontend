import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

export default function Results() {
  const params = useLocalSearchParams();
  const parsedResults = typeof params.results === 'string' ? JSON.parse(params.results) : null;

  if (!parsedResults) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No results found.</Text>
      </View>
    );
  }

  const { analysis, detected_additives } = parsedResults;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Additive Analysis Summary</Text>
      <Text style={styles.summary}>Total Additives Detected: {analysis.count}</Text>
      <Text style={styles.summary}>GMP-Based Additives: {analysis.gmp_count}</Text>
      <Text style={styles.summary}>Average Detected Level: {analysis.avg_level}</Text>
      <Text style={styles.summary}>Maximum Detected Level: {analysis.max_level}</Text>

      <Text style={styles.subheading}>Detected Additives</Text>
      {detected_additives.map((item: any, index: number) => (
        <View key={index} style={styles.additiveItem}>
          <Text style={styles.additiveName}>{item.additive}</Text>
          <Text style={styles.name}>Detected Level: {item.detected_level}</Text>
          <Text style={styles.name}>Permissible Max Level: {item.max_level}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1E1E2F',
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  subheading: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '600',
    color: 'white',
  },
  summary: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  additiveItem: {
    backgroundColor: '#333',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  additiveName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  name:{
    fontSize:16,
    color:'white'
  },
});
