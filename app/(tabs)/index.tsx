import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HomeHeader from "../../components/home/HomeHeader";
import PopularLists from "../../components/home/PopularLists";
import ReviewCard from "../../components/shared/ReviewCard";
import { Game, List, Review } from "../../types";

const MOCK_GAMES: Game[] = [
  {
    id: "1",
    title: "Expedition 33",
    coverUrl: "https://via.placeholder.com/150x200",
  },
  {
    id: "2",
    title: "Resident Evil",
    coverUrl: "https://via.placeholder.com/150x200",
  },
  {
    id: "3",
    title: "Death Stranding 2",
    coverUrl: "https://via.placeholder.com/150x200",
  },
  {
    id: "4",
    title: "Silksong",
    coverUrl: "https://via.placeholder.com/150x200",
  },
];

const MOCK_LISTS: List[] = [
  {
    id: "1",
    title: "Life-Changing Games",
    coverUrls: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    creator: {
      name: "Alejandro",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    likes: 320,
    comments: 75,
  },
  {
    id: "2",
    title: "Best Open World Games",
    coverUrls: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    creator: { name: "Wendy", avatarUrl: "https://i.pravatar.cc/150?img=2" },
    likes: 887,
    comments: 121,
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    game: {
      id: "5",
      title: "Kingdom Come",
      coverUrl: "https://via.placeholder.com/150x200",
      year: "2025",
    },
    reviewer: { name: "Adrian", avatarUrl: "https://i.pravatar.cc/150?img=3" },
    stars: 4,
    likes: 0,
    comments: 8,
    content:
      "Playing through this absolute gem of a game reminded me of when in 2011 i took up skyrim...",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-background">
      <HomeHeader />

      <View className="mt-4">
        <Text className="text-white text-lg font-bold px-6 mb-4">
          Popular Games This Month
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          className="gap-4"
        >
          {MOCK_GAMES.map((game) => (
            <TouchableOpacity
              key={game.id}
              onPress={() => router.push(`/games/${game.id}`)}
            >
              <Image
                source={{ uri: game.coverUrl }}
                className="w-28 h-40 rounded-lg mr-2"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <PopularLists lists={MOCK_LISTS} />

      <View className="mt-8 px-6 pb-24">
        <Text className="text-white text-lg font-bold mb-4">
          Recent Friends Review
        </Text>
        {MOCK_REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </View>
    </ScrollView>
  );
}
