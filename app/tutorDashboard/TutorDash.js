import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 
import supabase from '../src/supabaseClient';

export default function TutorDash() {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const router = useRouter(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const userId = user.id;
        const { data: tutorData, error: tutorError } = await supabase
          .from('users')
          .select('full_name, email')
          .eq('id', userId)
          .single();

        if (tutorError) throw tutorError;

        setUserData({ name: tutorData.full_name, email: tutorData.email });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.logoText}>
          <Text style={styles.logoPrimary}>Tutor</Text>
          <Text style={styles.logoSecondary}>Link</Text>
        </Text>
        <Ionicons name="notifications-outline" size={28} color="#003366" />
      </View>

      
      <View style={styles.userInfo}>
        <Image
          source={require('../pics/oliver.png')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>

    
      <Text style={styles.sectionTitle}>Tutor Sessions</Text>

     
      <View style={styles.cardsRow}>
        
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/dashboardCardsTutor/MySubjects')} 
        >
          <Ionicons name="book" size={32} color="#003366" />
          <Text style={styles.cardTitle}>My Subjects</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/dashboardCardsTutor/Messages')} 
        >
          <Ionicons name="chatbubble-ellipses-outline" size={32} color="#003366" />
          <Text style={styles.cardTitle}>Messages</Text>
          <Text style={styles.cardCount}>3</Text> 
        </TouchableOpacity>
      </View>

    
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/dashboardCardsTutor/BookingRequest')} 
        >
          <MaterialIcons name="pending-actions" size={32} color="#003366" />
          <Text style={styles.cardTitle}>Booking Request</Text>
          <Text style={styles.cardCount}>2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
    marginTop: -30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -10,
    marginTop: 50,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoPrimary: {
    color: '#003366',
  },
  logoSecondary: {
    color: '#FFCC00',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#003366',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  userEmail: {
    fontSize: 16,
    color: '#003366',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: -30,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 10,
  },
  cardCount: {
    fontSize: 16,
    color: '#003366',
  },
});
