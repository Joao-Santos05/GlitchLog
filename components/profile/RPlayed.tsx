import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Game {
  id: string;
  title: string;
  imageUrl: string;
  stars: number;
}

interface RPlayedProps {
  games: Game[];
}

export default function RPlayed({ games }: RPlayedProps) {
  return (
    <View className="mt-6 pl-4">
      <View className="flex-row justify-between items-center pr-4 mb-4">
        <Text className="text-white text-base font-bold">
          David Recent Played
        </Text>
        <TouchableOpacity>
          <Text className="text-gray-400 text-xs">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="gap-4"
      >
        {games.map((game) => (
          <View key={game.id} className="w-24 mr-3">
            <Image
              source={{ uri: game.imageUrl }}
              className="w-full aspect-[2/3] rounded-lg mb-2"
            />
            {/* Mock simples de estrelas */}
            <View className="flex-row mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={10}
                  color={i <= game.stars ? "#FFD700" : "#4A5568"}
                />
              ))}
            </View>
            <TouchableOpacity>
              <Text className="text-purple-400 text-[10px]">
                Read Review &gt;
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
