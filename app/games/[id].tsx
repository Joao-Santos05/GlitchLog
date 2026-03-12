import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Edit3,
  Gamepad2,
  Heart,
  ListPlus,
  PlaySquare,
  Plus,
  Star,
} from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ReviewCard from "../../components/shared/ReviewCard";
import { Review } from "../../types";

const MOCK_GAME_REVIEW: Review = {
  id: "1",
  game: { id: "1", title: "Expedition 33", coverUrl: "" },
  reviewer: {
    name: "Dabliuziar",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
  },
  stars: 4,
  likes: 0,
  comments: 5,
  content:
    "It took me a while to start playing, but I was quite surprised in the first few hours...",
};

export default function GameDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-[#1E1B30]">
      <View className="relative h-72">
        <Image
          source={{ uri: "https://via.placeholder.com/800x600" }}
          className="w-full h-full opacity-60 rounded-b-[40px]"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-6 w-10 h-10 bg-black/40 rounded-full items-center justify-center"
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
      </View>

      <View className="px-6 -mt-20 flex-row">
        <View className="w-32 mr-5">
          <Image
            source={{ uri: "https://via.placeholder.com/200x300" }}
            className="w-full h-48 rounded-xl border-2 border-[#1E1B30]"
          />
          <View className="flex-row justify-between mt-3">
            <View className="items-center">
              <Gamepad2 size={16} color="#10B981" />
              <Text className="text-gray-400 text-[10px] mt-1">40k</Text>
            </View>
            <View className="items-center">
              <Heart size={16} color="#EF4444" />
              <Text className="text-gray-400 text-[10px] mt-1">30k</Text>
            </View>
            <View className="items-center">
              <ListPlus size={16} color="#3B82F6" />
              <Text className="text-gray-400 text-[10px] mt-1">12k</Text>
            </View>
          </View>

          <View className="mt-6 gap-y-3">
            <TouchableOpacity className="bg-[#D8B4E2] py-2.5 rounded-lg flex-row justify-center items-center">
              <Edit3 size={14} color="#1E1B30" className="mr-2" />
              <Text className="text-[#1E1B30] font-bold text-xs">
                Rate or Review
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#D8B4E2] py-2.5 rounded-lg flex-row justify-center items-center">
              <Plus size={14} color="#1E1B30" className="mr-2" />
              <Text className="text-[#1E1B30] font-bold text-xs">
                Add to Lists
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#D8B4E2] py-2.5 rounded-lg flex-row justify-center items-center">
              <PlaySquare size={14} color="#1E1B30" className="mr-2" />
              <Text className="text-[#1E1B30] font-bold text-xs">
                Add to Playlist
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 mt-24">
          <Text className="text-white text-2xl font-bold">
            Clair Obscur: Expedition 33
          </Text>
          <Text className="text-gray-400 text-sm mt-1 mb-2">2025</Text>
          <Text className="text-gray-300 text-xs mb-3">
            Produced by{" "}
            <Text className="font-bold text-white">Sandfall Interactive</Text>
          </Text>
          <Text className="text-gray-400 text-[10px] leading-4 mb-6">
            Lead the members of Expedition 33 on a mission to destroy the
            Artificer so she can never paint death again...
          </Text>

          <Text className="text-white text-lg font-bold mb-3">Ratings</Text>
          <View className="flex-row items-end h-20 border-b border-gray-600/50 pb-2 mb-2">
            {[1, 2, 3, 5, 8, 12, 20, 30, 45, 60].map((h, i) => (
              <View
                key={i}
                className="flex-1 bg-gray-500 mx-0.5"
                style={{ height: h }}
              />
            ))}
            <View className="ml-4 items-center">
              <Text className="text-white text-3xl font-bold">4.6</Text>
              <View className="flex-row mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    color="#E9A6A6"
                    fill={i < 4 ? "#E9A6A6" : "transparent"}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-8 px-6">
        <View className="flex-row gap-6 border-b border-gray-700 pb-3">
          <TouchableOpacity className="bg-[#FF8A65] px-4 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">Casts</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-gray-400 text-xs mt-1">Crews</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-gray-400 text-xs mt-1">Details</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 flex-row"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Image
              key={i}
              source={{ uri: `https://i.pravatar.cc/150?img=${i + 10}` }}
              className="w-12 h-12 rounded-full mr-4"
            />
          ))}
        </ScrollView>
      </View>

      <View className="mt-8 px-6 pb-24">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-lg font-bold">All Reviews</Text>
          <TouchableOpacity>
            <Text className="text-[#FF8A65] text-xs">See All</Text>
          </TouchableOpacity>
        </View>
        <ReviewCard review={MOCK_GAME_REVIEW} showGameCover={false} />
        <ReviewCard review={MOCK_GAME_REVIEW} showGameCover={false} />
      </View>
    </ScrollView>
  );
}
