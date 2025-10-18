import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AddressScreen() {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={ require('../assets/Images/address.jpeg' )} // Replace with actual issue image
        style={styles.image}
      >
        {/* Top Left User Info */}
        <View style={styles.userRow}>
          <Image source={require('../assets/Icons/profilepic.png')} 
              style={{ width: 32, height: 32 }} 
              resizeMode="contain" 
           />

          <Text style={styles.userId}>USER42972983402</Text>
        </View>

        {/* Right Side Action Buttons */}
        <View style={styles.rightActions}>
          <View style={styles.actionBtn}>
            <Image 
               source={require('../assets/Icons/supporticon.png')} 
                 style={{ width: 32, height: 32 }} 
                  resizeMode="contain" 
                   />
            <Text style={styles.actionCount}>12K</Text>
          </View>

          <View style={styles.actionBtn}>
            <Image source={require('../assets/Icons/chat.png')} 
                 style={{ width: 32, height: 32 }} 
                  resizeMode="contain" 
             />
            <Text style={styles.actionCount}>12K</Text>
          </View>
        </View>

        {/* Bottom Info Section */}
        <View style={styles.bottomSection}>
          {/* Location */}
          <View style={styles.locationRow}>
            <Image
                        source={require('../assets/Icons/location.png')}
                        style={{ width: 28, height: 28, tintColor: '#FFF3B0' }}
                      />
            <Text style={styles.locationText}>IMPACT BUILDING</Text>
          </View>

          {/* Issue Title */}
          <Text style={styles.issueTitle}>ISSUE TITLE</Text>

          {/* Issue Description */}
          <Text style={styles.issueDescription}>
            The issue has been solved following the post made on 30th August 2023 by @user9237928. 
            The Buses are now fully function and ready to serve the student
          </Text>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navBtn}>
            <Icon name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navBtn}>
            <Icon name="home" size={28} color="#fff" />
            <Text style={styles.navText}>Main Page</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navBtn}>
            <Icon name="more-horiz" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { flex: 1, resizeMode: 'cover', justifyContent: 'flex-end' },

  // Top Left User Info
  userRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userId: {
    marginLeft: 6,
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 6,
    borderRadius: 4,
  },

  // Right Action Buttons
  rightActions: {
    position: 'absolute',
    right: 12,
    top: '40%',
    alignItems: 'center',
  },
  actionBtn: {
    alignItems: 'center',
    marginVertical: 20,
  },
  actionCount: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },

  // Bottom Info Section
  bottomSection: {
    backgroundColor: '#000',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  locationText: { marginLeft: 4, color: '#fff', fontWeight: 'bold', fontSize: 13 },
  issueTitle: { fontSize: 14, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  issueDescription: { fontSize: 12, color: '#fff', lineHeight: 18 },

  // Bottom Nav
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  navBtn: { alignItems: 'center' },
  navText: { fontSize: 10, color: '#fff', marginTop: 2 },
});
