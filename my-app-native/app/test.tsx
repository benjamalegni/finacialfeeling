import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TestPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test Page - Routing is working!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
}); 