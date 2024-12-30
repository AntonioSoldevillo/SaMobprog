import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MySubjects() {
  const router = useRouter();

  // Sample data for subjects
  const subjects = [
    { id: '1', name: 'Mathematics', description: 'Basic and advanced math concepts' },
    { id: '2', name: 'Physics', description: 'Mechanics, thermodynamics, and more' },
    { id: '3', name: 'Chemistry', description: 'Organic and inorganic chemistry' },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Subjects</Text>
      </View>

      {/* Subjects List */}
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.subjectCard}>
            <Text style={styles.subjectTitle}>{item.name}</Text>
            <Text style={styles.subjectDescription}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No subjects available.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
  },
  listContent: {
    paddingBottom: 20,
  },
  subjectCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  subjectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  subjectDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
