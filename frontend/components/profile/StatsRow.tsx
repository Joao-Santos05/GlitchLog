import React from "react";
import { Text, View } from "react-native";

interface Stat {
  label: string;
  value: string | number;
}

interface StatsRowProps {
  stats: Stat[];
}

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <View className="flex-row justify-between px-6 mt-8">
      {stats.map((stat, index) => (
        <View key={index} className="items-center flex-1">
          <View className="w-16 h-16 bg-[#C8ADFF] rounded-full items-center justify-center mb-2">
            <Text className="text-[#2C225A] text-xl font-medium">
              {stat.value}
            </Text>
          </View>

          <Text className="text-gray-400 text-xs text-center">
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
