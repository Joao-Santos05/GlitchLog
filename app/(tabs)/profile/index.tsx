import FavoriteGames from "@/components/profile/FavoriteGames";
import ProfileHeader from "@/components/profile/ProfileHeader";
import RPlayed from "@/components/profile/RPlayed";
import StatsRow from "@/components/profile/StatsRow";
import ReviewCard from "@/components/shared/ReviewCard";
import { Review } from "@/types";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Menu } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const statsMock = [
  { label: "Total Games", value: "45" },
  { label: "Games This Year", value: "12" },
  { label: "Lists", value: "4" },
  { label: "Review", value: "25" },
];

const favoritesMock = [
  "https://via.placeholder.com/100x140/FFD700/000000?text=Cyberpunk",
  "https://via.placeholder.com/100x140/4A5568/FFFFFF?text=Hogwarts",
  "https://via.placeholder.com/100x140/718096/FFFFFF?text=Witcher",
  "https://via.placeholder.com/100x140/3182CE/FFFFFF?text=Zelda",
];

const recentGamesMock = [
  {
    id: "1",
    title: "Alien",
    imageUrl: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    stars: 4,
  },
  {
    id: "2",
    title: "Detroit",
    imageUrl: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    stars: 5,
  },
  {
    id: "3",
    title: "Dispatch",
    imageUrl: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    stars: 4,
  },
  {
    id: "4",
    title: "Silksong",
    imageUrl: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    stars: 5,
  },
];

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

export default function ProfileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{
          position: "absolute",
          top: insets.top > 0 ? insets.top + 10 : 40,
          left: 20,
          zIndex: 50,
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: 8,
          borderRadius: 100,
        }}
      >
        <Menu color="white" size={24} />
      </TouchableOpacity>

      <ScrollView className="flex-1">
        <ProfileHeader />
        <StatsRow stats={statsMock} />
        <FavoriteGames games={favoritesMock} />

        <View className="h-[1px] bg-gray-600 w-full mt-6 opacity-30" />

        <RPlayed games={recentGamesMock} />
        <View className="mt-8 px-6 pb-24">
          <Text className="text-white text-lg font-bold mb-4">
            Recent Friends Review
          </Text>
          {MOCK_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
