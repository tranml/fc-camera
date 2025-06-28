import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Camera App</Text>
      <Link href="/camera" style={{ marginTop: 20, color: "blue" }}>
        Go to Camera
      </Link>
    </View>
  );
}
