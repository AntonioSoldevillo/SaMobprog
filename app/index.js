import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router'; 
import supabase from './src/supabaseClient'; 

export default function Index() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(null); 

  
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('Login error:', authError.message);
        setErrorMessage(authError.message);
        return;
      }

      const userId = authData.user.id;

      // Fetch user details from `users` table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Error fetching user:', userError.message);
        setErrorMessage('Error fetching user details: ' + userError.message);
        return;
      }

      // Check if the user is also in the `tutors` table
      const { data: tutorData, error: tutorError } = await supabase
        .from('tutors')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (tutorError && tutorError.code !== 'PGRST116') { 
        console.error('Error checking tutor role:', tutorError.message);
        setErrorMessage('Error checking tutor role: ' + tutorError.message);
        return;
      }

      // Navigate to the respective dashboard based on role
      if (tutorData) {
        router.push('tutorDashboard'); 
      } else {
        router.push('tuteeDashboard'); 
      }
    } catch (error) {
      console.error('Unexpected login error:', error);
      setErrorMessage('An unexpected error occurred: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        
        <Ionicons name="book-outline" size={100} color="#003366" style={styles.logo} />

        
        <Text style={styles.title}>TutorLink</Text>

      
        <TextInput
          label="Email address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          mode="outlined"
          theme={{
            colors: {
              primary: '#003366',
              underlineColor: 'transparent',
            }
          }}
        />

       
        <View style={styles.passwordContainer}>
          <TextInput
            label="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible} 
            style={styles.input}
            mode="outlined"
            theme={{
              colors: {
                primary: '#003366',
                underlineColor: 'transparent',
              }
            }}
          />
          <Ionicons
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#808080"
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          />
        </View>

        
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

    
        <View style={styles.rememberMeContainer}>
          <Checkbox
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>

        
        <Button mode="contained" onPress={handleLogin} style={styles.button} theme={{
          colors: {
            primary: '#003366',
          }
        }}>
          Login
        </Button>

        
        <Button
          mode="text"
          onPress={() => router.push('/forgotPassword')} 
          style={styles.forgotPasswordButton}
          theme={{
            colors: {
              primary: '#003366',
            }
          }}
        >
          Forgot Password?
        </Button>

  
        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <Button
            mode="text"
            onPress={() => router.replace('signUp')}
            style={styles.signUpButton}
            theme={{
              colors: {
                primary: '#003366',
              }
            }}
          >
            Sign Up
          </Button>
        </View>

    
        <Text style={styles.orText}>OR</Text>
        <Button
          mode="outlined"
          icon="google"
          style={styles.socialButton}
          theme={{
            colors: {
              primary: '#003366',
            }
          }}
        >
          Continue with Google
        </Button>
        <Button
          mode="outlined"
          icon="facebook"
          style={styles.socialButton}
          theme={{
            colors: {
              primary: '#003366',
            }
          }}
        >
          Continue with Facebook
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003366',
    marginBottom: 30,
  },
  logo: {
    marginBottom: 15,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    width: 300,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#003366',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#003366',
    width: 300,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -5,
    alignItems: 'center',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 5,
    color: '#808080',
    marginBottom: 20,
  },
  socialButton: {
    marginBottom: 10,
    width: 300,
    borderColor: '#003366',
    borderWidth: 1, 
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  signUpButton: {
    marginLeft: -10,
    color: '#003366',
  },
  forgotPasswordButton: {
    color: '#003366',
    marginTop: -10,
  },
});
