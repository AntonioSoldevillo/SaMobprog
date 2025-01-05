import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../src/supabaseClient'; 
import { useRouter } from 'expo-router'; 

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter(); 

  const handleLogout = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel", 
          style: "cancel"
        },
        {
          text: "OK", 
          onPress: async () => {
            
            await supabase.auth.signOut();
  
           
            router.push('/'); 
          }
        }
      ]
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}> 
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

     
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.settingSection}>
          <Text style={styles.optionText}>Language</Text>
          <Ionicons name="chevron-forward" size={20} color="#003366" />
        </View>

        
        <View style={styles.settingSection}>
          <Text style={styles.optionText}>Profile Picture</Text>
          <Ionicons name="chevron-forward" size={20} color="#003366" />
        </View>

       
        <View style={styles.settingSection}>
          <Text style={styles.optionText}>Account Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#003366" />
        </View>

        
        <View style={styles.settingSection}>
          <Text style={styles.optionText}>Security</Text>
          <Ionicons name="chevron-forward" size={20} color="#003366" />
        </View>

        
        <View style={styles.settingSection}>
          <Text style={styles.optionText}>Privacy</Text>
          <Ionicons name="chevron-forward" size={20} color="#003366" />
        </View>

      
        <View style={styles.settingSection}>
          <Text style={styles.optionText}>Feedback</Text>
          <Ionicons name="chevron-forward" size={20} color="#003366" />
        </View>

       
        <View style={styles.settingSection}>
          <Text style={styles.optionText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#003366" />
        </View>

        
        <TouchableOpacity style={styles.settingSection} onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
          <Ionicons name="chevron-forward" size={20} color="#003366" />
        </TouchableOpacity>
      </ScrollView>

   
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:-40
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginLeft: 10,
  },
  scrollContent: {
    paddingBottom: 100, 
  },
  settingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#003366',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 19,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
});

export default SettingsPage;
