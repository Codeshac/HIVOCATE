import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const authorities = [
  { id: 'a1', name: 'Dr. Smith', role: 'Chancellor', contact: 'chancellor@school.edu' },
  { id: 'a2', name: 'Prof. Johnson', role: 'Vice Chancellor', contact: 'vc@school.edu' },
];

export default function AuthoritiesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Know Your School</Text>
      <Text style={styles.subtitle}>Authorities & Contacts</Text>

      <FlatList
        data={authorities}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Icon name="account-circle" size={28} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.role}</Text>
              <Text style={styles.meta}>{item.contact}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />

      <Text style={[styles.subtitle, { marginTop: 16 }]}>Brief History</Text>
      <Text style={styles.history}>
        Founded in 1965, our institution fosters excellence in teaching, research and community service…
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 16, fontWeight: '600', marginTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  sep: { height: 1, backgroundColor: '#eee' },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666' },
  history: { marginTop: 6, color: '#333', lineHeight: 20 },
});
