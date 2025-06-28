import { View, Text } from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Camera App</Text>
      <Link href="/camera" style={{ marginTop: 20, color: "blue" }}>
        <View
          style={{
            backgroundColor: "#007AFF",
            padding: 14,
            borderRadius: 50,
          }}
        >
          <MaterialIcons name="photo-camera" size={24} color="white" />
        </View>
      </Link>
    </View>
  );
}
