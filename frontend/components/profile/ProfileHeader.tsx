import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

interface ProfileHeaderProps {
  scrollY: Animated.Value;
  user?: any;
}

export default function ProfileHeader({ scrollY, user }: ProfileHeaderProps) {
  const router = useRouter();

  const userId = user?.id || "me";
  const userName = user?.name || "David";

  return (
    <View className="relative overflow-visible">
      <Animated.Image
        source={require("@/assets/images/BannerLogin.png")}
        className="w-full h-48"
        style={{
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-192, 0],
                outputRange: [-96, 0],
                extrapolateRight: "clamp",
              }),
            },
            {
              scale: scrollY.interpolate({
                inputRange: [-192, 0],
                outputRange: [2, 1],
                extrapolateRight: "clamp",
              }),
            },
          ],
        }}
      />

      <View className="items-center -mt-14 z-10">
        <View className="relative">
          <Image
            source={{
              uri: user?.avatarUrl || "https://i.pravatar.cc/150?img=11",
            }}
            className="w-28 h-28 rounded-full border-4 border-[#23213D]"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-indigo-600 p-1.5 rounded-full">
            <Ionicons name="pencil" size={14} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mt-2">
          <Text className="text-white text-2xl font-bold">{userName}</Text>
        </View>

        <View className="flex-row gap-4 mt-3">
          <TouchableOpacity
            className="bg-light-400 px-4 py-1.5 rounded-full"
            onPress={() =>
              router.push({
                pathname: `/profile/${userId}/network` as any,
                params: { tab: "followers", name: userName },
              })
            }
          >
            <Text className="text-white text-sm font-semibold">
              500 Followers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-light-400 px-4 py-1.5 rounded-full"
            onPress={() =>
              router.push({
                pathname: `/profile/${userId}/network` as any,
                params: { tab: "following", name: userName },
              })
            }
          >
            <Text className="text-white text-sm font-semibold">
              420 Followings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
