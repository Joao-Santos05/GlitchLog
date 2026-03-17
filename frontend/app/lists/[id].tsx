import GoBack from "@/components/shared/GoBack";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Heart, MessageCircle, Share2 } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MOCK_LIST = {
  id: "1",
  title: "Melhores jogos para comer pipoca",
  description:
    "Jogos que têm tantas cutscenes que você pode simplesmente largar o controle e focar no lanche sem culpa.",
  creator: { name: "David", avatarUrl: "https://i.pravatar.cc/150?img=11" },
  likes: 420,
  comments: 69,
  games: [
    {
      id: "1",
      title: "Death Stranding",
      coverUrl: "https://via.placeholder.com/150x200",
    },
    {
      id: "2",
      title: "Detroit: Become Human",
      coverUrl: "https://via.placeholder.com/150x200",
    },
    {
      id: "3",
      title: "Metal Gear Solid 4",
      coverUrl: "https://via.placeholder.com/150x200",
    },
    {
      id: "4",
      title: "Until Dawn",
      coverUrl: "https://via.placeholder.com/150x200",
    },
    {
      id: "5",
      title: "Heavy Rain",
      coverUrl: "https://via.placeholder.com/150x200",
    },
    {
      id: "6",
      title: "The Quarry",
      coverUrl: "https://via.placeholder.com/150x200",
    },
  ],
};

export default function ListDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <View className="px-6 pt-14 pb-4 flex-row items-center justify-between">
        <GoBack />
        <TouchableOpacity className="w-10 h-10 bg-black/70 rounded-full items-center justify-center">
          <Share2 color="white" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-4 pb-6 border-b border-gray-700">
          <Text className="text-white text-3xl font-bold mb-4">
            {MOCK_LIST.title}
          </Text>

          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: MOCK_LIST.creator.avatarUrl }}
              className="w-8 h-8 rounded-full mr-3"
            />
            <Text className="text-gray-300 text-sm">
              List by{" "}
              <Text className="font-bold text-white">
                {MOCK_LIST.creator.name}
              </Text>
            </Text>
          </View>

          <Text className="text-gray-400 text-sm leading-6 mb-6">
            {MOCK_LIST.description}
          </Text>

          <View className="flex-row items-center gap-6">
            <View className="flex-row items-center gap-2">
              <Heart size={18} color={"red"} fill={"red"} />
              <Text className="text-white font-bold">{MOCK_LIST.likes}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <MessageCircle size={18} color="#9CA3AF" />
              <Text className="text-white font-bold">{MOCK_LIST.comments}</Text>
            </View>
          </View>
        </View>

        <View className="px-6 py-6">
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {MOCK_LIST.games.map((game) => (
              <TouchableOpacity
                key={game.id}
                className="w-[30%]"
                onPress={() => router.push(`/games/${game.id}`)}
              >
                <Image
                  source={{ uri: game.coverUrl }}
                  className="w-full aspect-[2/3] rounded-md border border-[#4A3F75]"
                />
                <Text
                  className="text-gray-300 text-xs text-center font-medium mt-2"
                  numberOfLines={2}
                >
                  {game.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
