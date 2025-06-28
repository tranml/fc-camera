import { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Pressable, Image } from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (photo) {
    return <Image source={{ uri: photo }} style={styles.photo} />;
  }

  return (
    <View>
      <CameraView ref={cameraRef} style={styles.camera} facing="front">
        <View style={styles.cameraControl}>
          <Pressable style={styles.recordButton} onPress={takePhoto}>
            <View style={styles.recordButtonInner} />
          </Pressable>
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
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});
