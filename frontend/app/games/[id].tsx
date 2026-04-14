import GoBack from "@/components/shared/GoBack";
import StarRating from "@/components/shared/StarRating";
import { useRouter } from "expo-router";
import {
  Edit3,
  Gamepad2,
  Heart,
  ListPlus,
  PlaySquare,
  Plus,
} from "lucide-react-native";
import React, { useRef, useState, useCallback } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReviewCard from "../../components/shared/ReviewCard";
import { Review, Game } from "../../types";

const MOCK_GAME_DETAILS: Game = {
  id: "1",
  title: "Alien",
  poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
  vote_average: 4,
  release_date: "2014-10-07",
  overview: "",
  backdrop_path: null,
  vote_count: 0,
  genres: [],
  platforms: [],
  developers: [],
  publishers: [],
};

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    game: {
      id: "1",
      title: "Alien",
      poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
      release_date: "2014-10-07",
    },
    reviewer: {
      id: "1",
      name: "David",
      avatarUrl: "https://i.pravatar.cc/150?img=11",
    },
    stars: 4,
    likes: 0,
    comments: 8,
    content:
      "Playing through this absolute gem of a game reminded me of when in 2011 i took up skyrim...",
  },
];

export default function GameDetailsScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const [loading] = useState(false);
  const insets = useSafeAreaInsets();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View className="flex-1 bg-background">
      <Animated.ScrollView
        className="flex-1"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        onScrollEndDrag={(e) => {
          if (
            Platform.OS === "ios" &&
            e.nativeEvent.contentOffset.y < -60 &&
            !refreshing
          ) {
            onRefresh();
          }
        }}
        refreshControl={
          Platform.OS === "android" ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="transparent"
              colors={["transparent"]}
              progressBackgroundColor="transparent"
              progressViewOffset={-1000}
            />
          ) : undefined
        }
      >
        <View className="relative h-72">
          <Image
            source={{
              uri:
                MOCK_GAME_DETAILS.backdrop_path ||
                "https://via.placeholder.com/800x600",
            }}
            className="w-full h-full opacity-60 rounded-b-[40px]"
          />
          <View
            className="absolute w-full h-10 flex-row items-center justify-center"
            style={{ top: insets.top > 0 ? insets.top + 20 : 56 }}
          >
            <View className="absolute left-6 z-10 w-10 h-10 items-center justify-center">
              <GoBack />
            </View>
            {refreshing && (
              <View className="w-10 h-10 bg-black/70 rounded-full items-center justify-center">
                <ActivityIndicator size="small" color="#C8ADFF" />
              </View>
            )}
          </View>
        </View>

        {loading && (
          <View className="flex-row justify-center py-8">
            <ActivityIndicator size="large" color="#ff8945" />
          </View>
        )}

        <View className="px-6 -mt-20 flex-row">
          <View className="w-32 mr-5">
            <Image
              source={{
                uri:
                  MOCK_GAME_DETAILS.poster_path ||
                  "https://via.placeholder.com/200x300",
              }}
              className="w-full h-48 rounded-xl border-2 border-dark-600"
            />
            <View className="flex-row justify-between mt-3">
              <View className="items-center">
                <Gamepad2 size={16} color="#10B981" />
                <Text className="text-light-200 text-[10px] mt-1">40k</Text>
              </View>
              <View className="items-center">
                <Heart size={16} color="red" fill={"red"} />
                <Text className="text-light-200 text-[10px] mt-1">30k</Text>
              </View>
              <View className="items-center">
                <ListPlus size={16} color="#3B82F6" />
                <Text className="text-light-200 text-[10px] mt-1">12k</Text>
              </View>
            </View>

            <View className="mt-4 gap-y-3">
              <TouchableOpacity
                onPress={() =>
                  router.push(`/reviews/new?gameId=${MOCK_GAME_DETAILS.id}`)
                }
                className="bg-light-400 py-2.5 rounded-lg flex-row justify-center items-center"
              >
                <Edit3 size={14} color="white" />
                <Text className="text-white font-bold text-xs ml-1">
                  Rate or Review
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-light-400 py-2.5 rounded-lg flex-row justify-center items-center">
                <Plus size={14} color="white" />
                <Text className="text-white font-bold text-xs ml-1">
                  Add to Lists
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-light-400 py-2.5 rounded-lg flex-row justify-center items-center">
                <PlaySquare size={14} color="white" />
                <Text className="text-white font-bold text-xs ml-1">
                  Add to Playlist
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-1 mt-22">
            <Text className="text-white text-2xl font-bold">
              {MOCK_GAME_DETAILS.title}
            </Text>
            <Text className="text-gray-400 text-sm mt-1 mb-2">
              {MOCK_GAME_DETAILS.release_date.split("-")[0]}
            </Text>

            {MOCK_GAME_DETAILS.developers.length > 0 && (
              <Text className="text-gray-300 text-xs mb-3">
                Produced by{" "}
                <Text className="font-bold text-light-300">
                  {MOCK_GAME_DETAILS.developers[0].name}
                </Text>
              </Text>
            )}

            <Text className="text-light-200 text-[10px] leading-4 mb-6">
              {MOCK_GAME_DETAILS.overview}
            </Text>

            <Text className="text-white text-lg font-bold mt-15 mb-3 bg-indigo-600 px-2 p-1.5 rounded-full self-start">
              Ratings
            </Text>
            <View className="flex-row items-end h-20 border-b border-gray-600/50 mb-2 mt-14">
              {[1, 2, 3, 5, 8, 12, 20, 30, 45, 60].map((h, i) => (
                <View
                  key={i}
                  className="flex-1 bg-gray-500 mx-0.5"
                  style={{ height: h }}
                />
              ))}
              <View className="ml-4 items-center">
                <Text className="text-white text-3xl font-bold">
                  {MOCK_GAME_DETAILS.vote_average}
                </Text>
                <View className="flex-row mt-1">
                  <StarRating
                    rating={MOCK_GAME_DETAILS.vote_average}
                    size={10}
                  />
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
          {MOCK_REVIEWS.map((reviewItem) => (
            <ReviewCard
              key={reviewItem.id}
              review={reviewItem}
              showGameCover={false}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
