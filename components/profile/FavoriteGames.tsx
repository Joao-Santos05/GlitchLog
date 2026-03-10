import React from "react";
import { Image, Text, View } from "react-native";

interface FavoriteGamesProps {
  games: string[]; // Array de URLs das imagens
}

export default function FavoriteGames({ games }: FavoriteGamesProps) {
  return (
    <View className="mt-8 px-4">
      <Text className="text-white text-lg font-bold mb-4 text-center">
        David Favorite Games
      </Text>
      <View className="flex-row justify-between">
        {games.map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            className="w-[22%] aspect-[2/3] rounded-lg"
          />
        ))}
      </View>
    </View>
  );
}
