/** @format */

import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState, InfoBox, VideoCard } from "../components";
import { icons } from "@/constants";

// Corrected InfoBoxProps type
type InfoBoxProps = {
  title: string;
  subtitle: string; // This is a required prop
  containerStyles?: string;
  titleStyles?: string;
};

// Mock data
const posts = [
  {
    $id: "1",
    title: "Lofi Video",
    thumbnail:
      "https://img.freepik.com/premium-photo/space-lion-space-godlike-creature-cosmic-awe-inspiring-dreamy-digital-illustration-generative-ai_742252-14190.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    creator: {
      username: "qq",
      avatar:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    },
  },
  {
    $id: "2",
    title: "Video Example Example",
    thumbnail:
      "https://img.freepik.com/premium-photo/space-lion-space-godlike-creature-cosmic-awe-inspiring-dreamy-digital-illustration-generative-ai_742252-14190.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    creator: {
      username: "jane_smith",
      avatar:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    },
  },
];

// Mock user data
const user = {
  avatar:
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  username: "john_doe",
};

const Bookmark = () => {
  const { query } = useLocalSearchParams();
  const [postsData, setPostsData] = useState(posts);

  // Simulate the search behavior by filtering the mock data

  // const logout = async () => {
  //   await signOut();
  //   setUser(null);
  //   setIsLogged(false);

  //   router.replace("/sign-in");
  // };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              // onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              subtitle="Your username" // Added subtitle
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={(posts.length || 0).toString()} // Convert to string
                subtitle="Posts" // Added subtitle
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers" // Added subtitle
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
