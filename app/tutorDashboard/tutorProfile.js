import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'; 
import supabase from '../src/supabaseClient'; 

export default function TutorProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({}); 
  const router = useRouter();

 
  const defaultProfileImage = require('../pics/oliver.png');

  // Fetch user profile picture from Supabase
  const fetchUserProfile = async () => {
    const user = supabase.auth.user(); 
    if (user) {
      try {
        const { data, error } = await supabase
          .from('profile_pics')
          .select('image_url')
          .eq('user_id', user.id)
          .single();

        if (data && data.image_url) {
          setProfileImage({ uri: data.image_url }); 
        } else {
          setProfileImage(defaultProfileImage); 
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    }
  };

  // Request permission for image picker
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload your profile image!');
    }
  };

  // Handle image picking and uploading to Supabase
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1], 
    });

    if (!result.cancelled) {
      const selectedUri = result.uri;
      setProfileImage({ uri: selectedUri }); 

      // Upload image to Supabase storage
      const user = supabase.auth.user();
      if (user) {
        const fileExt = selectedUri.split('.').pop();
        const fileName = `${user.id}_profile.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
          .from('profile_pics') 
          .upload(fileName, selectedUri, {
            contentType: 'image/*',
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          return;
        }

        // Get the uploaded image URL
        const imageUrl = supabase.storage
          .from('profile_pics')
          .getPublicUrl(fileName).publicURL;

        // Save the image URL in the 'profile_pics' table
        const { error: insertError } = await supabase
          .from('profile_pics')
          .upsert({
            user_id: user.id,
            image_url: imageUrl,
          });

        if (insertError) {
          console.error("Error saving image URL:", insertError);
        } else {
          // Update profile image after successful upload
          setProfileImage({ uri: imageUrl });
        }
      }
    }
  };

  useEffect(() => {
    requestPermissions(); 
    fetchUserProfile(); 
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#003366" />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={profileImage || defaultProfileImage} style={styles.profileImage} />
          </TouchableOpacity>
          <Text style={styles.name}>Oliver Smith</Text>
          <Text style={styles.subject}>Math Tutor</Text>
          
          
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>Upload Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <View style={styles.box}>
            <Text style={styles.text}>
              I have been teaching math for over 5 years, specializing in algebra and calculus. I enjoy helping students
              develop a strong foundation in mathematics and building their confidence.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.box}>
            <Text style={styles.text}>Email: oliver@tutorlink.com</Text>
            <Text style={styles.text}>Phone: +63 912 345 6789</Text>
          </View>

          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.box}>
            <Text style={styles.text}>Monday - Friday: 10:00 AM - 4:00 PM</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 100, 
    marginTop: 5
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 112,
    color:'#003366',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#003366',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#003366',
  },
  subject: {
    fontSize: 18,
    color: 'gray',
  },
  uploadButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#003366',
    borderRadius: 5,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#003366',
  },
  box: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
});
