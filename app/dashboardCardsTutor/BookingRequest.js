import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BookingRequest() {
  const router = useRouter();

  // Sample data for booking requests
  const bookingRequests = [
    { id: '1', tutee: 'John Doe', subject: 'Mathematics', date: 'Jan 5, 2024', time: '2:00 PM' },
    { id: '2', tutee: 'Jane Smith', subject: 'Physics', date: 'Jan 6, 2024', time: '10:00 AM' },
    { id: '3', tutee: 'Mark Wilson', subject: 'Chemistry', date: 'Jan 7, 2024', time: '3:00 PM' },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Requests</Text>
      </View>

      {/* Booking Requests List */}
      <FlatList
        data={bookingRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.requestCard}>
            <Text style={styles.cardTitle}>{item.tutee}</Text>
            <Text style={styles.cardSubtitle}>{item.subject}</Text>
            <Text style={styles.cardDetails}>{`${item.date} at ${item.time}`}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No booking requests available.</Text>
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
  requestCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
