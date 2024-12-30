import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Completed = () => {
  const navigation = useNavigation();

  // Mock data for completed sessions
  const completedSessions = [
    { title: 'Math Tutorial', date: '2024-12-28' },
    { title: 'Physics Help', date: '2024-12-20' },
    { title: 'Chemistry Review', date: '2024-12-18' },
    { title: 'English Literature', date: '2024-12-15' },
    { title: 'History Session', date: '2024-12-12' },
    { title: 'Biology Lab', date: '2024-12-10' },
    { title: 'Statistics Exam Prep', date: '2024-12-08' },
    { title: 'Computer Science Help', date: '2024-12-05' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.title}>Completed Sessions</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Total Completed: {completedSessions.length}</Text>
      </View>
      <ScrollView style={styles.sessionsContainer}>
        {completedSessions.map((session, index) => (
          <View key={index} style={styles.sessionCard}>
            <Text style={styles.sessionTitle}>{session.title}</Text>
            <Text style={styles.sessionDate}>Completed on: {session.date}</Text>
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
    backgroundColor: '#00C851',
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
  sessionsContainer: {
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

export default Completed;
