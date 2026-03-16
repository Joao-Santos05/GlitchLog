import StarRating from "@/components/shared/StarRating";
import { useRouter } from "expo-router";
import { ArrowLeft, Heart } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ReviewDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      {/* HEADER SIMPLES DE VOLTAR */}
      <View
        className="flex-row items-center px-6 pb-4"
        style={{ paddingTop: insets.top > 0 ? insets.top + 10 : 40 }}
      >
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-1">
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">
          {"David's Review"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
        {/* AUTOR */}
        <View className="flex-row items-center mb-6">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=11" }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <Text className="text-light-200 font-medium">david_dvd</Text>
        </View>

        {/* JOGO E NOTA */}
        <Text className="text-white text-lg font-bold">
          Resident Evil Requiem{" "}
          <Text className="text-[#A499C9] text-sm font-normal">2026</Text>
        </Text>
        <View className="flex-row items-center mt-1 mb-1">
          <StarRating rating={4.5} size={12} />
        </View>
        <Text className="text-[#A499C9] text-xs mb-4">12 March 2026</Text>

        {/* TEXTO DA REVIEW */}
        <Text className="text-light-200 text-base leading-6 mb-6">
          Exploration balances tight interior spaces with larger, decaying
          environments that invite cautious movement. Resources are scarce
          enough to keep tension alive, but not so limited that progress feels
          strangled. Combat emphasizes vulnerability; enemies feel dangerous
          without becoming damage sponges, encouraging precision over panic. The
          narrative threads together personal loss and corporate wrongdoing,
          returning to themes of bioengineering and moral collapse. Puzzle
          design remains grounded in environmental logic, occasionally clever,
          rarely obtuse. The pacing alternates between slow dread and sharp
          bursts of chaos, though some late sections lean more heavily on action
          than atmosphere.
        </Text>

        {/* LIKES */}
        <View className="flex-row items-center border-b border-[#F2E8FF]/10 pb-4 mb-4">
          <Heart size={14} color="#FF89A3" fill="#FF89A3" className="mr-2" />
          <Text className="text-[#A499C9] text-sm">697 Likes</Text>
        </View>

        {/* COMENTÁRIOS */}
        <Text className="text-white text-lg font-bold mb-4">56 Comments</Text>

        <View className="flex-row mb-6">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            className="w-8 h-8 rounded-full mr-3"
          />
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-[#A499C9] text-xs font-bold">
                Dabliuziar
              </Text>
              <Text className="text-[#A499C9] text-xs">5d</Text>
            </View>
            <Text className="text-light-200 text-sm">I agree 1000%!!!!</Text>
          </View>
        </View>

        <View className="flex-row mb-6">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=13" }}
            className="w-8 h-8 rounded-full mr-3"
          />
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-[#A499C9] text-xs font-bold">Dave</Text>
              <Text className="text-[#A499C9] text-xs">6d</Text>
            </View>
            <Text className="text-light-200 text-sm">👏👏👏</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
