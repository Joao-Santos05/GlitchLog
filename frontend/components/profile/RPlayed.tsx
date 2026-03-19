import { Game } from "@/interfaces/interfaces";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import StarRating from "../shared/StarRating";

interface RPlayedProps {
  games: Game[];
}

export default function RPlayed({ games }: RPlayedProps) {
  const router = useRouter();

  return (
    <View className="mt-6 pl-4">
      <View className="flex-row justify-between items-center pr-4 mb-4">
        <Text className="text-white text-base font-bold bg-light-400 px-4 py-1.5 rounded-full">
          Recently Played
        </Text>
        <TouchableOpacity>
          <Text className="text-white text-xs font-bold bg-light-400 px-4 py-1.5 rounded-full">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="gap-4"
        >
          {games.map((game) => (
            <View key={game.id} className="w-24 mr-3">
              <TouchableOpacity
                onPress={() => router.push(`/games/${game.id}`)}
              >
                <Image
                  source={{
                    uri:
                      game.poster_path ||
                      "https://placehold.co/600x400/1a1a1a/ffffff.png",
                  }}
                  className="w-full aspect-[2/3] rounded-md mb-2 border border-light-200"
                />
              </TouchableOpacity>

              <View className="flex-row mt-1">
                <StarRating rating={game.vote_average || 0} size={10} />
              </View>

              <TouchableOpacity>
                <Text className="text-[#C8ADFF] text-[10px]">
                  Read Review &gt;
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </TouchableOpacity>
    </View>
  );
}
