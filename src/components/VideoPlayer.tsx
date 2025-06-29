import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { MaterialIcons } from "@expo/vector-icons";

interface VideoPlayerProps {
  uri: string;
}

export default function VideoPlayer({ uri }: VideoPlayerProps) {
  const player = useVideoPlayer(uri, (player) => {
    if (player) {
      player.loop = true;
      player.play();
    }
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        contentFit="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    flex: 1,
  },
});
