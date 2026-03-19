import { Heart } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";

export interface NotificationData {
  id: string;
  type: string;
  user?: { name: string; avatar: string };
  game?: { title: string; cover: string };
  actionText: string;
  time: string;
}

interface Props {
  notification: NotificationData;
}

export default function NotificationCard({ notification }: Props) {
  return (
    <View className="bg-dark-500 rounded-xl p-4 mb-4 flex-row items-center border border-[#4A3F75]/50">
      {notification.user ? (
        <Image
          source={{ uri: notification.user.avatar }}
          className="w-12 h-12 rounded-full mr-4"
        />
      ) : (
        <Image
          source={{ uri: notification.game?.cover }}
          className="w-10 h-14 rounded-md mr-4"
        />
      )}
      <View className="flex-1">
        <Text className="text-light-200 text-sm">
          {notification.user && (
            <Text className="font-bold text-white">
              {notification.user.name}{" "}
            </Text>
          )}
          {notification.actionText}
        </Text>
        <View className="flex-row items-center justify-between p-1 mt-2">
          <Heart color={"red"} fill={"red"} size={16} />
          <Text className="text-[#A499C9] text-xs">{notification.time}</Text>
        </View>
      </View>
    </View>
  );
}
