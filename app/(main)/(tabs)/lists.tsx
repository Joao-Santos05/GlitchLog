import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import { useRouter } from "expo-router";
import { Heart, Plus, SearchIcon } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MY_LISTS = [
  {
    id: "1",
    title: "Favorite Games",
    count: 8,
    updated: "2 days ago",
    covers: ["https://placehold.co/100x150", "https://placehold.co/100x150"],
  },
  {
    id: "2",
    title: "Games I played again",
    count: 6,
    updated: "7 days ago",
    covers: ["https://placehold.co/100x150", "https://placehold.co/100x150"],
  },
];

const POPULAR_LISTS = [
  {
    id: "3",
    title: "Top 50 GlitchLog",
    author: "@GlitchLog",
    avatar: "https://i.pravatar.cc/150?img=11",
    likes: 500,
    comments: 79,
    covers: ["https://placehold.co/100x150", "https://placehold.co/100x150"],
  },
  {
    id: "4",
    title: "Best Gameplay",
    author: "@GeraltDeRivia",
    avatar: "https://i.pravatar.cc/150?img=12",
    likes: 458,
    comments: 50,
    covers: ["https://placehold.co/100x150", "https://placehold.co/100x150"],
  },
  {
    id: "5",
    title: "Horror Games",
    author: "@ArthurMorgan",
    avatar: "https://i.pravatar.cc/150?img=13",
    likes: 349,
    comments: 51,
    covers: ["https://placehold.co/100x150", "https://placehold.co/100x150"],
  },
];

export default function ListsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-32 pb-4 flex-row items-center justify-between z-50">
        <Text className="text-white text-2xl font-bold bg-light-400 px-4 py-1.5 rounded-full self-start">
          Lists
        </Text>
        <View className="flex-row items-center bg-[#2D214F] rounded-full px-3 py-1.5 border border-[#4A3F75]">
          <TextInput
            placeholder="search"
            placeholderTextColor="#A499C9"
            className="text-white text-xs w-16"
          />
          <SearchIcon size={12} color="#A499C9" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-white text-lg font-bold mb-4 bg-light-400 px-4 py-1.5 rounded-full">
          My Lists
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-8"
        >
          <TouchableOpacity
            className="mr-4 items-center"
            onPress={() => router.push("/lists/new")}
          >
            <View className="w-24 h-24 bg-[#4A3F75] rounded-xl items-center justify-center border border-[#A499C9]/30 mb-2">
              <Plus size={24} color="#ff8945" />
            </View>
            <Text className="text-[#A499C9] text-xs font-bold">
              Create List
            </Text>
          </TouchableOpacity>

          {MY_LISTS.map((list) => (
            <TouchableOpacity
              key={list.id}
              className="mr-4"
              onPress={() => router.push(`/lists/edit/${list.id}`)}
            >
              <View className="w-24 h-24 rounded-xl mb-2 flex-row overflow-hidden border border-[#4A3F75]">
                <Image
                  source={{ uri: list.covers[0] }}
                  className="flex-1 h-full"
                />
                <Image
                  source={{ uri: list.covers[1] }}
                  className="flex-1 h-full border-l border-[#2D214F]"
                />
              </View>
              <Text
                className="text-white text-xs font-bold w-24"
                numberOfLines={1}
              >
                {list.title}
              </Text>
              <Text className="text-[#A499C9] text-[10px]">
                {list.count} Games
              </Text>
              <Text className="text-[#A499C9] text-[9px]">
                updated {list.updated}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className="text-white text-lg font-bold mb-4 bg-light-400 px-4 py-1.5 rounded-full">
          Popular Lists
        </Text>
        <FlatList
          data={POPULAR_LISTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mr-4"
              onPress={() => router.push(`/lists/${item.id}`)}
            >
              <View className="w-28 h-28 rounded-xl mb-2 flex-row overflow-hidden border border-[#4A3F75]">
                <Image
                  source={{ uri: item.covers[0] }}
                  className="flex-1 h-full"
                />
                <Image
                  source={{ uri: item.covers[1] }}
                  className="flex-1 h-full border-l border-[#2D214F]"
                />
              </View>
              <Text
                className="text-white text-xs font-bold w-28"
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <View className="flex-row items-center mt-1 mb-1">
                <Image
                  source={{ uri: item.avatar }}
                  className="w-4 h-4 rounded-full mr-1"
                />
                <Text className="text-[#A499C9] text-[10px]">
                  {item.author}
                </Text>
              </View>
              <View className="flex-row items-center p-1">
                <Heart color={"red"} fill={"red"} size={8} />
                <Text className="text-red-500 text-[10px] mr-2 px-1">
                  {item.likes}
                </Text>
                <Text className="text-[#A499C9] text-[10px]">
                  💬 {item.comments}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
}
