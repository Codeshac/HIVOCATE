import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpCenterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Center</Text>
      {/* Add help content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HelpCenterScreen;