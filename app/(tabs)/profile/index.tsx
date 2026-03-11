import FavoriteGames from "@/components/profile/FavoriteGames";
import ProfileHeader from "@/components/profile/ProfileHeader";
import RPlayed from "@/components/profile/RPlayed";
import RecentReviewCard from "@/components/profile/RecentReviewCard";
import StatsRow from "@/components/profile/StatsRow";
import React from "react";
import { ScrollView, View } from "react-native";

// Dados Mockados para simular a API no futuro
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

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <ProfileHeader />
      <StatsRow stats={statsMock} />
      <FavoriteGames games={favoritesMock} />

      <View className="h-[1px] bg-gray-600 w-full mt-6 opacity-30" />

      <RPlayed games={recentGamesMock} />
      <RecentReviewCard />
    </ScrollView>
  );
}
