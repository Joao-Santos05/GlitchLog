import GoBack from "@/components/shared/GoBack";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TermsOfService() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <View
        className="px-6 pb-4 flex-row items-center border-b border-dark-300"
        style={{ paddingTop: insets.top > 0 ? insets.top + 20 : 56 }}
      >
        <GoBack onPress={() => router.navigate("/settings")} />
        <Text className="text-white text-xl font-bold ml-4">
          Terms of Service
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <Text className="text-[#ff8945] font-bold text-sm mb-6 uppercase tracking-wider">
          Last Updated: March 2026
        </Text>

        <Text className="text-white font-bold text-lg mb-2">
          1. Acceptance of Terms
        </Text>
        <Text className="text-[#A499C9] text-base leading-6 mb-6">
          By accessing and using GlitchLog, you accept and agree to be bound by
          the terms and provision of this agreement.
        </Text>

        <Text className="text-white font-bold text-lg mb-2">
          2. User Accounts
        </Text>
        <Text className="text-[#A499C9] text-base leading-6 mb-6">
          You are responsible for safeguarding the password that you use to
          access the service and for any activities or actions under your
          password. We cannot and will not be liable for any loss or damage
          arising from your failure to comply with these requirements.
        </Text>

        <Text className="text-white font-bold text-lg mb-2">
          3. Content Guidelines
        </Text>
        <Text className="text-[#A499C9] text-base leading-6 mb-6">
          Our service allows you to post, link, store, share and otherwise make
          available certain information, text, graphics, videos, or other
          material. You are responsible for the content that you post on or
          through the Service, including its legality, reliability, and
          appropriateness.
        </Text>

        <Text className="text-white font-bold text-lg mb-2">
          4. Termination
        </Text>
        <Text className="text-[#A499C9] text-base leading-6 mb-8">
          We may terminate or suspend access to our Service immediately, without
          prior notice or liability, for any reason whatsoever, including
          without limitation if you breach the Terms.
        </Text>

        <Text className="text-[#7D70A3] text-sm text-center italic">
          For full legal documentation, please visit our website.
        </Text>
      </ScrollView>
    </View>
  );
}
