import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';

export default function Results() {
  const params = useLocalSearchParams();
  const parsedResults = typeof params.results === 'string' ? JSON.parse(params.results) : null;
  
  if (!parsedResults) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>!</Text>
          </View>
          <Text style={styles.error}>No Results Found</Text>
          <Text style={styles.errorSubtext}>Please try scanning again</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const { analysis, detected_additives, can_consume } = parsedResults;
  const safetyColor = can_consume === 'safe' ? '#4CAF50' : '#F44336';
  const safetyIcon = can_consume === 'safe' ? '✓' : '✗';
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>Additive Analysis</Text>
          <View style={styles.headerUnderline}></View>
        </View>
        
        {/* Safety Indicator */}
        <View style={[styles.safetyCard, { borderColor: safetyColor }]}>
          <View style={[styles.safetyIconContainer, { backgroundColor: safetyColor }]}>
            <Text style={styles.safetyIcon}>{safetyIcon}</Text>
          </View>
          <Text style={styles.safetyText}>
            {can_consume === 'safe' ? 'SAFE TO CONSUME' : 'NOT SAFE TO CONSUME'}
          </Text>
          <Text style={styles.safetySubtext}>
            {can_consume === 'safe' ? 
              'This product meets safety standards' : 
              'Contains potentially harmful additives'}
          </Text>
        </View>
        
        {/* Analysis Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Summary Analysis</Text>
          <View style={styles.divider} />
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{analysis.count}</Text>
              <Text style={styles.statLabel}>Total Additives</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{analysis.gmp_count}</Text>
              <Text style={styles.statLabel}>GMP-Based</Text>
            </View>
          </View>
          
          {(analysis.avg_level > 0 || analysis.max_level > 0) && (
            <View style={styles.levelContainer}>
              {analysis.avg_level > 0 && (
                <View style={styles.levelItem}>
                  <View style={styles.levelDot}></View>
                  <Text style={styles.levelLabel}>Average Level:</Text>
                  <Text style={styles.levelValue}>{analysis.avg_level}</Text>
                </View>
              )}
              
              {analysis.max_level > 0 && (
                <View style={styles.levelItem}>
                  <View style={styles.levelDot}></View>
                  <Text style={styles.levelLabel}>Maximum Level:</Text>
                  <Text style={styles.levelValue}>{analysis.max_level}</Text>
                </View>
              )}
            </View>
          )}
        </View>
        
        {/* Detected Additives */}
        <Text style={styles.sectionTitle}>Detected Additives</Text>
        {detected_additives.map((item:any, index:any) => {
          const isDetected = item.detected_level !== "Not found";
          return (
            <View key={index} style={[styles.additiveCard, isDetected && styles.detectedCard]}>
              <View style={styles.additiveHeader}>
                <Text style={styles.additiveName}>{item.additive}</Text>
                <View style={[
                  styles.statusBadge, 
                  isDetected ? styles.detectedBadge : styles.notDetectedBadge
                ]}>
                  <Text style={[
                    styles.statusText, 
                    isDetected ? styles.detectedText : styles.notDetectedText
                  ]}>
                    {isDetected ? 'DETECTED' : 'NOT DETECTED'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.divider}></View>
              
              <View style={styles.additiveDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status:</Text>
                  <Text style={[styles.detailValue, isDetected ? styles.detectedText : styles.notDetectedText]}>
                    {isDetected ? 'Present' : 'Absent'}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Permissible Level:</Text>
                  <Text style={styles.detailValue}>{item.max_level}</Text>
                </View>
                
                {isDetected && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Detected Level:</Text>
                    <Text style={styles.detailValue}>{item.detected_level}</Text>
                  </View>
                )}
              </View>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 0.5,
  },
  headerUnderline: {
    height: 4,
    width: 60,
    backgroundColor: '#FFD700',
    borderRadius: 2,
    marginTop: 8,
  },
  safetyCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  safetyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  safetyIcon: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  safetyText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
    letterSpacing: 1,
  },
  safetySubtext: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#252540',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    minWidth: 120,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFD700',
  },
  statLabel: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  levelContainer: {
    marginTop: 16,
  },
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
    marginRight: 12,
  },
  levelLabel: {
    fontSize: 14,
    color: '#bbb',
    marginRight: 8,
  },
  levelValue: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 16,
    marginTop: 8,
  },
  additiveCard: {
    backgroundColor: '#252540',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
  },
  detectedCard: {
    borderLeftColor: '#F44336',
  },
  additiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  additiveName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    flex: 1,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  notDetectedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: '#4CAF50',
  },
  detectedBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderColor: '#F44336',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  notDetectedText: {
    color: '#4CAF50',
  },
  detectedText: {
    color: '#F44336',
  },
  additiveDetails: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121225',
  },
  errorIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorIconText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  error: {
    fontSize: 24,
    textAlign: 'center',
    color: '#F44336',
    fontWeight: '700',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ddd',
  },
});