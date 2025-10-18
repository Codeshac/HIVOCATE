// CommentScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function CommentScreen({ onClose }: { onClose: () => void }) {
  const [comments, setComments] = useState([
    "This is so accurate it hurts.",
    "Nah, this ain’t it. Do better. 😅",
    "Also explained why Superman was stressed that Lex took the dog...",
  ]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comments</Text>

      <FlatList
        data={comments}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.commentUser}>User123</Text>
            <Text style={styles.commentText}>{item}</Text>
          </View>
        )}
      />

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.sendButton} onPress={addComment}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Close Button */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.5,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 12,
  },
  header: { fontWeight: 'bold', fontSize: 16, marginBottom: 12, textAlign: 'center' },
  commentItem: { marginBottom: 10 },
  commentUser: { fontWeight: 'bold' },
  commentText: { fontSize: 14 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#6C5CE7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendText: { color: '#fff', fontWeight: 'bold' },
  closeButton: { marginTop: 10, alignSelf: 'center' },
  closeText: { color: 'red', fontWeight: 'bold' },
});
