import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router"; // Use expo-router for navigation

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="tuteeDashboard" options={{ headerShown: false }} />
      <Stack.Screen name="tutorDashboard" options={{ headerShown: false }} />
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} /> 
      <Stack.Screen name="dashboardCards/bookingInfo" options={{ headerShown: false }} />
      <Stack.Screen name="dashboardCards/Completed" options={{ headerShown: false }} />
      <Stack.Screen name="dashboardCards/Rejected" options={{ headerShown: false }} />
      <Stack.Screen name="dashboardCards/TopTutors" options={{ headerShown: false }} />
      <Stack.Screen name="schedule/[tutorId]" options={{ headerShown: false }} />
      <Stack.Screen name="tutorPages/addSchedule" options={{ headerShown: false }} />
      <Stack.Screen name="dashboardCardsTutor/BookingRequest" options={{ headerShown: false }} />
      <Stack.Screen name="dashboardCardsTutor/Messages" options={{ headerShown: false }} />
      <Stack.Screen name="dashboardCardsTutor/MySubjects" options={{ headerShown: false }} />
    </Stack>
  );
}
