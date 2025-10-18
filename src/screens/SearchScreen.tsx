import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results] = useState([
    { id: '1', type: 'hashtag', title: 'CampusSafety' },
    { id: '2', type: 'user', title: 'John Doe' },
    { id: '3', type: 'issue', title: 'Library Hours Extension' }
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button and Search Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image 
                    source={require('../assets/Icons/backbutton.png')} 
                    style={{ width: 20, height: 20, borderRadius: 10 }} 
                  />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Image 
                    source={require('../assets/Icons/search.png')} 
                    style={{ width: 20, height: 20, borderRadius: 10 }} 
                  />
          <TextInput
            style={styles.searchInput}
            placeholder="Search issues, users, hashtags..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Searches</Text>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
           <Image 
                     source={require('../assets/Icons/hashtag.png')} 
                     style={{ width: 20, height: 20, borderRadius: 40 }} 
                   />
            <Text style={styles.resultText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    marginLeft: 10,
  }
});

export default SearchScreen;