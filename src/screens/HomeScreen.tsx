import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import { RepostContext } from './RepostContext';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const posts = [
  {
    id: '1',
    user: 'USER 688247882',
    title: 'OPENING',
    content: 'The serene environment of Knust welcomes its students for the start of a new academic year.',
    videoBackground: 'https://example.com/video-poster.jpg',
    stats: [
      { icon: 'votte', count: 12000, label: 'Likes' },
      { icon: 'chat', count: 1200, label: 'Comments' },
      { icon: 'repost', count: 500, label: 'Reposts' },
    ],
  },
];

const iconSources: Record<string, any> = {
  votte: require('../assets/Icons/vote.png'),
  chat: require('../assets/Icons/chat.png'),
  repost: require('../assets/Icons/Repost.png'),
  like: require('../assets/Icons/like.png'),
  search: require('../assets/Icons/search.png'),
};

function PostCard({ post, onOpenComments }: { post: any; onOpenComments: () => void }) {
  const { addRepost } = useContext(RepostContext);
  const [voteCount, setVoteCount] = useState(post.stats[0].count);
  const [voteActive, setVoteActive] = useState(false);
  const [repostCount, setRepostCount] = useState(post.stats[2].count);
  const [repostActive, setRepostActive] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleVote = () => {
    setVoteActive(!voteActive);
    setVoteCount(voteActive ? voteCount - 1 : voteCount + 1);
  };

  const handleRepost = () => {
    if (!repostActive) {
      addRepost(post);
      setRepostCount(repostCount + 1);
    } else {
      setRepostCount(repostCount - 1);
    }
    setRepostActive(!repostActive);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.postContainer}>
      <ImageBackground
        source={{ uri: post.videoBackground }}
        style={styles.videoBackground}
        resizeMode="cover"
      >
        <View style={styles.videoOverlay} pointerEvents="none" />

        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionItem} onPress={toggleVote}>
            <Image
              source={iconSources.votte}
              style={[styles.actionIcon, voteActive && { tintColor: '#FFD600' }]}
              resizeMode="contain"
            />
            <Text style={styles.actionCount}>{voteCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={onOpenComments}>
            <Image
              source={iconSources.chat}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            <Text style={styles.actionCount}>{post.stats[1].count}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleRepost}>
            <Image
              source={iconSources.repost}
              style={[styles.actionIcon, repostActive && { tintColor: '#00FFB3' }]}
              resizeMode="contain"
            />
            <Text style={styles.actionCount}>{repostCount}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userProfile}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
            <TouchableOpacity
              style={[styles.followButton, isFollowing && { backgroundColor: '#00FFB3' }]}
              onPress={handleFollow}
            >
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>
                {isFollowing ? '✓' : '+'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomContent}>
          <View style={styles.userInfo}>
            <Text style={styles.username}>@{post.user.toLowerCase()}</Text>
            <Text style={styles.postTitle}>{post.title}</Text>
          </View>
          <Text style={styles.postContent}>{post.content}</Text>
          <View style={styles.soundRow}>
            <Text style={styles.soundText}>🎵 Original Sound - {post.user}</Text>
          </View>
          <View style={styles.locationTag}>
            <Text style={styles.locationText}>📍 KNUST Campus</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default function HomeScreen() {
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const navigation = useNavigation();
  const [comments, setComments] = useState<{ text: string; likes: number }[]>([
    { text: 'Also explained why Superman was so stressed that Lex took the dog...', likes: 5 },
    { text: 'This is so accurate it hurts.', likes: 2 },
    { text: 'Nah, this ain\'t it. Do better. 😅', likes: 8 },
  ]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { text: newComment, likes: 0 }]);
    setNewComment('');
  };

  const likeComment = (index: number) => {
    const updated = [...comments];
    updated[index].likes += 1;
    setComments(updated);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchLabel}>Search</Text>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => navigation.navigate('Search' as never)}
        >
          <Image
            source={iconSources.search}
            style={styles.searchIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onOpenComments={() => setCommentsVisible(true)} />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        style={styles.feed}
        snapToInterval={height}
        decelerationRate="fast"
      />

      {isCommentsVisible && (
        <View style={styles.commentContainer}>
          <View style={styles.commentHeaderRow}>
            <Text style={styles.commentHeader}>Comments</Text>
            <TouchableOpacity onPress={() => setCommentsVisible(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.commentItem}>
                <View style={styles.commentAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.commentUser}>User123</Text>
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
                <TouchableOpacity style={styles.likeButton} onPress={() => likeComment(index)}>
                  <Image source={iconSources.like} style={styles.likeIcon} resizeMode="contain" />
                  <Text style={styles.likeCount}>{item.likes}</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 60 }}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Write a comment..."
              placeholderTextColor="#aaa"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.sendButton} onPress={addComment}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  feed: { flex: 1 },
  postContainer: { height, width, backgroundColor: '#000' },
  videoBackground: { flex: 1, width: '100%', height: '100%' },
  videoOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  rightActions: { position: 'absolute', right: 16, bottom: 230, alignItems: 'center' },
  actionItem: { alignItems: 'center', marginBottom: 20 },
  actionIcon: { width: 32, height: 32, tintColor: '#fff' },
  actionCount: { color: '#fff', fontSize: 12, marginTop: 4, fontWeight: '600' },
  userProfile: { position: 'absolute', right: 20, top: '40%' },
  avatarContainer: { alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#555', marginBottom: 8 },
  followButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: { position: 'absolute', bottom: 120, left: 16, right: 100 },
  userInfo: { marginBottom: 8 },
  username: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  postTitle: { color: '#00FFB3', fontWeight: 'bold', fontSize: 14 },
  postContent: { color: '#fff', fontSize: 14, marginBottom: 8, lineHeight: 20 },
  soundRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  soundText: { color: '#fff', fontSize: 12, marginLeft: 4, opacity: 0.9 },
  locationTag: { flexDirection: 'row', alignItems: 'center' },
  locationText: { color: '#00FFB3', fontSize: 12, marginLeft: 4, fontWeight: '600' },
  commentContainer: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.55,
    left: 0,
    right: 0,
    backgroundColor: '#111',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.9,
  },
  searchButton: { padding: 5 },
  searchIcon: { width: 20, height: 20, tintColor: '#fff' },
  commentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  commentHeader: { fontSize: 16, fontWeight: 'bold', color: '#00FFB3' },
  closeButton: { fontSize: 20, color: '#FF5252', fontWeight: 'bold' },
  commentItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16, paddingHorizontal: 12 },
  commentAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#444', marginRight: 10 },
  commentUser: { fontWeight: 'bold', color: '#00FFB3', marginBottom: 2 },
  commentText: { fontSize: 14, color: '#fff', flexWrap: 'wrap' },
  likeButton: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
  likeIcon: { width: 18, height: 18, tintColor: '#FF5252', marginRight: 4 },
  likeCount: { color: '#fff', fontSize: 12 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#111',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: '#222',
    color: '#fff',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#00FFB3',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendText: { color: '#000', fontWeight: 'bold' },
});