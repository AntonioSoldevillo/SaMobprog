import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BookingsInfo = () => {
  const [bookings] = useState([
    {
      id: '1',
      subject: 'Math 101',
      tutor: 'John Doe',
      date: '2024-12-30',
      time: '9:00 AM',
      status: 'Scheduled',
    },
    {
      id: '2',
      subject: 'English Literature',
      tutor: 'Jane Smith',
      date: '2024-12-31',
      time: '10:30 AM',
      status: 'Scheduled',
    },
    {
      id: '3',
      subject: 'Physics 202',
      tutor: 'Alex Johnson',
      date: '2025-01-02',
      time: '1:00 PM',
      status: 'Pending',
    },
    {
      id: '4',
      subject: 'Biology 101',
      tutor: 'Rachel Adams',
      date: '2025-01-03',
      time: '11:00 AM',
      status: 'Scheduled',
    },
    {
      id: '5',
      subject: 'History of Art',
      tutor: 'Michael Brown',
      date: '2025-01-05',
      time: '2:00 PM',
      status: 'Completed',
    },
    {
      id: '6',
      subject: 'Computer Science 101',
      tutor: 'Sarah Lee',
      date: '2025-01-06',
      time: '9:30 AM',
      status: 'Scheduled',
    },
    {
      id: '7',
      subject: 'Philosophy 101',
      tutor: 'George White',
      date: '2025-01-08',
      time: '3:00 PM',
      status: 'Pending',
    },
  ]);

  const router = useRouter();

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingSubject}>Subject: {item.subject}</Text>
        <Text style={styles.bookingTutor}>Tutor: {item.tutor}</Text>
        <Text style={styles.bookingDate}>Date: {item.date}</Text>
        <Text style={styles.bookingTime}>Time: {item.time}</Text>
        <Text style={styles.bookingStatus}>Status: {item.status}</Text>
      </View>
    </View>
  );

  // Back navigation logic
  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back button with Ionicons */}
        <Ionicons
          name="arrow-back"
          size={24}
          color="#003366"
          style={styles.backButton}
          onPress={handleBackPress}
        />
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    marginTop: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15, // Space between back icon and the title
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    
    
  },
  bookingList: {
    paddingHorizontal: 15,
  },
  bookingItem: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  bookingInfo: {
    flexDirection: 'column',
  },
  bookingSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  bookingTutor: {
    fontSize: 14,
    color: '#808080',
    marginTop: 5,
  },
  bookingDate: {
    fontSize: 14,
    color: '#808080',
    marginTop: 5,
  },
  bookingTime: {
    fontSize: 14,
    color: '#808080',
    marginTop: 5,
  },
  bookingStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#008000', // Green color for status
    marginTop: 5,
  },
});

export default BookingsInfo;
