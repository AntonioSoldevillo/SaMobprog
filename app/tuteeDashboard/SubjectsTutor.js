import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import supabase from '../src/supabaseClient';

const SubjectTutorsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase.from('subjects').select('*');
      if (error) throw error;
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error.message);
      setErrorMessage('Could not load subjects.');
    }
  };

  const fetchTutors = async (subjectId) => {
    setSelectedSubject(subjects.find((subject) => subject.subject_id === subjectId));
    setIsLoading(true);
    setTutors([]);
    setErrorMessage(null);
  
    try {
      const { data: tutorSubjectData, error } = await supabase
        .from('tutor_subjects')
        .select('tutor_id')
        .eq('subject_id', subjectId);
      if (error) throw error;
  
      const tutorIds = tutorSubjectData.map(item => item.tutor_id);
      if (tutorIds.length > 0) {
        const { data: tutorDetails, error: tutorError } = await supabase
          .from('tutors')
          .select('tutor_id, user_id') // Remove 'rating' field
        if (tutorError) throw tutorError;
  
        const userIds = tutorDetails.map(item => item.user_id);
        if (userIds.length > 0) {
          const { data: userDetails, error: userError } = await supabase
            .from('users')
            .select('id, full_name, email')
            .in('id', userIds);
  
          if (userError) throw userError;
  
          const formattedTutors = tutorDetails.map((tutor) => ({
            tutor_id: tutor.tutor_id,
            full_name: userDetails.find((user) => user.id === tutor.user_id).full_name,
            email: userDetails.find((user) => user.id === tutor.user_id).email,
            rating: 0, // Set rating to 0 since there's no rating field
          }));
  
          setTutors(formattedTutors);
        }
      }
    } catch (error) {
      console.error('Error fetching tutors:', error.message);
      setErrorMessage('Could not load tutors.');
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter(subject =>
    subject.subject_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderRating = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={20}
          color="#ffcc00"
        />
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#003366" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>IT Subjects</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search subjects..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.subjectsContainer}>
        {filteredSubjects.map((subject) => (
          <TouchableOpacity
            key={subject.subject_id}
            style={styles.subjectButton}
            onPress={() => fetchTutors(subject.subject_id)}
          >
            <Text style={styles.subjectButtonText}>{subject.subject_name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tutorsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#003366" />
        ) : errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : selectedSubject && tutors.length > 0 ? (
          <>
            <Text style={styles.selectedSubjectTitle}>Tutors for {selectedSubject.subject_name}:</Text>
            <ScrollView>
              {tutors.map((tutor, index) => (
                <View key={index} style={styles.tutorCard}>
                  <Text style={styles.tutorName}>{tutor.full_name}</Text>
                  <Text style={styles.tutorEmail}>{tutor.email}</Text>
                  {renderRating(tutor.rating)} {/* Display rating */}
                  <TouchableOpacity
                    style={styles.viewProfileButton}
                    onPress={() => router.push(`/tutor-profile/${tutor.tutor_id}`)}
                  >
                    <Text style={styles.viewProfileButtonText}>View Tutor Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => router.push(`/schedule/${tutor.tutor_id}`)}
                  >
                    <Text style={styles.bookButtonText}>Book Tutor</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </>
        ) : selectedSubject ? (
          <Text style={styles.noTutorsText}>No tutors available for {selectedSubject.subject_name}.</Text>
        ) : (
          <Text style={styles.noTutorsText}>Select a subject to view its tutors.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 2,
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#003366',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subjectButton: {
    flexBasis: '45%',
    marginBottom: 10,
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  subjectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tutorsContainer: {
    flex: 1,
  },
  selectedSubjectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  tutorCard: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#003366',
    marginBottom: 15,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
  },
  tutorEmail: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  viewProfileButton: {
    marginTop: 10,
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewProfileButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noTutorsText: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SubjectTutorsPage;
