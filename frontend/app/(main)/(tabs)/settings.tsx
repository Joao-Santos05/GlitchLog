import SettingsRow from "@/components/settings/Item";
import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import { useRouter } from "expo-router";
import {
  Bell,
  FileText,
  Globe,
  HelpCircle,
  Lock,
  Trash2,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-32 pb-4 z-50">
        <Text className="text-white text-3xl font-bold bg-light-400 px-4 py-1.5 rounded-full self-start">
          Settings
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[#A499C9] font-bold text-xs uppercase tracking-wider mb-2 mt-4 px-2">
          Account
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 border border-[#4A3F75]">
          <SettingsRow
            icon={User}
            label="Manage Account"
            onPress={() => router.push("/manageaccount")}
          />
          <SettingsRow
            icon={Lock}
            label="Privacy & Security"
            onPress={() => router.push("/privacysecurity")}
          />
        </View>

        <Text className="text-[#A499C9] font-bold text-xs uppercase tracking-wider mb-2 mt-8 px-2">
          Preferences
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 border border-[#4A3F75]">
          <SettingsRow
            icon={Bell}
            label="Push Notifications"
            type="switch"
            value={pushEnabled}
            onToggle={setPushEnabled}
          />
          <SettingsRow
            icon={Globe}
            label="Language"
            onPress={() => router.push("/language")}
          />
        </View>

        <Text className="text-[#A499C9] font-bold text-xs uppercase tracking-wider mb-2 mt-8 px-2">
          Support & About
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 border border-[#4A3F75]">
          <SettingsRow
            icon={HelpCircle}
            label="Help Center"
            onPress={() => router.push("/helpcenter")}
          />
          <SettingsRow
            icon={FileText}
            label="Terms of Service"
            onPress={() => router.push("/tos")}
          />
        </View>

        <Text className="text-red-400/80 font-bold text-xs uppercase tracking-wider mb-2 mt-8 px-2">
          Danger Zone
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 border border-red-500/30">
          <SettingsRow
            icon={Trash2}
            label="Delete Account"
            isDestructive={true}
            onPress={() => console.log("Abre modal de confirmação de exclusão")}
          />
        </View>

        <Text className="text-[#7D70A3] text-center text-xs mt-10">
          GlitchLog v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}
