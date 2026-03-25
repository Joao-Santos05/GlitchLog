import GoBack from "@/components/shared/GoBack";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  ExternalLink,
  Mail,
  MessageCircle,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HelpCenter() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <View
        className="px-6 pb-4 flex-row items-center"
        style={{ paddingTop: insets.top > 0 ? insets.top + 20 : 56 }}
      >
        <GoBack onPress={() => router.navigate("/settings")} />
        <Text className="text-white text-xl font-bold ml-4">Help Center</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <Text className="text-[#A499C9] text-xs font-bold uppercase mb-3 ml-1">
          Contact Us
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 border border-[#4A3F75] mb-8">
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#4A3F75]/50">
            <View className="flex-row items-center">
              <MessageCircle size={20} color="#C8ADFF" />
              <Text className="text-white font-medium text-base ml-3">
                Live Chat Support
              </Text>
            </View>
            <ChevronRight size={20} color="#7D70A3" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center">
              <Mail size={20} color="#C8ADFF" />
              <Text className="text-white font-medium text-base ml-3">
                Email Support
              </Text>
            </View>
            <ChevronRight size={20} color="#7D70A3" />
          </TouchableOpacity>
        </View>

        <Text className="text-[#A499C9] text-xs font-bold uppercase mb-3 ml-1">
          Resources
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 border border-[#4A3F75]">
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#4A3F75]/50">
            <Text className="text-white font-medium text-base">
              Frequently Asked Questions
            </Text>
            <ExternalLink size={18} color="#7D70A3" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#4A3F75]/50">
            <Text className="text-white font-medium text-base">
              Community Guidelines
            </Text>
            <ExternalLink size={18} color="#7D70A3" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-4">
            <Text className="text-white font-medium text-base">
              Report a Bug
            </Text>
            <ExternalLink size={18} color="#7D70A3" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
