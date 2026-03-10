import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function RecentReviewCard() {
  return (
    <View className="mt-8 px-4 pb-12">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-base font-bold">
          David Recent Reviewed
        </Text>
        <TouchableOpacity>
          <Text className="text-gray-400 text-xs">See All</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-[#2B2844] rounded-xl p-4 flex-row">
        <View className="flex-1 pr-4">
          <View className="flex-row items-center mb-2">
            <Image
              source={{ uri: "https://via.placeholder.com/30" }}
              className="w-6 h-6 rounded-full mr-2"
            />
            <View>
              <Text className="text-white text-xs font-bold">
                Resident Evil Requiem{" "}
                <Text className="text-gray-400 font-normal">2026</Text>
              </Text>
              <View className="flex-row items-center mt-0.5">
                <Text className="text-yellow-400 text-[10px] bg-yellow-400/20 px-1 rounded mr-1">
                  Review by Kyran
                </Text>
                <Ionicons name="star" size={10} color="#FFD700" />
              </View>
            </View>
          </View>
          <Text
            className="text-gray-300 text-[10px] leading-4"
            numberOfLines={4}
          >
            A tragic tale of a lost and distressed fish hunted down by an
            aquaphobic police chief...
          </Text>
        </View>
        <Image
          source={{ uri: "https://via.placeholder.com/60x90/4A5568/FFFFFF" }}
          className="w-16 h-24 rounded-md"
        />
      </View>
    </View>
  );
}
