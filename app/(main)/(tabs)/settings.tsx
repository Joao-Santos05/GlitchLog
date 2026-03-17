import SettingsRow from "@/components/settings/Item";
import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
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
  // Estados mockados para os switches
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
        {/* SEÇÃO: CONTA */}
        <Text className="text-[#A499C9] font-bold text-xs uppercase tracking-wider mb-2 mt-4 px-2">
          Account
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 border border-[#4A3F75]">
          <SettingsRow icon={User} label="Manage Account" />
          <SettingsRow icon={Lock} label="Privacy & Security" />
        </View>

        {/* SEÇÃO: PREFERÊNCIAS */}
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
          <SettingsRow icon={Globe} label="Language" />
        </View>

        {/* SEÇÃO: SUPORTE & SOBRE */}
        <Text className="text-[#A499C9] font-bold text-xs uppercase tracking-wider mb-2 mt-8 px-2">
          Support & About
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 border border-[#4A3F75]">
          <SettingsRow icon={HelpCircle} label="Help Center" />
          <SettingsRow icon={FileText} label="Terms of Service" />
        </View>

        {/* SEÇÃO: ZONA DE PERIGO */}
        <Text className="text-red-400/80 font-bold text-xs uppercase tracking-wider mb-2 mt-8 px-2">
          Danger Zone
        </Text>
        <View className="bg-[#2D214F] rounded-2xl px-4 border border-red-500/30">
          <SettingsRow
            icon={Trash2}
            label="Delete Account"
            isDestructive={true}
          />
        </View>

        {/* Versão do App */}
        <Text className="text-[#7D70A3] text-center text-xs mt-10">
          GlitchLog v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}
