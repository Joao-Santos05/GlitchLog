import HomeHeader from "@/components/home/HomeHeader";
import PopularLists from "@/components/home/PopularLists";
import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import ReviewCard from "@/components/shared/ReviewCard";
import StarRating from "@/components/shared/StarRating";
import { Game } from "@/interfaces/interfaces";
import { List, Review } from "@/types";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MOCK_GAMES: Game[] = [
  {
    id: 1,
    title: "Expedition 33",
    poster_path: "https://via.placeholder.com/150x200",
    vote_average: 4.5,
    release_date: "2025-01-01",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    genres: [],
    platforms: [],
    developers: [],
    publishers: [],
  },
  {
    id: 2,
    title: "Resident Evil",
    poster_path: "https://via.placeholder.com/150x200",
    vote_average: 5,
    release_date: "2026-01-01",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    genres: [],
    platforms: [],
    developers: [],
    publishers: [],
  },
  {
    id: 3,
    title: "Death Stranding 2",
    poster_path: "https://via.placeholder.com/150x200",
    vote_average: 4,
    release_date: "2025-01-01",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    genres: [],
    platforms: [],
    developers: [],
    publishers: [],
  },
  {
    id: 4,
    title: "Silksong",
    poster_path: "https://via.placeholder.com/150x200",
    vote_average: 5,
    release_date: "2025-12-31",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    genres: [],
    platforms: [],
    developers: [],
    publishers: [],
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
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="flex items-center justify-center border-b border-dark-300 pt-16 pb-6 bg-background">
        <Image
          source={require("@/assets/icons/logotext.png")}
          className="w-56 h-12 bg-dark-200 px-4 rounded-full"
          resizeMode="contain"
        />
      </View>

      <ScrollView className="flex-1 pt-4 mb-6">
        <HomeHeader />

        <View className="mt-8 px-6">
          <Text className="text-white text-lg font-bold mb-4 bg-light-400 px-4 py-1.5 rounded-full self-start">
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
                className="w-28 mr-2"
              >
                <Image
                  source={{
                    uri:
                      game.poster_path ||
                      "https://placehold.co/150x200/1a1a1a/ffffff.png",
                  }}
                  className="w-full h-40 rounded-md border border-[#4A3F75]"
                />
                <View className="flex-row justify-center mt-2">
                  <StarRating rating={game.vote_average || 0} size={10} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View className="mt-8 px-6">
          <Text className="text-white text-lg font-bold mb-4 bg-light-400 px-4 py-1.5 rounded-full self-start">
            Popular Lists This Month
          </Text>
          <PopularLists lists={MOCK_LISTS} />
        </View>

        <View className="mt-8 px-6 pb-24">
          <Text className="text-white text-lg font-bold mb-4 bg-light-400 px-4 py-1.5 rounded-full self-start">
            Recent Friends Review
          </Text>
          {MOCK_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
