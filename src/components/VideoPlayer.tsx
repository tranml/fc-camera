import React from "react";
import { View, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

interface VideoPlayerProps {
  uri: string;
}

export default function VideoPlayer({ uri }: VideoPlayerProps) {
  const player = useVideoPlayer(uri, (player) => {
    if (player) {
      player.loop = false;
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
  },
  video: {
    flex: 1,
  },
});
