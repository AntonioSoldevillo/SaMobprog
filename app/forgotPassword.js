import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../app/src/supabaseClient'; 
import { useRouter } from 'expo-router'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter(); 

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
     
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);

      if (error) {
        Alert.alert('Error', error.message);
        setIsLoading(false);
        return;
      }

      
      Alert.alert('Success', 'Password reset email has been sent');
      router.push('/Login'); 
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      <Ionicons
        name="arrow-back"
        size={30}
        color="#003366"
        style={styles.backIcon}
        onPress={() => router.back()} 
      />

      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        mode="outlined"
        theme={{
        colors: {
          primary: '#003366', 
          underlineColor: 'transparent', 
        }}
        }
        
      />

      
      <Button
        mode="contained"
        onPress={handleResetPassword}
        style={styles.button}
        loading={isLoading} 
        disabled={isLoading} 
      >
        Reset Password
      </Button>

      
      <Button
        mode="text"
        onPress={() => router.back()} 
        style={styles.backButton}theme={{
            colors: {
              primary: '#003366',
            }
          }}
      >
        Back to Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop:-1
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#003366',
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    width: '100%',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#003366',
  },
  backButton: {
    color: '#003366',
  },
});

export default ForgotPassword;
