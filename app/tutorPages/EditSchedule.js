import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';  
import supabase from '../src/supabaseClient';
import { useRouter } from 'expo-router'; // Import useRouter

const EditSchedule = () => {
    const router = useRouter(); // Initialize router
    const { schedule_id, availability_date_time } = router.query; // Get query parameters from the URL
  
    const [availabilityDateTime, setAvailabilityDateTime] = useState(availability_date_time || '');
  
    // Handle save for the schedule edit
    const handleSave = async () => {
      if (!schedule_id || !availabilityDateTime) {
        Alert.alert('Error', 'Missing schedule ID or availability date time.');
        return;
      }
  
      try {
        const { error } = await supabase
          .from('schedule')
          .update({ availability_date_time: availabilityDateTime })
          .eq('schedule_id', schedule_id);
  
        if (error) throw new Error('Failed to update schedule');
  
        Alert.alert('Success', 'Schedule updated successfully');
        router.back(); // Go back to the previous page after saving
      } catch (err) {
        console.error('Error updating schedule:', err.message);
        Alert.alert('Error', err.message);
      }
    };
  
    return (
      <View style={styles.container}>
        {/* Back Button and Title in a Row */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#003366" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Schedule</Text>
        </View>
  
        <Text style={styles.label}>Availability Date and Time</Text>
        <TextInput
          style={styles.input}
          value={availabilityDateTime}
          onChangeText={setAvailabilityDateTime}
          placeholder="YYYY-MM-DD HH:MM:SS"
        />
  
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#003366'
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditSchedule;
