import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Modal, Button } from 'react-native';
import supabase from '../src/supabaseClient'; 
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router'; 

const Schedule = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [error, setError] = useState(null);
  const [scheduleId, setScheduleId] = useState(route?.params?.scheduleId || null); 
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const router = useRouter(); 

  
  useEffect(() => {
    if (scheduleId) {
      fetchScheduleData(scheduleId);
    }
  }, [scheduleId]);

  // Function to fetch schedule data from the database
  const fetchScheduleData = async (scheduleId) => {
    try {
      const { data, error } = await supabase
        .from('schedule')
        .select('availability_date_time')
        .eq('schedule_id', scheduleId)
        .single();
      
      if (error) {
        setError('Error fetching schedule data: ' + error.message);
        return;
      }

      if (data) {
        const scheduleDateTime = new Date(data.availability_date_time);
        setSelectedDate(scheduleDateTime.toISOString().split('T')[0]); 
        setSelectedTime(scheduleDateTime); 
        setCurrentSchedule(data);
      }
    } catch (err) {
      setError('An error occurred while fetching schedule data: ' + err.message);
    }
  };

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString); 
  };

  // Handle time change from datetime picker
  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(Platform.OS === 'ios' ? true : false); 
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  // Handle saving or updating schedule
  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select a valid date and time');
      return;
    }
  
    // Extract hours and minutes from selected time
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
  
    // Create a Date object for selected date and set hours and minutes
    const localDateTime = new Date(selectedDate);
    localDateTime.setHours(hours);
    localDateTime.setMinutes(minutes);
    
    // Adjust the local time to UTC by getting the time zone offset in minutes
    const timeZoneOffset = localDateTime.getTimezoneOffset(); 
    localDateTime.setMinutes(localDateTime.getMinutes() - timeZoneOffset); 
  
    const availabilityDateTime = localDateTime.toISOString(); 
   
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
  
      if (userError) {
        setError('Error retrieving user: ' + userError.message);
        return;
      }
  
      if (!user) {
        setError('You must be logged in to create or edit a schedule');
        return;
      }
  
      // Fetch the tutor_id 
      const { data: tutorData, error: tutorError } = await supabase
        .from('tutors')
        .select('tutor_id')
        .eq('user_id', user.id)
        .single();
  
      if (tutorError || !tutorData) {
        setError('Tutor ID not found for this user');
        return;
      }

      // If editing, update the schedule
      if (scheduleId) {
        const { data, error } = await supabase
          .from('schedule')
          .update({ availability_date_time: availabilityDateTime })
          .eq('schedule_id', scheduleId);
  
        if (error) {
          setError('Error updating schedule: ' + error.message);
        } else {
          setShowSuccessModal(true); 
        }
      } else {
        // If creating, insert the schedule into the schedule table
        const { data, error } = await supabase.from('schedule').insert([{
          tutor_id: tutorData.tutor_id, 
          availability_date_time: availabilityDateTime, 
        }]);
  
        if (error) {
          setError('Error creating schedule: ' + error.message);
        } else {
          setShowSuccessModal(true); 
        }
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    }
  };

  // Handle closing the success modal and navigate back to dashboard
  const handleCloseModal = () => {
    setShowSuccessModal(false); 
    router.push('/tutorDashboard/TutorDash'); 
  };

  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#003366" />
      </TouchableOpacity>

      <Text style={styles.title}>{scheduleId ? 'Edit Schedule' : 'Create a New Schedule'}</Text>

      
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue', selectedTextColor: 'white' },
        }}
      />

      
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.buttonText}>Select Time</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      
      <TouchableOpacity style={[styles.button, { marginTop: 15 }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{scheduleId ? 'Update Schedule' : 'Save Schedule'}</Text>
      </TouchableOpacity>

     
      <Modal
        transparent={true}
        visible={showSuccessModal}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Schedule Added Successfully!</Text>
            <Button title="Go back to Dashboard" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#003366', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Schedule;
