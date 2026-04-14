import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MOCK_DATA: any = {
  followers: [
    {
      id: "101",
      name: "Sarah Connor",
      handle: "@sarah_c",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "102",
      name: "John Wick",
      handle: "@baba_yaga",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
  ],
  following: [
    {
      id: "201",
      name: "Hideo Kojima",
      handle: "@hideo_k",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
  ],
};

export default function NetworkScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tab, name } = useLocalSearchParams();
  const initialTab = tab === "following" ? "following" : "followers";
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    initialTab,
  );

  const currentList = MOCK_DATA[activeTab] || [];

  return (
    <View className="flex-1 bg-background">
      <View
        className="flex-row items-center justify-between px-5 pb-4 border-b border-dark-300 bg-background z-20"
        style={{ paddingTop: Math.max(insets.top, 20) + 16 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center bg-light-400 rounded-full"
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-white text-lg font-bold">{name || "User"}</Text>
          <Text className="text-gray-400 text-xs">Network</Text>
        </View>

        <View className="w-10 h-10" />
      </View>

      <View className="flex-row border-b border-dark-300">
        <TouchableOpacity
          className={`flex-1 py-4 items-center ${activeTab === "followers" ? "border-b-2 border-[#C8ADFF]" : ""}`}
          onPress={() => setActiveTab("followers")}
        >
          <Text
            className={`font-bold ${activeTab === "followers" ? "text-[#C8ADFF]" : "text-gray-500"}`}
          >
            Followers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-4 items-center ${activeTab === "following" ? "border-b-2 border-[#C8ADFF]" : ""}`}
          onPress={() => setActiveTab("following")}
        >
          <Text
            className={`font-bold ${activeTab === "following" ? "text-[#C8ADFF]" : "text-gray-500"}`}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 pt-4 px-5">
        {currentList.map((user: any) => (
          <TouchableOpacity
            key={user.id}
            className="flex-row items-center justify-between mb-4 bg-light-400 p-3 rounded-xl border border-dark-300"
            onPress={() => router.push(`/profile/${user.id}`)}
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: user.avatar }}
                className="w-12 h-12 rounded-full border border-[#4A3F75]"
              />
              <View className="ml-3">
                <Text className="text-white font-bold text-sm">
                  {user.name}
                </Text>
                <Text className="text-gray-400 text-xs">{user.handle}</Text>
              </View>
            </View>

            <TouchableOpacity
              className={`px-4 py-1.5 rounded-full ${activeTab === "following" ? "bg-[#1A133A] border border-[#4A3F75]" : "bg-indigo-600"}`}
            >
              <Text
                className={`text-xs font-bold ${activeTab === "following" ? "text-[#C8ADFF]" : "text-white"}`}
              >
                {activeTab === "following" ? "Following" : "Follow Back"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
