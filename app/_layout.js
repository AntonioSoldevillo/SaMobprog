import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router"; // Use expo-router for navigation

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="tuteeDashboard" options={{ headerShown: false }} />
      <Stack.Screen name="tutorDashboard" options={{ headerShown: false }} />
    </Stack>
  );
}
