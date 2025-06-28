import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function PhotoDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Photo {id} Details Screen</Text>
      <Stack.Screen options={{ title: `Photo ${id}` }} />
    </View>
  );
}