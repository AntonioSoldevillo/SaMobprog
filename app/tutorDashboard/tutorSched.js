import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import supabase from '../src/supabaseClient';
import { useRouter } from 'expo-router'; // Import useRouter

const TutorSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

  // Fetch schedules for the logged-in tutor
  const fetchSchedules = async () => {
    setLoading(true); 
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) throw new Error('Failed to retrieve logged-in user');
      if (!user) throw new Error('No user logged in');

      // Fetch the tutor_id using the user.id
      const { data: tutorData, error: tutorError } = await supabase
        .from('tutors')
        .select('tutor_id')
        .eq('user_id', user.id)
        .single();

      if (tutorError || !tutorData) throw new Error('Tutor ID not found for this user');

      // Fetch the schedules for the tutor
      const { data: schedulesData, error: schedulesError } = await supabase
        .from('schedule')
        .select('*')
        .eq('tutor_id', tutorData.tutor_id);

      if (schedulesError) throw new Error('Failed to fetch schedules');

      setSchedules(schedulesData || []);
    } catch (err) {
      console.error('Error fetching schedules:', err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Delete a schedule
  const handleDelete = async (scheduleId) => {
    try {
      const { error } = await supabase
        .from('schedule')
        .delete()
        .eq('schedule_id', scheduleId);

      if (error) throw new Error('Failed to delete schedule');

      Alert.alert('Success', 'Schedule deleted successfully');
      fetchSchedules(); // Refresh the schedules list
    } catch (err) {
      console.error('Error deleting schedule:', err.message);
      Alert.alert('Error', err.message);
    }
  };

  // Navigate to Edit Schedule screen with query parameters
  const handleEdit = (schedule) => {
    // Use React Navigation to go to the EditSchedule screen
    router.push(`/tutorPages/EditSchedule?schedule_id=${schedule.schedule_id}&availability_date_time=${schedule.availability_date_time}`);
  };
  

  // Render a schedule item
  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <Text style={styles.scheduleText}>
        {new Date(item.availability_date_time).toLocaleString()} {/* Format the date */}
      </Text>

      <View style={styles.buttonContainer}>
        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.schedule_id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Arrow Icon */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={30} color="#003366" />
      </TouchableOpacity>

      <Text style={styles.title}>Your Schedules</Text>

      {loading ? (
        <Text>Loading schedules...</Text>
      ) : schedules.length === 0 ? (
        <Text>No schedules found.</Text>
      ) : (
        <FlatList
          data={schedules}
          keyExtractor={(item) => item.schedule_id.toString()}
          renderItem={renderScheduleItem}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/tutorPages/addSchedule')} // Use router.push here too
      >
        <Text style={styles.addButtonText}>Add Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginTop: 1,
  },
  backButton: {
    position: 'absolute',
    top: 23,
    left: 10, 
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#003366'
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
  scheduleText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFC700', 
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336', 
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TutorSchedule;
