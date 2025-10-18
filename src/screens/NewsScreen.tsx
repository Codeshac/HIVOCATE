import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
// Alternative: Use a ScrollView instead of PageFlip if 'react-native-page-flip' is unavailable

import DateTimePicker from "@react-native-community/datetimepicker";

const newsStories = [
  {
    id: "n1",
    title: "Student Union Partners with Local NGO for Cleanup Drive",
    date: "2025-08-10",
    content:
      "Hundreds of students joined hands with a local NGO in a campus-wide cleanup drive. The initiative focused on plastic waste and promoting sustainable living on campus.",
  },
  {
    id: "n2",
    title: "New Bus Routes Announced for Evening Classes",
    date: "2025-08-06",
    content:
      "The transportation department has introduced two new bus routes to support students attending evening lectures, improving safety and convenience.",
  },
  {
    id: "n3",
    title: "Campus Library Adds 1,000 New Academic Books",
    date: "2025-08-01",
    content:
      "The library has expanded its collection with new books across science, technology, and humanities to aid student research and studies.",
  },
  {
    id: "n4",
    title: "Inter-Hall Debate Championship Finals Set",
    date: "2025-07-25",
    content:
      "The finals of the annual debate championship will take place next week, with strong teams from four halls competing for the trophy.",
  },
  {
    id: "n5",
    title: "Students Organize Blood Donation Drive",
    date: "2025-07-18",
    content:
      "In collaboration with the local hospital, the medical students’ association organized a blood donation exercise that recorded over 300 donations.",
  },
];

export default function NewsScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Filter news by selected date or show all
  const filteredNews = newsStories.filter((story) => {
    const storyDate = new Date(story.date);
    return storyDate.toDateString() === date.toDateString();
  });

  const displayNews = filteredNews.length > 0 ? filteredNews : newsStories;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Campus Chronicle</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.date}>{date.toDateString()} 📅</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* News List */}
      <ScrollView style={styles.pageFlip}>
        {displayNews.map((story) => (
          <View key={story.id} style={styles.page}>
            <Text style={styles.headline}>{story.title}</Text>
            <Text style={styles.storyDate}>{story.date}</Text>
            <Text style={styles.body}>{story.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfaf3" },
  header: {
    padding: 15,
    backgroundColor: "#004225", // deep green
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#d4af37", fontSize: 22, fontWeight: "bold" }, // dark gold
  date: { color: "#f1f1f1", fontSize: 14 },
  pageFlip: { flex: 1 },
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fffdf5",
    borderWidth: 1,
    borderColor: "#d4af37",
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004225",
    marginBottom: 8,
  },
  storyDate: {
    fontSize: 14,
    color: "#d4af37",
    marginBottom: 12,
  },
  body: { fontSize: 16, lineHeight: 24, textAlign: "justify", color: "#333" },
});
