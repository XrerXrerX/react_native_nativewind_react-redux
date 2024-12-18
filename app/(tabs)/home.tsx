/** @format */
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
import { images, videos } from "../../constants";
import { EmptyState, SearchInput, Trending, VideoCard } from "../components";

const Home = () => {
  const authUser = useSelector((state: RootState) => state.authUser);

  //reactnative tidak mengizinkan video lokal upload
  const videoslofii = require("../../assets/video/example.mp4"); // Akses file lokal

  const posts = [
    {
      $id: "1",
      title: "lofi video",
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
      title: "video example example",
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
    // {
    //   $id: "3",
    //   title: "Advanced JavaScript Concepts",
    //   thumbnail:
    //     "https://img.freepik.com/premium-photo/space-lion-space-godlike-creature-cosmic-awe-inspiring-dreamy-digital-illustration-generative-ai_742252-14190.jpg",
    //   video: videoslofii,
    //   creator: {
    //     username: "developer_123",
    //     avatar:
    //       "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    //   },
    // },
  ];

  // Mock data untuk latestPosts (Trending)
  const latestPosts = [
    {
      $id: "4",
      title: "Mastering React Navigation",
      thumbnail:
        "https://img.freepik.com/premium-photo/space-lion-space-godlike-creature-cosmic-awe-inspiring-dreamy-digital-illustration-generative-ai_742252-14190.jpg",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      creator: {
        username: "react_master",
        avatar: "https://example.com/avatar4.jpg",
      },
    },
    {
      $id: "5",
      title: "Understanding Asynchronous Programming",
      thumbnail:
        "https://img.freepik.com/premium-photo/space-lion-space-godlike-creature-cosmic-awe-inspiring-dreamy-digital-illustration-generative-ai_742252-14190.jpg",
      video: videoslofii,
      creator: {
        username: "async_guru",
        avatar: "https://example.com/avatar5.jpg",
      },
    },
    {
      $id: "6",
      title: "tesst",
      thumbnail:
        "https://img.freepik.com/premium-photo/space-lion-space-godlike-creature-cosmic-awe-inspiring-dreamy-digital-illustration-generative-ai_742252-14190.jpg",
      video: videoslofii,
      creator: {
        username: "async_guru",
        avatar: "https://example.com/avatar5.jpg",
      },
    },
    {
      $id: "7",
      title: "tesst",
      thumbnail:
        "https://img.freepik.com/premium-photo/space-lion-space-godlike-creature-cosmic-awe-inspiring-dreamy-digital-illustration-generative-ai_742252-14190.jpg",
      video: videoslofii,
      creator: {
        username: "async_guru",
        avatar: "https://example.com/avatar5.jpg",
      },
    },
    {
      $id: "8",
      title: "tesst",
      thumbnail:
        "https://img.freepik.com/premium-photo/space-lion-space-godlike-creature-cosmic-awe-inspiring-dreamy-digital-illustration-generative-ai_742252-14190.jpg",
      video: videoslofii,
      creator: {
        username: "async_guru",
        avatar: "https://example.com/avatar5.jpg",
      },
    },
  ];

  // State untuk refreshing (misalnya dari useState)
  const [refreshing, setRefreshing] = useState(false);

  // Fungsi untuk refresh (misalnya digunakan untuk onRefresh)
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulasi refresh selama 2 detik
  };

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // };
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        initialNumToRender={3} // Render 3 item awal
        windowSize={3} // Kontrol render item di luar layar
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
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        // ListEmptyComponent={() => (
        //   <EmptyState
        //     title="No Videos Found"
        //     // subtitle="No videos created yet"
        //   />
        // )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
