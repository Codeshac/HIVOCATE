// CreateScreen.tsx - CORRECTED VERSION
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Image 
} from 'react-native';
import Video from 'react-native-video';
import { supabase } from '../../utils/supabase';
import * as DocumentPicker from "react-native-document-picker";

const LOCATIONS = ['Campus', 'Ayeduase', 'Boadi'];

const uploadVideo = async (userId: string) => {
  try {
    const files = await DocumentPicker.pick({ type: "video/*" });

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const response = await fetch(selectedFile.uri);
      const blob = await response.blob();

      const filePath = `user-${userId}/${Date.now()}-${selectedFile.name}`;
      const { data, error } = await supabase.storage
        .from("videos")
        .upload(filePath, blob, {
          contentType: selectedFile.type || 'video/mp4',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        return;
      }

      // Save metadata in DB
      const { error: dbError } = await supabase.from("videos").insert({
        title: selectedFile.name,
        uri: filePath,
        user_id: userId,
      });

      if (dbError) {
        console.error('Database error:', dbError);
      }
    }
  } catch (error) {
    console.error('Document picker error:', error);
  }
};

const CreateScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [showLocationOptions, setShowLocationOptions] = useState(false);

  // limit content to 40 words
  const handleContentChange = (text: string) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= 40) {
      setContent(text);
    }
  };

  const handlePickFromGallery = () => {
    // 🔹 placeholder for image/video picker
    console.log("Open gallery to pick image or video");
  };

  const handlePost = () => {
    console.log('Posting:', { title, content, image, video, location });
    // TODO: Implement actual post creation with Supabase
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Post</Text>

      {/* Title input */}
      <TextInput
        style={styles.input}
        placeholder="Enter a title..."
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />

      {/* Content input */}
      <TextInput
        style={[styles.input, { minHeight: 100 }]}
        placeholder="Write your content (max 40 words)..."
        multiline
        value={content}
        onChangeText={handleContentChange}
      />

      {/* Image Preview */}
      {image && <Image source={{ uri: image }} style={styles.mediaPreview} />}

      {/* Video Preview */}
      {video && (
        <Video
          source={{ uri: video }}
          style={styles.mediaPreview}
          controls
          resizeMode="cover"
        />
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/Icons/camera.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text>Camera</Text>
        </TouchableOpacity>

        {/* Gallery (now supports both images + videos) */}
        <TouchableOpacity style={styles.iconButton} onPress={handlePickFromGallery}>
          <Image
            source={require('../assets/Icons/gallery.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setShowLocationOptions(!showLocationOptions)}
        >
          <Image
            source={require('../assets/Icons/location.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text>{location ? location : 'Location'}</Text>
        </TouchableOpacity>
      </View>

      {/* Location Options */}
      {showLocationOptions && (
        <View style={styles.locationOptions}>
          {LOCATIONS.map((loc) => (
            <TouchableOpacity 
              key={loc} 
              style={styles.locationOption}
              onPress={() => {
                setLocation(loc);
                setShowLocationOptions(false);
              }}
            >
              <Text style={styles.locationText}>{loc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={styles.postButton} 
        onPress={handlePost}
      >
        <Text style={styles.postButtonText}>Post Issue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  mediaPreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#000',
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  iconButton: { alignItems: 'center', padding: 10 },
  icon: { width: 22, height: 22, marginBottom: 4 },
  locationOptions: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 8,
  },
  locationOption: { paddingVertical: 10, paddingHorizontal: 16 },
  locationText: { fontSize: 16 },
  postButton: {
    backgroundColor: '#6C5CE7',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default CreateScreen;