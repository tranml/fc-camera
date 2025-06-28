import { useLocalSearchParams, Stack, router } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";
import * as FileSystem from "expo-file-system";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function PhotoDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const photoUri = FileSystem.documentDirectory + id;

  const onDeletePhoto = async () => {
    await FileSystem.deleteAsync(photoUri, { idempotent: true });
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: photoUri }}
        style={{ width: "100%", height: "100%" }}
      />
      <Stack.Screen
        options={{
          title: `Photo`,
          headerRight: () => (
            <MaterialIcons
              name="delete"
              size={24}
              color="red"
              onPress={onDeletePhoto}
            />
          ),
        }}
      />
    </View>
  );
}
