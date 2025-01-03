import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import supabase from '../src/supabaseClient';

const EditSchedule = () => {
  const router = useRouter();
  const { schedule_id, availability_date_time } = useLocalSearchParams(); // Get params using Expo Router

  // Convert the initial availability_date_time to a string format
  const initialDateTime = new Date(decodeURIComponent(availability_date_time)).toISOString().slice(0, 19); // ISO string format (YYYY-MM-DDTHH:MM:SS)

  const [newDateTime, setNewDateTime] = useState(initialDateTime); // Store the date/time as a string
  const [loading, setLoading] = useState(false);

  // Save the updated schedule to the database
  const handleSave = async () => {
    if (isNaN(new Date(newDateTime).getTime())) {
      Alert.alert('Invalid Date', 'Please enter a valid date and time.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('schedule')
        .update({ availability_date_time: new Date(newDateTime).toISOString() }) // Save as ISO string
        .eq('schedule_id', schedule_id);

      if (error) throw error;

      Alert.alert('Success', 'Schedule updated successfully');
      router.push('tutorDashboard/TutorDash'); // Navigate to TutorDash after saving
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle text change in the input field
  const handleChange = (text) => {
    setNewDateTime(text); // Update the state with the new input
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
        value={newDateTime} // Use the string format for date/time
        onChangeText={handleChange} // Allow manual text input for date/time
        placeholder="Enter date and time (YYYY-MM-DDTHH:MM:SS)"
      />

      {/* Loading Indicator or Save Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#003366',
    marginLeft: -23,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditSchedule;
