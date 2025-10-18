import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Account: undefined;
  Privacy: undefined;
  Security: undefined;
  Freespace: undefined;
  LogInOut: undefined;
};

const CARD_BG = '#FFF3B0';
const BG = '#2D0C0C';
const TEXT_DARK = '#2D0C0C';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
        <Text style={styles.headerTitle}>Setting and Privacy</Text>
      </View>

      <ScrollView>
        {/* Account Section */}
        <View style={styles.card}>
          <SettingItem
            icon={require('../assets/Icons/account.png')}
            label="Account"
            onPress={() => navigation.navigate('Account')}
          />

          <SettingItem
            icon={require('../assets/Icons/Lock.png')}
            label="Privacy"
            onPress={() => navigation.navigate('Privacy')}
          />

          <SettingItem
            icon={require('../assets/Icons/shield.png')}
            label="Security and permissions"
            onPress={() => navigation.navigate('Security')}
          />

          <SettingItem
            icon={require('../assets/Icons/share.png')}
            label="Share profile"
          />

          <SettingItem
            icon={require('../assets/Icons/terms.png')}
            label="Language"
          />
        </View>

        {/* Content & display */}
        <Text style={styles.sectionHeader}>Content & display</Text>
        <View style={styles.card}>
          <SettingItem
            icon={require('../assets/Icons/notification.png')}
            label="Notifications"
            right={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                thumbColor={BG}
                trackColor={{ false: '#ccc', true: '#FFD700' }}
              />
            }
          />
        </View>

        {/* Cache */}
        <Text style={styles.sectionHeader}>Cache</Text>
        <View style={styles.card}>
          <SettingItem
            icon={require('../assets/Icons/trash.png')}
            label="Free up space"
            onPress={() => navigation.navigate('Freespace')}
          />
        </View>

        {/* Support & about */}
        <Text style={styles.sectionHeader}>Support & about</Text>
        <View style={styles.card}>
          <SettingItem
            icon={require('../assets/Icons/report.png')}
            label="Report a problem"
          />
          <SettingItem
            icon={require('../assets/Icons/supporticon.png')}
            label="Support"
          />
          <SettingItem
            icon={require('../assets/Icons/terms.png')}
            label="Terms and Policies"
          />
        </View>

        {/* Login/Out */}
        <Text style={styles.sectionHeader}>Login/Out</Text>
        <View style={styles.card}>
          <SettingItem
            icon={require('../assets/Icons/login.png')}
            label="Log In"
            onPress={() => navigation.navigate('LogInOut')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

type SettingItemProps = {
  icon: any;
  label: string;
  right?: React.ReactNode;
  onPress?: () => any;
};

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  right,
  onPress,
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingInfo}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.settingText}>{label}</Text>
    </View>
    {right ? (
      right
    ) : (
      <Image
        source={require('../assets/Icons/forwardbutton.png')}
        style={styles.chevronIcon}
        resizeMode="contain"
      />
    )}
  </TouchableOpacity>
);

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
    marginBottom: 16,
  },
  headerTitle: {
    color: CARD_BG,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  sectionHeader: {
    color: CARD_BG,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 24,
    marginTop: 18,
    marginBottom: 4,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6D8A5',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 16,
    color: TEXT_DARK,
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: TEXT_DARK, // optional, remove if you want original colors
  },
  chevronIcon: {
    width: 18,
    height: 18,
    tintColor: TEXT_DARK,
  },
});


export default SettingsScreen;
