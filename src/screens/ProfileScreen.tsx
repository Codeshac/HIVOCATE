import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { RepostContext } from './RepostContext';
import { StackNavigationProp } from '@react-navigation/stack'; // CHANGED
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp< // CHANGED
  RootStackParamList,
  'Profile'
>;

const ProfileScreen: React.FC = () => {
  const { reposts } = useContext(RepostContext);
  const [activeTab, setActiveTab] = useState<'issues' | 'reposts'>('issues');
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const userStats = { votes: '1K', following: '1K' };
  const userActivity = [
    { title: 'Library Hours Extension', date: '03/06/25', votes: '200' },
    { title: 'Campus WiFi Improvement', date: '03/06/25', votes: '300' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/Icons/profilepic.png')} 
          style={{ width: 80, height: 80, borderRadius: 40 }} 
        />
        <Text style={styles.headerTitle}>USER 364423</Text>

        {/* 🔹 Custom Settings Icon with navigation */}
        <TouchableOpacity 
          style={styles.settingsIcon} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Image 
            source={require('../assets/Icons/settings.png')}  // your custom icon
            style={styles.settingsImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userStats.votes}</Text>
            <Text style={styles.statLabel}>Votes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userStats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('issues')}>
            <Text style={[styles.tabText, activeTab === 'issues' && styles.activeTab]}>Issues Raised</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('reposts')}>
            <Text style={[styles.tabText, activeTab === 'reposts' && styles.activeTab]}>Reposts</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Section */}
        {activeTab === 'issues' ? (
          <View style={styles.activitySection}>
            {userActivity.map((item, index) => (
              <View key={index} style={styles.activityItem}>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemText}>{item.date}</Text>
                <Text style={styles.itemText}>{item.votes}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.activitySection}>
            {reposts.length === 0 ? (
              <Text style={{ color: '#000' }}>No reposts yet</Text>
            ) : (
              reposts.map((item, index) => (
                <View key={index} style={styles.activityItem}>
                  <Text style={styles.itemText}>{item.title}</Text>
                  <Text style={styles.itemText}>{item.user}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { backgroundColor: '#1B2B34', padding: 24, alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  settingsIcon: { position: 'absolute', top: 20, right: 20 },
  settingsImage: { width: 28, height: 28, tintColor: '#D9D9D9' }, // 👈 tint matches old icon
  scrollContainer: { flex: 1, backgroundColor: '#B0B3BD', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -12, padding: 16 },
  statsSection: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  statLabel: { fontSize: 12, color: '#000' },
  tabs: { flexDirection: 'row', justifyContent: 'center', marginVertical: 12 },
  tabText: { fontSize: 14, fontWeight: '600', color: '#333', marginHorizontal: 16 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#000' },
  activitySection: { marginTop: 12 },
  activityItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#999' },
  itemText: { fontSize: 12, color: '#000' },
});

export default ProfileScreen;