import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Dashboard"
        options={{
          tabBarIcon: () => <Ionicons name="home-outline" size={24} color="#003366" />,
          tabBarLabel: '',  // Hide the tab label (name)
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={24} color="#003366" />,
          tabBarLabel: '',  // Hide the tab label (name)
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="SubjectsTutor"
        options={{
          tabBarIcon: () => <Ionicons name="book-outline" size={24} color="#003366" />,
          tabBarLabel: '',  // Hide the tab label (name)
          headerShown: false, 
          title: "Subjects", // Keep the title for internal use if needed
        }}
      />
      <Tabs.Screen
        name="Message"
        options={{
          tabBarIcon: () => <Ionicons name="chatbubble-outline" size={24} color="#003366" />,
          tabBarLabel: '',  // Hide the tab label (name)
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: () => <Ionicons name="settings-outline" size={24} color="#003366" />,
          tabBarLabel: '',  // Hide the tab label (name)
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}
