import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

interface SettingsRowProps {
  icon: any;
  label: string;
  type?: "link" | "switch";
  value?: boolean;
  onToggle?: (value: boolean) => void;
  isDestructive?: boolean;
  onPress?: () => void;
}

export default function SettingsRow({
  icon: Icon,
  label,
  type = "link",
  value,
  onToggle,
  isDestructive = false,
  onPress,
}: SettingsRowProps) {
  return (
    <TouchableOpacity
      // 3. Tirei o isDestructive do disabled, para podermos clicar no "Delete Account" depois!
      disabled={type === "switch"}
      onPress={onPress} // 4. Passamos a função para o botão
      className="flex-row items-center justify-between py-4 border-b border-[#4A3F75]/50"
    >
      <View className="flex-row items-center">
        <View
          className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
            isDestructive ? "bg-red-500/20" : "bg-[#4A3F75]/50"
          }`}
        >
          <Icon size={18} color={isDestructive ? "#ef4444" : "#A499C9"} />
        </View>
        <Text
          className={`text-base font-medium ${
            isDestructive ? "text-red-500" : "text-light-200"
          }`}
        >
          {label}
        </Text>
      </View>

      {type === "link" && !isDestructive && (
        <ChevronRight size={20} color="#7D70A3" />
      )}
      {type === "switch" && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: "#4A3F75", true: "#ff8945" }}
          thumbColor={"#FFFFFF"}
        />
      )}
    </TouchableOpacity>
  );
}
