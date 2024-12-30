import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter
import supabase from '../src/supabaseClient';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const router = useRouter(); // Initialize useRouter

  // Fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const userId = user.id; // Supabase user ID

        const { data: userData, error: queryError } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', userId)
          .single();

        if (queryError) throw queryError;

        setUserName(userData?.full_name || 'Unknown User');
      } catch (error) {
        console.error('Error fetching user name:', error.message);
      }
    };

    fetchUserName();
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
        <Image source={require('../pics/profile.jpg')} style={styles.profileImage} />
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hi!</Text>
          <Text style={styles.userName}>{userName || 'Loading...'}</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput placeholder="Search Subjects" style={styles.searchInput} />
        <Ionicons name="search" size={20} color="#808080" style={styles.searchIcon} />
      </View>

      <Text style={styles.sectionTitle}>Tutor Sessions</Text>
      <View style={styles.cardsContainer}>
        {/* First Row of Cards */}
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/dashboardCards/bookingInfo')}>
            <MaterialIcons name="pending-actions" size={32} color="#003366" />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Bookings</Text>
              <Text style={styles.cardCount}>2</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => router.push('/dashboardCards/Completed')}>
  <MaterialIcons name="check-circle-outline" size={32} color="#003366" />
  <View style={styles.cardText}>
    <Text style={styles.cardTitle}>Completed</Text>
    <Text style={styles.cardCount}>5</Text>
  </View>
</TouchableOpacity>
        </View>

        {/* Second Row of Cards */}
        <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/dashboardCards/Rejected')}>
  <MaterialIcons name="cancel" size={32} color="#003366" />
  <View style={styles.cardText}>
    <Text style={styles.cardTitle}>Rejected</Text>
    <Text style={styles.cardCount}>1</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity style={styles.card} onPress={() => router.push('/dashboardCards/TopTutors')}>
  <FontAwesome name="line-chart" size={32} color="#003366" />
  <View style={styles.cardText}>
    <Text style={styles.cardTitle}>Top Tutors</Text>
    <Text style={styles.cardCount}>10+</Text>
  </View>
</TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
    marginTop: -20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#003366',
  },
  greeting: {
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    padding: 10,
  },
  greetingText: {
    fontSize: 16,
    color: '#003366',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cardText: {
    marginTop: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  cardCount: {
    fontSize: 16,
    color: '#003366',
  },
});

export default Dashboard;
