import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import StarRating from "@/components/shared/StarRating";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const MOCK_LIKES = [
  {
    id: 1,
    title: "Cyberpunk",
    rating: 4.5,
    poster: "https://placehold.co/300x450",
  },
  {
    id: 2,
    title: "Death Stranding",
    rating: 5,
    poster: "https://placehold.co/300x450",
  },
  {
    id: 3,
    title: "Hytale",
    rating: 4.5,
    poster: "https://placehold.co/300x450",
  },
  {
    id: 4,
    title: "Witcher 3",
    rating: 5,
    poster: "https://placehold.co/300x450",
  },
];

export default function LikesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-28 pb-4 border-b border-[#F2E8FF]/10 z-50">
        <Text className="text-white text-2xl font-bold">Likes</Text>
      </View>

      <FlatList
        data={MOCK_LIKES}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 12,
          marginBottom: 16,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-[22%]"
            onPress={() => router.push(`/games/${item.id}`)}
          >
            <Image
              source={{ uri: item.poster }}
              className="w-full aspect-[2/3] rounded-md border border-[#4A3F75]"
            />
            <View className="flex-row items-center justify-between mt-1.5 px-0.5">
              <StarRating rating={item.rating} size={8} />
              <Heart size={10} color="#FF89A3" fill="#FF89A3" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
