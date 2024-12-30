import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import supabase from '../src/supabaseClient';
import { useRouter } from 'expo-router';

export default function tutorSub() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tutorId, setTutorId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = [
    { id: 1000, name: 'Software Engineering' },
    { id: 1001, name: 'Mobile Programming' },
    { id: 1002, name: 'Technopreneurship' },
    { id: 1003, name: 'Internet of Things' },
  ];

  const fetchTutorId = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error('Error fetching user:', error || 'No user found');
        Alert.alert('Error', 'Unable to identify the logged-in user.');
        return;
      }

      const userId = user.id;
      const { data, error: tutorError } = await supabase
        .from('tutors')
        .select('tutor_id')
        .eq('user_id', userId)
        .single();

      if (tutorError) throw tutorError;

      setTutorId(data?.tutor_id);
    } catch (error) {
      console.error('Error fetching tutor ID:', error.message);
      Alert.alert('Error', 'Could not fetch tutor information.');
    }
  };

  useEffect(() => {
    fetchTutorId();
  }, []);

  const enrollInSubject = async (subjectId) => {
    if (!tutorId) {
      Alert.alert('Error', 'You must be logged in as a tutor to enroll.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('tutor_subjects')
        .insert({
          tutor_id: tutorId,
          subject_id: subjectId,
        });

      if (error) throw error;

      Alert.alert('Success', `You have enrolled in ${selectedSubject.name}!`);
    } catch (error) {
      console.error('Error enrolling in subject:', error.message);
      Alert.alert('Error', 'Could not enroll in subject. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{ padding: 10 }} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enroll Subjects</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search subjects..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Subject Buttons */}
      <ScrollView style={styles.subjectsContainer}>
        {filteredSubjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={[
              styles.subjectButton,
              selectedSubject?.id === subject.id && styles.selectedSubjectButton,
            ]}
            onPress={() => setSelectedSubject(subject)}
          >
            <Text style={styles.subjectButtonText}>{subject.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Enrollment Section */}
      {selectedSubject && (
        <View style={styles.enrollmentContainer}>
          <Text style={styles.selectedSubjectTitle}>
            Enroll in {selectedSubject.name}?
          </Text>
          <TouchableOpacity
            style={styles.enrollButton}
            onPress={() => enrollInSubject(selectedSubject.id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.enrollButtonText}>Enroll</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#003366',
    marginRight:30
  },
  searchBar: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  subjectsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  subjectButton: {
    backgroundColor: '#003366',
    margin: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  subjectButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedSubjectButton: {
    borderWidth: 2,
    borderColor: '#FFC700',
  },
  enrollmentContainer: {
    alignItems: 'center',
  },
  enrollButton: {
    backgroundColor: '#FFC700',
    padding: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  enrollButtonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedSubjectTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
