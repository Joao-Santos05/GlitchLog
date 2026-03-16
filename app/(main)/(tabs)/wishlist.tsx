import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import StarRating from "@/components/shared/StarRating";
import { SearchIcon, Trash2 } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MOCK_WISHLIST = [
  {
    id: 1,
    title: "Enigma of Fear",
    rating: 4.5,
    image: "https://placehold.co/600x300",
  },
  {
    id: 2,
    title: "GTA VI",
    rating: 4.0,
    image: "https://placehold.co/600x300",
  },
];

export default function WishlistScreen() {
  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-28 pb-4 flex-row items-center justify-between z-50">
        <Text className="text-white text-2xl font-bold">
          {"David's Wishlist"}
        </Text>
        <View className="flex-row items-center bg-[#2D214F] rounded-full px-3 py-1.5 border border-[#4A3F75]">
          <TextInput
            placeholder="search"
            placeholderTextColor="#A499C9"
            className="text-white text-xs w-16"
          />
          <SearchIcon size={12} color="#A499C9" />
        </View>
      </View>

      <FlatList
        data={MOCK_WISHLIST}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View className="mb-5 rounded-xl overflow-hidden border border-[#4A3F75] bg-[#2D214F]">
            <ImageBackground
              source={{ uri: item.image }}
              className="w-full h-40 justify-end"
            >
              {/* Gradiente escuro para o texto ler bem */}
              <View className="p-3 bg-black/60 flex-row items-end justify-between">
                <View>
                  <Text className="text-white font-bold text-base mb-1">
                    {item.title}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <StarRating rating={item.rating} size={12} />
                    <Text className="text-white font-bold ml-1">
                      {item.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="p-2">
                  <Trash2 size={18} color="#A499C9" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
}
