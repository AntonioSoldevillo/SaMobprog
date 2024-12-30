import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TopTutors = () => {
  const navigation = useNavigation();

  // Mock data for 20 tutors
  const tutors = [
    'Dr. John Doe', 'Prof. Jane Smith', 'Dr. Richard Lee', 'Prof. Emily Clark', 
    'Dr. Michael Brown', 'Prof. Sarah Wilson', 'Dr. Jason Miller', 'Prof. Olivia Johnson',
    'Dr. Benjamin Moore', 'Prof. Laura Davis', 'Dr. Sophia Taylor', 'Prof. Andrew Harris',
    'Dr. Ava Walker', 'Prof. Matthew White', 'Dr. Ethan Hall', 'Prof. Mia Scott', 
    'Dr. Isabella Allen', 'Prof. Elijah King', 'Dr. Noah Harris', 'Prof. Chloe Perez'
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.title}>Top Tutors</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Top Tutors Count: {tutors.length}</Text>
      </View>
      {/* Make the list scrollable */}
      <ScrollView contentContainerStyle={styles.tutorsContainer}>
        {tutors.map((tutor, index) => (
          <View key={index} style={styles.tutorCard}>
            <Text style={styles.tutorName}>{tutor}</Text>
            <Text style={styles.tutorRating}>Rating: {4.5 + (index % 3) * 0.1}</Text>
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
    backgroundColor: '#FFCC00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  tutorsContainer: {
    marginTop: 20,
    paddingBottom: 20, // To ensure content is not cut off
  },
  tutorCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tutorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  tutorRating: {
    fontSize: 14,
    color: '#808080',
    marginTop: 5,
  },
});

export default TopTutors;
