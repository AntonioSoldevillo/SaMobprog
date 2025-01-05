import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Messages() {
  const router = useRouter();

  
  const messages = [
    { id: '1', sender: 'John Doe', message: 'Hello, I need help with math.', time: '2:30 PM' },
    { id: '2', sender: 'Jane Smith', message: 'Can we reschedule our session?', time: '1:15 PM' },
    { id: '3', sender: 'Mark Wilson', message: 'Thank you for your help!', time: '11:00 AM' },
  ];

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageCard}>
            <Text style={styles.messageSender}>{item.sender}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No messages available.</Text>
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
  messageCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  messageSender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
