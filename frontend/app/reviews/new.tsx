import StarRating from "@/components/shared/StarRating";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Heart,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewReviewScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviewText, setReviewText] = useState("");

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        className="flex-row items-center px-6 pb-4"
        style={{ paddingTop: insets.top > 0 ? insets.top + 10 : 40 }}
      >
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-1">
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Write Your Review</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
        <View className="flex-row justify-between mb-8">
          <View className="flex-1 mr-4">
            <Text className="text-white text-2xl font-bold leading-tight mb-4">
              Clair Obscur:{"\n"}Expedition 33{" "}
              <Text className="text-[#A499C9] text-sm font-normal">2025</Text>
            </Text>

            <Text className="text-[#A499C9] text-xs mb-2">
              Specify the date you played it
            </Text>
            <View className="flex-row items-center bg-[#2D214F] border border-[#4A3F75]/50 rounded-lg p-3 mb-6 justify-between">
              <View className="flex-row items-center">
                <CalendarIcon size={16} color="#A499C9" className="mr-2" />
                <Text className="text-light-200 text-xs">06 March 2025</Text>
              </View>
              <Text className="text-[#B8AAFF] text-xs font-bold">Change</Text>
            </View>

            <Text className="text-[#A499C9] text-xs mb-2">
              Give your rating
            </Text>
            <View className="flex-row items-center justify-between pr-4">
              {/* Para ficar interativo, você pode criar um TouchableOpacity sobre cada estrela futuramente, por enquanto usamos o visual */}
              <TouchableOpacity
                onPress={() => setRating(rating === 5 ? 0 : rating + 1)}
              >
                <StarRating rating={rating} size={24} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                <Heart
                  size={24}
                  color={isFavorite ? "#FF89A3" : "#4A3F75"}
                  fill={isFavorite ? "#FF89A3" : "transparent"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Image
            source={{ uri: "https://placehold.co/200x300" }}
            className="w-28 h-40 rounded-lg border border-[#4A3F75]"
          />
        </View>

        <View className="bg-[#2D214F] rounded-xl p-4 border border-[#4A3F75]/50 min-h-[300px] mb-6">
          <TextInput
            className="flex-1 text-light-200 text-base"
            placeholder="Write down your review..."
            placeholderTextColor="#7D70A3"
            multiline
            textAlignVertical="top"
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>

        <View className="items-end">
          <TouchableOpacity
            className="bg-[#B8AAFF] px-8 py-3 rounded-full"
            onPress={() => {
              // Lógica de salvar e voltar
              router.back();
            }}
          >
            <Text className="text-[#2C225A] font-bold text-base">Publish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
