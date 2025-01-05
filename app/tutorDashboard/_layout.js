import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="TutorDash"
        options={{
          tabBarIcon: () => <Ionicons name="home-outline" size={24} color="#003366" />,
          tabBarLabel: '',  
          headerShown: false, 
        }}
      />
      
      <Tabs.Screen
        name="tutorProfile"
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={24} color="#003366" />,
          tabBarLabel: '',  
          headerShown: false,  
        }}
      />
      
      <Tabs.Screen
        name="tutorSched"
        options={{
          tabBarIcon: () => <Ionicons name="calendar-outline" size={24} color="#003366" />,
          tabBarLabel: '',  
          headerShown: false,  
        }}
      />
      
      <Tabs.Screen
        name="tutorSub"
        options={{
          tabBarIcon: () => <Ionicons name="book-outline" size={24} color="#003366" />,
          tabBarLabel: '',  
          headerShown: false,  
        }}
      />
      
      <Tabs.Screen
        name="tutorSettings"
        options={{
          tabBarIcon: () => <Ionicons name="settings-outline" size={24} color="#003366" />,
          tabBarLabel: '',  
          headerShown: false,  
        }}
      />
    </Tabs>
  );
}
