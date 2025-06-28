import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";

type Photo = {
  name: string;
  uri: string;
};

export default function HomeScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    loadPhotos();
  }, []);

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
      }))
    );
  };

  console.log("photos:", JSON.stringify(photos, null, 2));

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Camera App</Text>

      <View style={{ marginTop: 20, gap: 16 }}>
        <Link href="/photo/1">Image 1</Link>
        <Link href="/photo/2">Image 2</Link>
        <Link href="/photo/3">Image 3</Link>
      </View>

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
});
