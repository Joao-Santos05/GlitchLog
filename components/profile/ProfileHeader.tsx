import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProfileHeader() {
  return (
    <View className="relative">
      <Image
        source={{
          uri: "https://via.placeholder.com/600x200/8B4513/FFFFFF?text=Cover+Image",
        }}
        className="w-full h-48"
      />
      <View className="items-center -mt-14">
        <View className="relative">
          <Image
            source={{
              uri: "https://via.placeholder.com/100/333333/FFFFFF?text=Avatar",
            }}
            className="w-28 h-28 rounded-full border-4 border-[#23213D]"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-indigo-600 p-1.5 rounded-full">
            <Ionicons name="pencil" size={14} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mt-2">
          <Text className="text-white text-2xl font-bold">David</Text>
        </View>

        <View className="flex-row gap-6 mt-2">
          <Text className="text-gray-300 border-b border-gray-300">
            500 Followers
          </Text>
          <Text className="text-gray-300 border-b border-gray-300">
            420 Followings
          </Text>
        </View>
      </View>
    </View>
  );
}
