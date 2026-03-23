import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import NotificationCard, {
  NotificationData,
} from "@/components/shared/NotificationCard";
import React, { useState, useCallback } from "react";
import { FlatList, Text, View, RefreshControl } from "react-native";

const MOCK_NOTIFICATIONS: NotificationData[] = [
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
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);
  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-32 pb-4 border-b border-[#F2E8FF]/10 z-50">
        <Text className="text-white text-2xl font-bold bg-light-400 px-4 py-1.5 rounded-full self-start">
          Notifications
        </Text>
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ff8945"
            colors={["#ff8945"]}
            progressBackgroundColor="#2D214F"
          />
        }
        renderItem={({ item }) => <NotificationCard notification={item} />}
      />
    </View>
  );
}
