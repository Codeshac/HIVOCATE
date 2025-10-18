import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CARD_BG = '#FFF3B0';
const BG = '#2D0C0C';
const PURPLE = '#6C5CE7';

const SecurityScreen = () => {
  const navigation = useNavigation();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState(true);

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
        <Text style={styles.headerTitle}>Security and Permission</Text>
      </View>

      {/* Options */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          <Text style={styles.linkText}>Push notifications</Text>
        </Text>
        <Switch
          value={pushEnabled}
          onValueChange={setPushEnabled}
          thumbColor={pushEnabled ? PURPLE : '#fff'}
          trackColor={{ false: '#ccc', true: PURPLE }}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          <Text style={styles.linkText}>In-app notifications</Text>
        </Text>
        <Switch
          value={inAppEnabled}
          onValueChange={setInAppEnabled}
          thumbColor={inAppEnabled ? PURPLE : '#fff'}
          trackColor={{ false: '#ccc', true: PURPLE }}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    color: BG,
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: BG,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SecurityScreen;