import React from "react";
import { View, Pressable, StyleSheet, FlatList, Image } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";
import { useCallback, useState } from "react";
import { getVideoType } from "../utils/media";
import VideoPlayer from "../components/VideoPlayer";

type Photo = {
  name: string;
  uri: string;
  type: "image" | "video";
};

export default function HomeScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadPhotos();
    }, [])
  );

  const loadPhotos = async () => {
    if (!FileSystem.documentDirectory) return;

    const files = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );

    // console.log("documentDirectory:", FileSystem.documentDirectory);
    // console.log("files:", files);

    setPhotos(
      files.map((file) => ({
        name: file,
        uri: FileSystem.documentDirectory + file,
        type: getVideoType(file),
      }))
    );
  };

  console.log("photos:", JSON.stringify(photos, null, 2));

  return (
    <View style={{ flex: 1, paddingHorizontal: 4 }}>
      <FlatList
        data={photos}
        numColumns={3}
        contentContainerStyle={{ gap: 1 }}
        columnWrapperStyle={{ gap: 1 }}
        renderItem={({ item }) => (
          <Link href={`/photo/${item.name}`} asChild>
            <Pressable style={styles.photoContainer}>
              {item.type === "video" ? (
                <>
                  <VideoPlayer uri={item.uri}/>
                  <MaterialIcons
                    name="play-circle-outline"
                    size={24}
                    color="white"
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                    }}
                  />
                </>
              ) : (
                <Image style={styles.photo} source={{ uri: item.uri }} />
              )}
            </Pressable>
          </Link>
        )}
        keyExtractor={(item) => item.name}
      />

      <Link href="/camera" style={{ marginTop: 20, color: "blue" }} asChild>
        <Pressable style={styles.floatingButton}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  photoContainer: {
    flex: 1,
    maxWidth: "33.33%",
  },
  photo: {
    aspectRatio: 3 / 4,
    borderRadius: 4,
  },
});
