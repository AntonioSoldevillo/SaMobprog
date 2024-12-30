import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Rejected = () => {
  const navigation = useNavigation();

  // Mock data for rejected sessions
  const rejectedSessions = [
    { title: 'Chemistry Help', date: '2024-12-18' },
    { title: 'Math Tutoring', date: '2024-12-20' },
    { title: 'Physics Assistance', date: '2024-12-22' },
    { title: 'English Literature', date: '2024-12-23' },
    { title: 'Biology Review', date: '2024-12-25' },
    { title: 'History Session', date: '2024-12-26' },
    { title: 'Computer Science Help', date: '2024-12-27' },
    { title: 'Psychology Discussion', date: '2024-12-28' },
    { title: 'Geography Session', date: '2024-12-29' },
    { title: 'Art Class', date: '2024-12-30' },
    { title: 'Philosophy Discussion', date: '2024-12-31' },
    { title: 'Literature Review', date: '2024-12-02' },
    { title: 'Spanish Conversation', date: '2024-12-04' },
    { title: 'Music Theory', date: '2024-12-05' },
    { title: 'Engineering Review', date: '2024-12-06' },
    { title: 'Business Class', date: '2024-12-07' },
    { title: 'Statistics Help', date: '2024-12-08' },
    { title: 'Psychology Exam Prep', date: '2024-12-09' },
    { title: 'Medical Review', date: '2024-12-10' },
    { title: 'Law Class', date: '2024-12-11' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.title}>Rejected Sessions</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Total Rejected: {rejectedSessions.length}</Text>
      </View>
      <ScrollView style={styles.sessionContainer}>
        {rejectedSessions.map((session, index) => (
          <View key={index} style={styles.sessionCard}>
            <Text style={styles.sessionTitle}>{session.title}</Text>
            <Text style={styles.sessionDate}>Rejected on: {session.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
  },
  card: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sessionContainer: {
    marginTop: 20,
  },
  sessionCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  sessionDate: {
    fontSize: 14,
    color: '#808080',
    marginTop: 5,
  },
});

export default Rejected;
