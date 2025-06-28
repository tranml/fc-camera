import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ presentation: "modal" }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
