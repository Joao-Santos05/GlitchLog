import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import StarRating from "@/components/shared/StarRating";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function DiaryScreen() {
  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-28 pb-4 z-50">
        <Text className="text-white text-2xl font-bold">Diary</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* MOCK DO CALENDÁRIO */}
        <View className="mb-8">
          <View className="flex-row justify-between mb-4 px-2">
            <Text className="text-white font-bold">August 2025 ▾</Text>
            <Text className="text-white">{"<   >"}</Text>
          </View>
          <View className="flex-row justify-between px-2 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <Text
                key={i}
                className="text-[#A499C9] font-bold w-8 text-center"
              >
                {d}
              </Text>
            ))}
          </View>
          {/* Apenas uma linha de exemplo pra ilustrar */}
          <View className="flex-row justify-between px-2 mt-2 items-center">
            {["13", "14", "15", "16"].map((d) => (
              <Text key={d} className="text-white w-8 text-center">
                {d}
              </Text>
            ))}
            <View className="bg-[#FF89A3] w-8 h-8 rounded-full items-center justify-center">
              <Text className="text-[#2C225A] font-bold">17</Text>
            </View>
            {["18", "19"].map((d) => (
              <Text key={d} className="text-white w-8 text-center">
                {d}
              </Text>
            ))}
          </View>
        </View>

        {/* ATIVIDADES DO DIA */}
        <Text className="text-white font-bold text-lg mb-4">
          17 August 2025
        </Text>

        <View className="bg-[#2D214F] rounded-xl p-3 mb-4 flex-row items-center border border-[#4A3F75]">
          <Image
            source={{ uri: "https://placehold.co/100x150" }}
            className="w-12 h-16 rounded-md mr-4"
          />
          <View>
            <Text className="text-light-200 text-sm">
              You posted a review for
            </Text>
            <Text className="text-white font-bold mb-1">
              The Witcher 3: Wild Hunt!
            </Text>
            <View className="flex-row items-center gap-2">
              <StarRating rating={4.5} size={12} />
              <View className="w-3 h-3 bg-[#FF89A3] rounded-full" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
