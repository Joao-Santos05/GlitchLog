import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

interface GoBackProps {
  onPress?: () => void;
}

const GoBack = ({ onPress }: GoBackProps) => {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => router.back()}
      className="w-10 h-10 bg-black/70 rounded-full items-center justify-center"
    >
      <ArrowLeft color="#C8ADFF" size={24} />
    </TouchableOpacity>
  );
};

export default GoBack;
