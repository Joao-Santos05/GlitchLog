import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import StarRating from "@/components/shared/StarRating";
import { useRouter } from "expo-router";
import { MessageSquare } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MOCK_REVIEWS = [
  {
    id: "1",
    user: { name: "Paul", avatar: "https://i.pravatar.cc/150?img=11" },
    game: {
      title: "Resident Evil Requiem",
      year: "2026",
      cover: "https://placehold.co/100x150",
    },
    rating: 4.5,
    comments: 10,
    text: "A tragic tale of a lost and distressed fish hunted down by an aquaphobic police chief, a disgraced oceanographer trying to regain some of his tarnished reputation...",
  },
];

const MOCK_POPULAR = [
  {
    id: "2",
    user: { name: "Robert", avatar: "https://i.pravatar.cc/150?img=12" },
    game: {
      title: "Hytale",
      year: "2026",
      cover: "https://placehold.co/100x150",
    },
    rating: 4.5,
    comments: 10,
    text: "Hytale has just released, and after spending my first few hours in the game, I can confidently say I have been having a great time! Simon Hypixel openly warned...",
  },
  {
    id: "3",
    user: { name: "Anna", avatar: "https://i.pravatar.cc/150?img=5" },
    game: {
      title: "Pokémon Pokopia",
      year: "2026",
      cover: "https://placehold.co/100x150",
    },
    rating: 4.0,
    comments: 10,
    text: "Pokémon Pokopia is an absolute breath of fresh air for the franchise, blending classic monster-collecting mechanics with a vibrant, lived-in world...",
  },
];

export default function ReviewsTab() {
  const router = useRouter();

  const renderReviewCard = (review: any) => (
    <TouchableOpacity
      key={review.id}
      className="bg-[#2D214F] rounded-xl p-4 mb-4 flex-row border border-[#4A3F75]/50"
      onPress={() => router.push(`/reviews/${review.id}`)}
    >
      <View className="flex-1 mr-3">
        <View className="flex-row items-center mb-2">
          <Image
            source={{ uri: review.user.avatar }}
            className="w-8 h-8 rounded-full mr-2"
          />
          <View>
            <Text className="text-white font-bold text-sm leading-tight">
              {review.game.title}{" "}
              <Text className="text-[#A499C9] text-xs font-normal">
                {review.game.year}
              </Text>
            </Text>
            <View className="flex-row items-center">
              <Text className="text-[#A499C9] text-[10px] mr-1">
                Review by {review.user.name}
              </Text>
              <StarRating rating={review.rating} size={8} />
              <MessageSquare
                size={10}
                color="#A499C9"
                className="ml-2 mr-0.5"
              />
              <Text className="text-[#A499C9] text-[10px]">
                {review.comments}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-light-200 text-xs leading-4" numberOfLines={5}>
          {review.text}
        </Text>
      </View>
      <Image
        source={{ uri: review.game.cover }}
        className="w-16 h-24 rounded-md border border-[#4A3F75]"
      />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-28 pb-4 z-50">
        <Text className="text-white text-3xl font-bold">Reviews</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-white text-xl font-bold mb-4">
          New from friends
        </Text>
        {MOCK_REVIEWS.map(renderReviewCard)}

        <Text className="text-white text-xl font-bold mb-4 mt-2">
          Popular this week
        </Text>
        {MOCK_POPULAR.map(renderReviewCard)}
      </ScrollView>

      {/* Botão Flutuante Criar Review (Bônus pra ficar igual app de verdade!) */}
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
