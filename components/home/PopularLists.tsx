import { useRouter } from "expo-router";
import { Heart, MessageCircle } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { List } from "../../types";

interface Props {
  lists: List[];
}

export default function PopularLists({ lists }: Props) {
  const router = useRouter();

  return (
    <View className="mt-8">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        {lists.map((list) => (
          <TouchableOpacity
            key={list.id}
            className="w-36 mr-4"
            onPress={() => router.push(`/lists/${list.id}`)}
          >
            <View className="flex-row h-36 w-36 mb-3 rounded-2xl border border-[#4A3F75] overflow-hidden">
              <Image
                source={{ uri: list.coverUrls[0] }}
                className="flex-1 h-full"
              />
              <View className="flex-1 h-full flex-col border-l border-[#4A3F75]">
                <Image
                  source={{ uri: list.coverUrls[1] }}
                  className="flex-1 w-full border-b border-[#4A3F75]"
                />
                <Image
                  source={{ uri: list.coverUrls[2] }}
                  className="flex-1 w-full"
                />
              </View>
            </View>

            <Text
              className="text-white text-base font-bold mb-3"
              numberOfLines={1}
            >
              {list.title}
            </Text>

            <View className="flex-row items-center mb-4">
              <Image
                source={{ uri: list.creator.avatarUrl }}
                className="w-6 h-6 rounded-full mr-2.5"
              />
              <View className="bg-light-400 px-3 py-1 rounded-full flex-shrink">
                <Text
                  className="text-white text-xs font-medium"
                  numberOfLines={1}
                >
                  {list.creator.name}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between pr-2">
              <View className="flex-row items-center gap-1.5">
                <MessageCircle size={14} color="#A499C9" />
                <Text className="text-[#A499C9] text-[11px] font-medium">
                  {list.comments}
                </Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Heart size={14} color="red" fill="red" />
                <Text className="text-[red] text-[11px] font-medium">
                  {list.likes}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
