// src/screens/MoreScreen.tsx
import React, { useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
  ImageBackground,
  StatusBar,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

// Using placeholder images instead of local files
const LOCAL_IMAGES = {
  address: require('../assets/Images/speech.jpeg'),
  authorities: require('../assets/Images/authorities.jpeg'),
  news: require('../assets/Images/newspage.jpeg'),
  legacy: require('../assets/Images/legacy.jpeg'), // update if file exists
};

const LOCAL_ICONS = {
  back: require('../assets/Icons/backbutton.png'),
};

// Match Figma screens - using correct screen names from your MoreStack
const pagesData: {
  id: string;
  title: string;
  subtitle: string;
  image: { uri: string };
  screenName: keyof MoreStackParamList;
}[] = [
   {
    id: '1',
    title: 'Address',
    subtitle: 'Frame@24',
    image: LOCAL_IMAGES.address,
    screenName: 'Address',
  },
  {
    id: '2',
    title: 'Authorities',
    subtitle: 'Frame@65',
    image: LOCAL_IMAGES.authorities,
    screenName: 'Authorities',
  },
  {
    id: '3',
    title: 'News',
    subtitle: 'Frame@109',
    image: LOCAL_IMAGES.news,
    screenName: 'News',
  },
  {
    id: '4',
    title: 'Legacy',
    subtitle: 'Frame@143',
    image: LOCAL_IMAGES.legacy,
    screenName: 'Legacy',
  },
];

// Define the param list based on your MoreStackParamList
type MoreStackParamList = {
  MoreMain: undefined;
  Address: undefined;
  News: undefined;
  Authorities: undefined;
  Legacy: undefined;
};

type MoreScreenProps = {
  navigation: StackNavigationProp<MoreStackParamList, 'MoreMain'>;
};

export default function MoreScreen({ navigation }: MoreScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleCardPress = (screenName: keyof MoreStackParamList) => {
    // Navigate to the specific screen when a card is pressed
    navigation.navigate(screenName);
  };

  const handleQuickAccessPress = (index: number, screenName: keyof MoreStackParamList) => {
    // Scroll to the card and navigate to the screen
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
    setCurrentIndex(index);
    
    // Navigate after a small delay to show the scroll animation
    setTimeout(() => {
      navigation.navigate(screenName);
    }, 300);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.pageContainer}>
      <Text style={styles.subtitle}>{item.subtitle}</Text>

      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={() => handleCardPress(item.screenName)}
      >
        <ImageBackground source={item.image} style={styles.imageCard} imageStyle={styles.imageStyle}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => handleCardPress(item.screenName)}
            >
              <Text style={styles.exploreButtonText}>Explore</Text>
              <Icon name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {pagesData.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <View
              key={idx}
              style={[
                styles.paginationDot,
                isActive ? styles.paginationDotActive : styles.paginationDotInactive
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#D9E8DB" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
    source={require('../assets/Icons/backbutton.png')}  // 👈 your backbutton.png
    style={{ width: 28, height: 28, tintColor: '#000' }} // optional tint
    resizeMode="contain"
  />
</TouchableOpacity>

        <Text style={styles.headerTitle}>HIVOCATE</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Horizontal FlatList */}
      <Animated.FlatList
        ref={flatListRef}
        data={pagesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={styles.flatListContent}
      />
      
      <Pagination />
      
      {/* Quick Access Buttons */}
      <View style={styles.quickAccess}>
        <Text style={styles.quickAccessTitle}>Quick Access</Text>
        <View style={styles.quickAccessGrid}>
          {pagesData.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.quickAccessItem}
              onPress={() => handleQuickAccessPress(index, item.screenName)}
            >
              <Text style={styles.quickAccessText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D2C26',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#D9E8DB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  flatListContent: {
    paddingVertical: 20,
  },
  pageContainer: {
    width,
    alignItems: 'center',
    paddingTop: 20,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  imageCard: {
    width: width * 0.8,
    height: height * 0.5,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 16,
  },
  cardContent: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDC500',
    marginBottom: 12,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 197, 0, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FDC500',
    width: 16,
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  quickAccess: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  quickAccessItem: {
    width: (width - 60) / 2,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});