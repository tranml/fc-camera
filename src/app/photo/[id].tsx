import { useLocalSearchParams, Stack, router } from "expo-router";
import { View, Text, Image, Pressable, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import VideoPlayer from "../../components/VideoPlayer";
import { getVideoType } from "../../utils/media";
import React from "react";
import * as MediaLibrary from "expo-media-library";

export default function PhotoDetailsScreen() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const { id } = useLocalSearchParams<{ id: string }>();

  const photoUri = FileSystem.documentDirectory + id;
  const mediaType = getVideoType(id);

  const onDeletePhoto = async () => {
    await FileSystem.deleteAsync(photoUri);
    router.back();
  };

  const onSavePhoto = async () => {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    try {
      const asset = await MediaLibrary.createAssetAsync(photoUri);
      Alert.alert("Photo saved to library");
    } catch (error) {
      Alert.alert("Error saving photo");
    }
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
            <View style={{ flexDirection: "row", gap: 10 }}>
              <MaterialIcons
                name="delete"
                size={24}
                color="red"
                onPress={onDeletePhoto}
              />
              <MaterialIcons
                name="save-alt"
                size={24}
                color="black"
                onPress={onSavePhoto}
              />
            </View>
          ),
        }}
      />
    </View>
  );
}
