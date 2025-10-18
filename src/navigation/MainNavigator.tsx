import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import { ProfileStackParamList, MoreStackParamList, RootStackParamList, TabParamList } from '../types/navigation';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import LegacyScreen from '../screens/LegacyScreen';
import CreateScreen from '../screens/CreateScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ActivityScreen from '../screens/ActivityScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import AccountScreen from '../screens/AccountScreen';
import MoreScreen from '../screens/MoreScreen';
import AddressScreen from '../screens/AddressScreen';
import NewsScreen from '../screens/NewsScreen';
import AuthoritiesScreen from '../screens/AuthoritiesScreen';
import PostScreen from '../screens/PostScreen';
import CommentsScreen from '../screens/CommentsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import FreespaceScreen from '../screens/FreespaceScreen';
import LogInOutScreen from '../screens/LogInOutScreen';
import SecurityScreen from '../screens/SecurityScreen';

// Importing icons
const homeIcon = require('../assets/Icons/Home.png');
const createIcon = require('../assets/Icons/create.png');
const profileIcon = require('../assets/Icons/profilepic.png');
const moreIcon = require('../assets/Icons/more.png');

// Create navigators with proper typing
const Tab = createBottomTabNavigator<TabParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const MoreStack = createNativeStackNavigator<MoreStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Activity" component={ActivityScreen} />
      <ProfileStack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <ProfileStack.Screen name="Post" component={PostScreen} />
      <ProfileStack.Screen name="Comments" component={CommentsScreen} />
      <ProfileStack.Screen name="Account" component={AccountScreen} />
      <ProfileStack.Screen name="Privacy" component={PrivacyScreen} />
      <ProfileStack.Screen name="Security" component={SecurityScreen} />
      <ProfileStack.Screen name="Freespace" component={FreespaceScreen} />
      <ProfileStack.Screen name="LogInOut" component={LogInOutScreen} />
    </ProfileStack.Navigator>
  );
}

function MoreStackNavigator() {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="MoreMain" component={MoreScreen} />
      <MoreStack.Screen name="Address" component={AddressScreen} />
      <MoreStack.Screen name="News" component={NewsScreen} />
      <MoreStack.Screen name="Authorities" component={AuthoritiesScreen} />
      <MoreStack.Screen name="Legacy" component={LegacyScreen} />
    </MoreStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = homeIcon;
              break;
            case 'Create':
              iconSource = createIcon;
              break;
            case 'Profile':
              iconSource = profileIcon;
              break;
            case 'More':
              iconSource = moreIcon;
              break;
            default:
              iconSource = homeIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: color,
                resizeMode: 'contain',
              }}
            />
          );
        },
        tabBarActiveTintColor: '#6C5CE7',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="More" component={MoreStackNavigator} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={TabNavigator} />
        <RootStack.Screen name="Search" component={SearchScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}