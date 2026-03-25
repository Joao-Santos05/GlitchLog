import GoBack from "@/components/shared/GoBack";
import { useRouter } from "expo-router";
import { Camera } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ManageAccount() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState("Dabliuziar");
  const [email, setEmail] = useState("dabliuziar@glitchlog.com");

  return (
    <View className="flex-1 bg-background">
      <View
        className="px-6 pb-4 flex-row items-center"
        style={{ paddingTop: insets.top > 0 ? insets.top + 20 : 56 }}
      >
        <GoBack onPress={() => router.navigate("/settings")} />
        <Text className="text-white text-xl font-bold ml-4">
          Manage Account
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=8" }}
              className="w-24 h-24 rounded-full border-2 border-[#C8ADFF]"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-[#ff8945] w-8 h-8 rounded-full items-center justify-center border-2 border-background">
              <Camera size={14} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-[#A499C9] text-xs font-bold uppercase mb-2 ml-1">
            Username
          </Text>
          <TextInput
            className="bg-[#1A133A] text-white px-4 py-3.5 rounded-xl border border-[#4A3F75]"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#7D70A3"
          />
        </View>

        <View className="mb-8">
          <Text className="text-[#A499C9] text-xs font-bold uppercase mb-2 ml-1">
            Email Address
          </Text>
          <TextInput
            className="bg-[#1A133A] text-white px-4 py-3.5 rounded-xl border border-[#4A3F75]"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#7D70A3"
          />
        </View>

        <TouchableOpacity className="bg-[#ff8945] py-4 rounded-xl items-center shadow-lg shadow-orange-500/20">
          <Text className="text-white font-bold text-base">Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
