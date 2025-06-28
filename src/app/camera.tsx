import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera";

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
      <CameraView style={styles.camera} />
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
  }
});