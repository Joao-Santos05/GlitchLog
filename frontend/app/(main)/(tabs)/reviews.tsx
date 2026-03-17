import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import ReviewCard from "@/components/shared/ReviewCard";
import { Review } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    game: {
      id: "5",
      title: "Kingdom Come",
      coverUrl: "https://via.placeholder.com/150x200",
      year: "2025",
    },
    reviewer: { name: "Adrian", avatarUrl: "https://i.pravatar.cc/150?img=3" },
    stars: 4,
    likes: 0,
    comments: 8,
    content:
      "Playing through this absolute gem of a game reminded me of when in 2011 i took up skyrim...",
  },
];

const MOCK_POPULAR = [
  {
    id: "2",
    reviewer: { name: "Robert", avatarUrl: "https://i.pravatar.cc/150?img=12" },
    game: {
      id: "6",
      title: "Hytale",
      year: "2026",
      coverUrl: "https://placehold.co/100x150",
    },
    stars: 4.5,
    comments: 10,
    content:
      "Hytale has just released, and after spending my first few hours in the game, I can confidently say I have been having a great time! Simon Hypixel openly warned...",
    likes: 4,
  },
  {
    id: "3",
    reviewer: { name: "Anna", avatarUrl: "https://i.pravatar.cc/150?img=5" },
    game: {
      id: "7",
      title: "Pokémon Pokopia",
      year: "2026",
      coverUrl: "https://placehold.co/100x150",
    },
    stars: 4.0,
    comments: 10,
    content:
      "Pokémon Pokopia is an absolute breath of fresh air for the franchise, blending classic monster-collecting mechanics with a vibrant, lived-in world...",
    likes: 8,
  },
];

export default function ReviewsTab() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-32 pb-4 z-50">
        <Text className="text-white text-3xl font-bold bg-light-400 px-4 py-1.5 rounded-full self-start">
          Reviews
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-white text-xl font-bold mb-4 bg-light-400 px-4 py-1.5 rounded-full">
          New from friends
        </Text>
        {MOCK_REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        <Text className="text-white text-xl font-bold mb-4 mt-2 bg-light-400 px-4 py-1.5 rounded-full">
          Popular this week
        </Text>
        {MOCK_POPULAR.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-32 right-6 bg-[#B8AAFF] w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push("/reviews/new")}
        style={{ elevation: 5 }}
      >
        <Text className="text-[#2C225A] text-3xl font-bold pb-1">+</Text>
      </TouchableOpacity>
    </View>
  );
}
