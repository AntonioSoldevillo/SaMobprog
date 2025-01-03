import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Router } from 'expo-router';
import SchedulePage from './app/schedule/[tutorId]';
import Dashboard from './app/tuteeDashboard/Dashboard';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Schedule"
          component={SchedulePage}
          options={{ headerShown: false }}  
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}  
        />
      
        
      
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
