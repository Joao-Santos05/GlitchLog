import StarRating from "@/components/shared/StarRating";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Edit2,
  Gamepad2,
  MoreVertical,
  Plus,
  Share2,
} from "lucide-react-native";
import React, { useState, useCallback } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GAMES_ADDED = [
  { id: 1, cover: "https://placehold.co/100x150" },
  { id: 2, cover: "https://placehold.co/100x150" },
  { id: 3, cover: "https://placehold.co/100x150" },
  { id: 4, cover: "https://placehold.co/100x150" },
  { id: 5, cover: "https://placehold.co/100x150" },
];

const SUGGESTED_GAMES = [
  { id: 6, title: "Alien", rating: 4.5, cover: "https://placehold.co/100x150" },
  {
    id: 7,
    title: "Detroit",
    rating: 4.0,
    cover: "https://placehold.co/100x150",
  },
  {
    id: 8,
    title: "Dispatch",
    rating: 5.0,
    cover: "https://placehold.co/100x150",
  },
  {
    id: 9,
    title: "Silksong",
    rating: 5.0,
    cover: "https://placehold.co/100x150",
  },
];

export default function ListDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View className="flex-1 bg-background">
      <View
        className="px-6 pb-2"
        style={{ paddingTop: insets.top > 0 ? insets.top + 10 : 40 }}
      >
        <TouchableOpacity onPress={() => router.back()} className="p-1 w-10">
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ff8945"
            colors={["#ff8945"]}
            progressBackgroundColor="#2D214F"
          />
        }
      >
        <View className="flex-row mb-8">
          <View className="w-24 h-24 bg-[#1A133A] rounded-xl items-center justify-center border border-[#4A3F75] mr-4">
            <Gamepad2 size={32} color="#A499C9" />
          </View>

          <View className="flex-1 justify-center">
            <View className="flex-row items-center mb-1.5">
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=11" }}
                className="w-5 h-5 rounded-full mr-2"
              />
              <Text className="text-light-200 text-xs font-bold">David</Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Text className="text-white text-2xl font-bold mr-2">
                My List
              </Text>
              <TouchableOpacity className="bg-[#4A3F75] p-1.5 rounded-md">
                <Edit2 size={12} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="self-start">
              <Text className="text-[#A499C9] text-[11px] font-medium bg-[#2D214F] px-2 py-1 rounded-md border border-[#4A3F75]">
                + Add description
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-8 border-b border-[#F2E8FF]/10 pb-4">
          <View className="flex-row gap-4">
            <TouchableOpacity>
              <Share2 size={20} color="#A499C9" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MoreVertical size={20} color="#A499C9" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-[#4A3F75] flex-row items-center rounded-full px-4 py-1.5">
            <Plus size={16} color="white" className="mr-1" />
            <Text className="text-white text-xs font-bold">Add Game</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white text-base font-bold mb-4">
          Games added:
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-8"
          contentContainerStyle={{ gap: 10 }}
        >
          {GAMES_ADDED.map((game) => (
            <Image
              key={game.id}
              source={{ uri: game.cover }}
              className="w-20 h-28 rounded-md border border-[#4A3F75]"
            />
          ))}
        </ScrollView>

        <Text className="text-white text-base font-bold mb-4">
          Suggested games:
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-8"
          contentContainerStyle={{ gap: 10 }}
        >
          {SUGGESTED_GAMES.map((game) => (
            <TouchableOpacity
              key={game.id}
              className="w-20"
              onPress={() => router.push(`/games/${game.id}`)}
            >
              <Image
                source={{ uri: game.cover }}
                className="w-full h-28 rounded-md border border-[#4A3F75] mb-1"
              />
              <StarRating rating={game.rating} size={8} />
              <Text className="text-[#FF89A3] text-[9px] mt-1">
                Read Review {">"}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="items-center mt-4">
          <TouchableOpacity className="bg-[#4A3F75] rounded-full px-8 py-2">
            <Text className="text-white font-bold">Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
