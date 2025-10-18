import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Comment = { id: string; text: string; likes: number };

export default function CommentsScreen() {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', text: 'Great!', likes: 3 },
    { id: '2', text: 'Support from Engineering faculty.', likes: 1 },
  ]);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setComments([{ id: Date.now().toString(), text, likes: 0 }, ...comments]);
    setText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentText}>{item.text}</Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => {
                setComments(prev => prev.map(c => c.id === item.id ? { ...c, likes: c.likes + 1 } : c));
              }}>
                <Icon name="thumb-up" size={18} />
              </TouchableOpacity>
              <Text style={styles.likes}>{item.likes}</Text>
              <Icon name="insert-emoticon" size={18} />
              <Icon name="image" size={18} />
            </View>
          </View>
        )}
      />

      <View style={styles.inputBar}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a comment…"
          style={styles.input}
        />
        <TouchableOpacity style={styles.send} onPress={add}>
          <Icon name="send" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  comment: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  commentText: { color: '#333', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center' },
  likes: { marginHorizontal: 8, color: '#666' },
  inputBar: {
    flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#eee',
  },
  input: { flex: 1, height: 40, paddingHorizontal: 12, backgroundColor: '#f5f5f5', borderRadius: 8 },
  send: { marginLeft: 10 },
});
