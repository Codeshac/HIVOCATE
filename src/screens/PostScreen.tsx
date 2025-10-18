import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PostScreenProps } from '../types/navigation';

const PostScreen: React.FC<PostScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Issue: Library Hours Extension</Text>
      <Text style={styles.body}>
        Students propose extending library hours during exam periods to 12 AM.
      </Text>

      <View style={styles.actions}>
        <Icon name="thumb-up" size={22} />
        <Icon name="share" size={22} />
        <TouchableOpacity onPress={() => navigation.navigate('Comments', { postId: '123' })}>
          <Icon name="comment" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  body: { color: '#333', lineHeight: 20 },
  actions: {
    marginTop: 18, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#eee',
    flexDirection: 'row', justifyContent: 'space-around',
  },
});

export default PostScreen;
