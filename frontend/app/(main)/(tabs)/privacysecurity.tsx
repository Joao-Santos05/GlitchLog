import GoBack from "@/components/shared/GoBack";
import { useRouter } from "expo-router";
import { Eye, Key, Shield } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PrivacySecurity() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isPrivate, setIsPrivate] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <View className="flex-1 bg-background">
      <View
        className="px-6 pb-4 flex-row items-center"
        style={{ paddingTop: insets.top > 0 ? insets.top + 20 : 56 }}
      >
        <GoBack onPress={() => router.navigate("/settings")} />
        <Text className="text-white text-xl font-bold ml-4">
          Privacy & Security
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <Text className="text-[#A499C9] text-xs font-bold uppercase mb-3 ml-1">
          Visibility
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 py-2 border border-[#4A3F75] mb-8">
          <View className="flex-row items-center justify-between py-3 border-b border-[#4A3F75]/50">
            <View className="flex-row items-center flex-1 pr-4">
              <Eye size={20} color="#C8ADFF" />
              <View className="ml-3">
                <Text className="text-white font-medium text-base">
                  Private Account
                </Text>
                <Text className="text-[#7D70A3] text-xs mt-0.5">
                  Only approved followers can see your lists and reviews.
                </Text>
              </View>
            </View>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: "#4A3F75", true: "#ff8945" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center flex-1 pr-4">
              <Shield size={20} color="#C8ADFF" />
              <View className="ml-3">
                <Text className="text-white font-medium text-base">
                  Show Activity
                </Text>
                <Text className="text-[#7D70A3] text-xs mt-0.5">
                  Let others see when you are online or playing.
                </Text>
              </View>
            </View>
            <Switch
              value={showActivity}
              onValueChange={setShowActivity}
              trackColor={{ false: "#4A3F75", true: "#ff8945" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text className="text-[#A499C9] text-xs font-bold uppercase mb-3 ml-1">
          Security
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 py-2 border border-[#4A3F75]">
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#4A3F75]/50">
            <View className="flex-row items-center">
              <Key size={20} color="#C8ADFF" />
              <Text className="text-white font-medium text-base ml-3">
                Change Password
              </Text>
            </View>
          </TouchableOpacity>
          <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center flex-1 pr-4">
              <Shield size={20} color="#C8ADFF" />
              <View className="ml-3">
                <Text className="text-white font-medium text-base">
                  Two-Factor Authentication
                </Text>
                <Text className="text-[#7D70A3] text-xs mt-0.5">
                  Protect your account with an extra layer of security.
                </Text>
              </View>
            </View>
            <Switch
              value={twoFactor}
              onValueChange={setTwoFactor}
              trackColor={{ false: "#4A3F75", true: "#ff8945" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
