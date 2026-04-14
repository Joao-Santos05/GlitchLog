import StarRating from "@/components/shared/StarRating";
import { Game } from "@/types";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const GameCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Game) => {
  return (
    <Link href={`/games/${id}`} asChild>
      <TouchableOpacity className="flex-1 max-w-[30%]">
        <Image
          source={{
            uri:
              poster_path || `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-36 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row mt-1">
          <StarRating rating={vote_average || 0} size={10} />
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-[#A499C9] font-medium mt-1">
            {release_date?.split("-")[0] || "N/A"}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default GameCard;
