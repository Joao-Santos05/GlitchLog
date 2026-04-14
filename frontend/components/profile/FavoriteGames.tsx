import StarRating from "@/components/shared/StarRating";
import { Game } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface FavoriteGamesProps {
  games: Game[];
}

export default function FavoriteGames({ games }: FavoriteGamesProps) {
  const router = useRouter();

  return (
    <View className="mt-8 px-4">
      <Text className="text-white text-lg font-bold mb-4 text-center bg-light-400 px-4 py-1.5 rounded-full">
        Favorite Games
      </Text>

      <View className="flex-row justify-between">
        {games.map((game) => (
          <TouchableOpacity
            key={game.id}
            className="w-[22%]"
            onPress={() => router.push(`/games/${game.id}`)}
          >
            <Image
              source={{
                uri:
                  game.poster_path ||
                  "https://placehold.co/600x400/1a1a1a/ffffff.png",
              }}
              className="w-full aspect-[2/3] rounded-md border border-light-200"
            />

            <View className="flex-row justify-center mt-1.5">
              <StarRating rating={game.vote_average || 0} size={10} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
