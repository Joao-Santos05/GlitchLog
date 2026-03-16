import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import { Heart } from "lucide-react-native";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "follow",
    user: { name: "Dabliuziar", avatar: "https://i.pravatar.cc/150?img=12" },
    actionText: "started following you!",
    time: "1 minute ago",
  },
  {
    id: "2",
    type: "like",
    user: { name: "Adrian", avatar: "https://i.pravatar.cc/150?img=13" },
    actionText: "liked your review of Kingdom Come: Deliverance II!",
    time: "10 minute ago",
  },
  {
    id: "3",
    type: "update",
    game: { title: "Clair Obscur", cover: "https://i.pravatar.cc/150?img=13" },
    actionText: "A new DLC is available for Clair Obscur: Expedition 33!",
    time: "yesterday",
  },
];

export default function NotificationsScreen() {
  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-28 pb-4 border-b border-[#F2E8FF]/10 z-50">
        <Text className="text-white text-2xl font-bold">Notifications</Text>
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View className="bg-[#2D214F] rounded-xl p-4 mb-4 flex-row items-center border border-[#4A3F75]/50">
            {item.user ? (
              <Image
                source={{ uri: item.user.avatar }}
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : (
              <Image
                source={{ uri: item.game?.cover }}
                className="w-10 h-14 rounded-md mr-4"
              />
            )}
            <View className="flex-1">
              <Text className="text-light-200 text-sm">
                {item.user && (
                  <Text className="font-bold text-white">
                    {item.user.name}{" "}
                  </Text>
                )}
                {item.actionText}
              </Text>
              <View className="flex-row items-center justify-between mt-2">
                <Heart color={"#ff8945"} />
                <Text className="text-[#A499C9] text-xs">{item.time}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
