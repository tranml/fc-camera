import { useLocalSearchParams, Stack, router } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";
import * as FileSystem from "expo-file-system";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import VideoPlayer from "../../components/VideoPlayer";
import { getVideoType } from "../../utils/media";

export default function PhotoDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const photoUri = FileSystem.documentDirectory + id;
  const mediaType = getVideoType(id);

  const onDeletePhoto = async () => {
    await FileSystem.deleteAsync(photoUri);
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      {mediaType === "video" ? (
        <VideoPlayer uri={photoUri} />
      ) : (
        <Image
          source={{ uri: photoUri }}
          style={{ width: "100%", height: "100%" }}
        />
      )}
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
