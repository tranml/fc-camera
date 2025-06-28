import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  if (!permission?.granted) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  return (
    <View>
      <CameraView style={styles.camera} facing="front">
        <View style={styles.cameraControl}>
          <MaterialCommunityIcons
            name="record-circle-outline"
            size={72}
            color="red"
          />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  cameraControl: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#00000099",
  },
});
