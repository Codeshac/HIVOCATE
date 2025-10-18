import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CARD_BG = '#FFF3B0';
const BG = '#2D0C0C';

const FreespaceScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image
                                source={require('../assets/Icons/backbutton.png')}
                                style={{ width: 28, height: 28, tintColor: '#FFF3B0' }}
                              />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Free up space</Text>
      </View>

      {/* Options */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Clear cache</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Remove downloads</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Delete temporary files</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  headerTitle: {
    color: CARD_BG,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 18,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardText: {
    color: BG,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FreespaceScreen;