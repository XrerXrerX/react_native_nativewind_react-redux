/** @format */

import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState, SearchInput, VideoCard } from "../components";

// Mock data
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
];

const Search = () => {
  const { query } = useLocalSearchParams();
  const [postsData, setPostsData] = useState(posts);

  // Simulate the search behavior by filtering the mock data
  // useEffect(() => {
  //   if (query) {

  //     const filteredPosts = posts.filter((post) =>
  //       post.title.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setPostsData(filteredPosts);
  //   } else {
  //     setPostsData(posts);
  //   }
  // }, [query]);

  useEffect(() => {
    if (query) {
      // Ensure query is treated as a string (in case it's an array)
      const searchQuery = Array.isArray(query) ? query.join(" ") : query;

      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPostsData(filteredPosts);
    } else {
      setPostsData(posts);
    }
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={postsData}
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
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
