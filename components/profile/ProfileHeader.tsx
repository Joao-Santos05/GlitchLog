import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

interface ProfileHeaderProps {
  scrollY: Animated.Value;
}

export default function ProfileHeader({ scrollY }: ProfileHeaderProps) {
  return (
    <View className="relative overflow-visible">
      <Animated.Image
        source={require("@/assets/images/BannerLogin.png")}
        className="w-full h-48"
        style={{
          transform: [
            {
              // A mágica acontece aqui: movemos pra cima (negativo)
              // exatamente na metade da distância pra compensar o scale!
              translateY: scrollY.interpolate({
                inputRange: [-192, 0], // 192 é a altura exata da imagem (h-48)
                outputRange: [-96, 0], // Sobe pela metade, cravando a base no lugar
                extrapolateRight: "clamp", // Trava a animação ao rolar pra baixo
              }),
            },
            {
              // A escala dobra exatamente quando puxamos a altura inteira da imagem
              scale: scrollY.interpolate({
                inputRange: [-192, 0],
                outputRange: [2, 1],
                extrapolateRight: "clamp",
              }),
            },
          ],
        }}
      />

      <View className="items-center -mt-14 z-10">
        <View className="relative">
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=11",
            }}
            className="w-28 h-28 rounded-full border-4 border-[#23213D]"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-indigo-600 p-1.5 rounded-full">
            <Ionicons name="pencil" size={14} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mt-2">
          <Text className="text-white text-2xl font-bold">David</Text>
        </View>

        <View className="flex-row gap-6 mt-2">
          <Text className="text-light-300 border-b border-light-300">
            500 Followers
          </Text>
          <Text className="text-light-300 border-b border-light-300">
            420 Followings
          </Text>
        </View>
      </View>
    </View>
  );
}
