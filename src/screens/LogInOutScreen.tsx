// src/screens/LogInOutScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../utils/supabase';

const BG = '#2D0C0C';
const CARD_BG = '#FFF3B0';
const BUTTON_BG = '#FFD600';
const INPUT_BG = 'rgba(0, 0, 0, 0.2)';
const INPUT_TEXT = '#BDBDBD';

const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) Alert.alert('Error', error.message);
  else {
    Alert.alert('Success', 'Check your email for verification!');
    console.log("Signed up:", data);
  }
};

const LogInOutScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (email && password) {
      signUp(email, password);
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };

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
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image 
          source={require('../assets/Icons/Loguser.png')} 
          style={{ width: 80, height: 80, borderRadius: 40 }} 
        />
      </View>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          placeholderTextColor={INPUT_TEXT}
        />
        <TextInput
          style={styles.input}
          placeholder="FIRST NAME"
          placeholderTextColor={INPUT_TEXT}
        />
        <TextInput
          style={styles.input}
          placeholder="LAST NAME"
          placeholderTextColor={INPUT_TEXT}
        />
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          placeholderTextColor={INPUT_TEXT}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          placeholderTextColor={INPUT_TEXT}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Google Sign In & Sign Up */}
      <View style={styles.signInRow}>
        <View style={styles.googleContainer}>
          <Text style={styles.signInText}>Sign in with:</Text>
          <Image 
            source={require('../assets/Icons/google.png')}
            style={styles.googleIcon}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    justifyContent: 'flex-start',
    paddingTop: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  avatarIcon: {
    backgroundColor: 'transparent',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    width: '85%',
    backgroundColor: INPUT_BG,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 18,
    color: INPUT_TEXT,
    textAlign: 'center',
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  googleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 6,
  },
  googleIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  signUpButton: {
    backgroundColor: BUTTON_BG,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    elevation: 2,
  },
  signUpText: {
    color: BG,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LogInOutScreen;