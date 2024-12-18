/** @format */

import { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "../../constants";

const VideoCard: React.FC<{
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
}> = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

  // Initialize video player
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.pause();
  });

  // Get playback status
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  // Handle Play/Pause Toggle
  const handlePlayPause = () => {
    if (play && isPlaying) {
      player.pause();
      setPlay(false);
    } else {
      player.play();
      setPlay(true);
    }
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      {/* Header */}
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {/* Video Player */}

      {isPlaying ? (
        <View className="w-full h-60 rounded-xl mt-3 overflow-hidden">
          <VideoView
            player={player}
            allowsFullscreen
            nativeControls
            allowsPictureInPicture
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePlayPause}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // contentContainer: {
  //   flex: 1,
  //   padding: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingHorizontal: 50,
  // },
  // video: {
  //   width: 350,
  //   height: 275,
  // },
  // controlsContainer: {
  //   padding: 10,
  // },
});
export default VideoCard;
