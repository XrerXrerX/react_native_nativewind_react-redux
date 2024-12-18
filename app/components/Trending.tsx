/** @format */

import React, { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ViewToken,
  View,
} from "react-native";

import { icons } from "../../constants";
import { useEvent } from "expo";
// import { View } from "react-native-reanimated/lib/typescript/Animated";

const zoomIn: Animatable.CustomAnimation = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1,
    scaleY: 1,
  },
};
const zoomOut: Animatable.CustomAnimation = {
  0: {
    scaleX: 1,
    scaleY: 1,
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};

// Define types for props
interface Post {
  $id: string;
  video: string;
  thumbnail: string;
}

interface TrendingItemProps {
  activeItem: string;
  item: Post;
}

interface TrendingProps {
  posts: Post[];
}

// TrendingItem Component
const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [trendingPlay, setTrendingPlay] = useState(false);

  // Initialize video player
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true;
    player.pause();
  });

  // Get playback status
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handlePlayPause = () => {
    if (trendingPlay && isPlaying) {
      player.pause();
      setTrendingPlay(false);
    } else {
      player.play();
      setTrendingPlay(true);
    }
  };

  return (
    // <View>
    //   <Text>trending</Text>
    // </View>
    <Animatable.View
      className="mr-7"
      useNativeDriver={true}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
        <View className="w-52 h-72 rounded-[33px] mt-3 overflow-hidden bg-white/10">
          <VideoView
            player={player}
            // className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
            // resizeMode={ResizeMode.CONTAIN}
            allowsFullscreen
            allowsPictureInPicture
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={handlePlayPause}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

// Trending Component
const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<string>(posts[0].$id);

  // Define the type for viewable items
  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      initialNumToRender={3} // Render 3 item awal
      windowSize={3} // Kontrol render item di luar layar
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 150, y: 0 }}
    />
  );
};

export default Trending;
