import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Camera App</Text>
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
