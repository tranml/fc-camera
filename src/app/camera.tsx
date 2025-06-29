import { useEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
  Button,
} from "react-native";
import {
  useCameraPermissions,
  CameraView,
  CameraCapturedPicture,
} from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import path from "path";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";

import VideoPlayer from "../components/VideoPlayer";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [video, setVideo] = useState<string>();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const onPress = () => {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      console.log("video being stoped manually", video);
      setIsRecording(false);
    } else {
      takePhoto();
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo);
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync({
        maxDuration: 10,
      });
      setVideo(video?.uri);
      setIsRecording(false);
    }
  };

  const savePhoto = async (uri: string) => {
    console.log("saving photo", uri);
    if (uri) {
      const filename = path.parse(uri).base;
      await FileSystem.copyAsync({
        from: uri,
        to: FileSystem.documentDirectory + filename,
      });

      setPhoto(undefined);
      setVideo(undefined);
      router.back();
      console.log(filename);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (photo !== undefined || video !== undefined) {
    return (
      <View style={styles.photoContainer}>
        {photo && <Image source={{ uri: photo.uri }} style={styles.photo} />}
        {video && <VideoPlayer uri={video} />}

        <View>
          <Button title="Save" />
        </View>

        <Pressable
          style={styles.closeButton}
          onPress={() => {
            setPhoto(undefined);
            setVideo(undefined);
          }}
        >
          <MaterialIcons name="close" size={24} color="black" />
        </Pressable>

        <Pressable
          style={styles.saveButton}
          onPress={() => {
            const uri = photo?.uri || video;
            if (uri) savePhoto(uri);
          }}
        >
          <MaterialIcons name="save" size={24} color="black" />
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="front"
        mode="video"
        onCameraReady={() => console.log("Camera ready")}
      />

      <View style={styles.cameraControl}>
        <Pressable
          style={[styles.recordButton]}
          onPress={onPress}
          onLongPress={startRecording}
        >
          <View
            style={[
              styles.recordButtonInner,
              {
                borderRadius: isRecording ? 10 : 30,
                width: isRecording ? 40 : 60,
                height: isRecording ? 40 : 60,
              },
            ]}
          />
        </Pressable>
      </View>
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
  photoContainer: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    left: 20,
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
  },
  saveButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
  },
});
