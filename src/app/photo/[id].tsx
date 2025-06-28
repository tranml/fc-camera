import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text, Image } from "react-native";
import * as FileSystem from "expo-file-system";

export default function PhotoDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const photo = FileSystem.documentDirectory + id;

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: photo }}
        style={{ width: "100%", height: "100%" }}
      />
      <Stack.Screen options={{ title: `Photo` }} />
    </View>
  );
}
