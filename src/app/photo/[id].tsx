import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function PhotoDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Photo Details Screen</Text>
      <Text>{id}</Text>
    </View>
  );
}