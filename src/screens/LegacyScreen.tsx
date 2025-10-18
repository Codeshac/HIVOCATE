import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LegacyScreen = () => {
  const [approvalCount, setApprovalCount] = useState(245);
  const [disapprovalCount, setDisapprovalCount] = useState(12);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [currentYear, setCurrentYear] = useState(2024);

  const authorities = [
    { position: "PRESIDENT", name: "AMATAMIA" },
    { position: "VICE PRESIDENT", name: "AMATAMIA" },
    { position: "FINANCIAL SECRETARY", name: "AMATAMIA" },
    { position: "WON CON", name: "AMATAMIA" },
    { position: "SECRETARY", name: "AMATAMIA" },
    { position: "PUBLIC RELATIONS OFFICER", name: "AMATAMIA" }
  ];

  const handleVote = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      // Remove vote
      setUserVote(null);
      if (voteType === 'up') {
        setApprovalCount(prev => prev - 1);
      } else {
        setDisapprovalCount(prev => prev - 1);
      }
    } else {
      // Change vote or add new vote
      if (userVote === 'up') {
        setApprovalCount(prev => prev - 1);
      } else if (userVote === 'down') {
        setDisapprovalCount(prev => prev - 1);
      }
      
      setUserVote(voteType);
      
      if (voteType === 'up') {
        setApprovalCount(prev => prev + 1);
      } else {
        setDisapprovalCount(prev => prev + 1);
      }
    }
  };

  const adjustYear = (increment: number) => {
    setCurrentYear(prev => prev + increment);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>School Legacy</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Year Section with Adjustable Controls */}
        <View style={styles.yearSection}>
          <Text style={styles.yearLabel}>YEAR</Text>
          
          <View style={styles.yearControls}>
            <TouchableOpacity 
              style={styles.yearButton}
              onPress={() => adjustYear(-1)}
            >
              <Image 
    source={require('../assets/Icons/up.png')} 
    style={[styles.customIcon, userVote === 'up' && { tintColor: '#fff' }]} 
    resizeMode="contain"
  />
            </TouchableOpacity>
            
            <Text style={styles.yearValue}>{currentYear}</Text>
            
            <TouchableOpacity 
              style={styles.yearButton}
              onPress={() => adjustYear(1)}
            >
              <Image 
    source={require('../assets/Icons/down.png')} 
    style={[styles.customIcon, userVote === 'up' && { tintColor: '#fff' }]} 
    resizeMode="contain"
  />
            </TouchableOpacity>
          </View>
        </View>

        {/* Approval System with Voting */}
        <View style={styles.approvalSection}>
          <Text style={styles.sectionTitle}>Approval System</Text>
          <Text style={styles.currentYear}>Current Legacy Year: {currentYear}</Text>
          
          {/* Voting Buttons */}
          <View style={styles.votingContainer}>
            <TouchableOpacity 
              style={[styles.voteButton, userVote === 'up' && styles.voteButtonActive]}
              onPress={() => handleVote('up')}
            >
            
              <Image 
    source={require('../assets/Icons/thumbsUp.png')} 
    style={[styles.customIcon, userVote === 'up' && { tintColor: '#fff' }]} 
    resizeMode="contain"
  />
              <Text style={[styles.voteCount, userVote === 'up' && styles.voteCountActive]}>
                {approvalCount}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.voteButton, userVote === 'down' && styles.voteButtonActive]}
              onPress={() => handleVote('down')}
            >
              <Image 
    source={require('../assets/Icons/thumbsDown.png')} 
    style={[styles.customIcon, userVote === 'down' && { tintColor: '#fff' }]} 
    resizeMode="contain"
  />

              <Text style={[styles.voteCount, userVote === 'down' && styles.voteCountActive]}>
                {disapprovalCount}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Authorities Grid */}
        <View style={styles.authoritiesContainer}>
          {authorities.map((auth, index) => (
            <View key={index} style={styles.authorityCard}>
              <Text style={styles.authorityPosition}>{auth.position}</Text>
              <Text style={styles.authorityName}>{auth.name}</Text>
            </View>
          ))}
        </View>

        {/* School History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>School History</Text>
          <Text style={styles.historyText}>
            Founded in 1965, our institution has a rich history of academic excellence 
            and community development. We pride ourselves on nurturing future leaders 
            and innovators who make significant contributions to society.
          </Text>
        </View>

        {/* Contacts Section */}
        <View style={styles.contactsSection}>
          <Text style={styles.sectionTitle}>Contacts</Text>
          <View style={styles.contactItem}>
            <Icon name="email" size={20} color="#6C5CE7" />
            <Text style={styles.contactText}>contact@school.edu</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="phone" size={20} color="#6C5CE7" />
            <Text style={styles.contactText}>+123 456 7890</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="location-on" size={20} color="#6C5CE7" />
            <Text style={styles.contactText}>123 Education Street, Campus City</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#8E5915',
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  yearSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  yearLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  customIcon: {
  width: 24,
  height: 24,
  tintColor: '#6C5CE7', // default color
},

  yearControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  yearButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8E5915',
  },
  yearValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8E5915',
    minWidth: 100,
    textAlign: 'center',
  },
  approvalSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 12,
  },
  currentYear: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  votingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#8E5915',
    minWidth: 100,
    justifyContent: 'center',
    gap: 8,
  },
  voteButtonActive: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7',
  },
  voteCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E5915',
  },
  voteCountActive: {
    color: '#fff',
  },
  authoritiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  authorityCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  authorityPosition: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  authorityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  historySection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  historyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
});

export default LegacyScreen;