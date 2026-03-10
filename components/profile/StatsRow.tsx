import React from "react";
import { View, Text } from "react-native";

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
        <View key={index} className="items-center">
          <Text className="text-white text-3xl font-bold mb-1">
            {stat.value}
          </Text>
          <Text className="text-gray-400 text-xs">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}
