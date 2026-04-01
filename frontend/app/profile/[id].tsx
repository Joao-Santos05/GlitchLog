import FavoriteGames from "@/components/profile/FavoriteGames";
import ProfileHeader from "@/components/profile/ProfileHeader";
import RPlayed from "@/components/profile/RPlayed";
import StatsRow from "@/components/profile/StatsRow";
import ReviewCard from "@/components/shared/ReviewCard";
import GoBack from "@/components/shared/GoBack";
import { Game } from "@/interfaces/interfaces";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  Animated,
  Text,
  View,
  RefreshControl,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const statsMock = [
  { label: "Total Games", value: "45" },
  { label: "Games This Year", value: "12" },
  { label: "Lists", value: "4" },
  { label: "Reviews", value: "25" },
];

const favoritesMock: Game[] = [
  {
    id: 1,
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
  },
  {
    id: 2,
    title: "Detroit",
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    vote_average: 5,
    release_date: "2018-05-25",
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
    title: "Dispatch",
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    vote_average: 4,
    release_date: "2024-01-01",
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
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
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

const recentGamesMock: Game[] = [
  {
    id: 5,
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
  },
  {
    id: 6,
    title: "Detroit",
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    vote_average: 5,
    release_date: "2018-05-25",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    genres: [],
    platforms: [],
    developers: [],
    publishers: [],
  },
  {
    id: 7,
    title: "Dispatch",
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    vote_average: 4,
    release_date: "2024-01-01",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    genres: [],
    platforms: [],
    developers: [],
    publishers: [],
  },
  {
    id: 8,
    title: "Silksong",
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
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

const MOCK_REVIEWS = [
  {
    id: "1",
    game: {
      id: "5",
      title: "Kingdom Come",
      coverUrl: "https://via.placeholder.com/150x200",
      year: "2025",
    },
    reviewer: {
      id: "99", // 🚨 Obrigatório para o ProfilePicture funcionar!
      name: "David",
      avatarUrl: "https://i.pravatar.cc/150?img=11",
    },
    stars: 4,
    likes: 12,
    comments: 8,
    content:
      "Playing through this absolute gem of a game reminded me of when in 2011 i took up skyrim...",
  },
  {
    id: "2",
    game: {
      id: "8",
      title: "Silksong",
      coverUrl: "https://via.placeholder.com/150x200",
      year: "2025",
    },
    reviewer: {
      id: "42",
      name: "Aria",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
    },
    stars: 5,
    likes: 340,
    comments: 56,
    content:
      "The wait was absolutely worth it. The fluid combat and stunning visuals are a masterpiece.",
  },
];

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUserData({
        id: id,
        name: `User ${id}`,
        avatarUrl: `https://i.pravatar.cc/150?img=${id || 8}`,
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#C8ADFF" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View
        className="absolute z-50 left-5"
        style={{ top: Platform.OS === "ios" ? insets.top + 10 : 30 }}
      >
        <GoBack />
      </View>

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
              tintColor="#C8ADFF"
              colors={["#C8ADFF"]}
              progressBackgroundColor="#1A133A"
              progressViewOffset={-1000}
            />
          ) : undefined
        }
      >
        <ProfileHeader scrollY={scrollY} user={userData} />
        <StatsRow stats={statsMock} />
        <FavoriteGames games={favoritesMock} />

        <View className="h-[1px] bg-gray-600 w-full mt-6 opacity-30" />

        <RPlayed games={recentGamesMock} />

        <View className="mt-8 px-6 pb-24">
          <Text className="text-white text-lg font-bold mb-4 bg-light-400 px-4 py-1.5 rounded-full">
            Recent Reviews
          </Text>
          {MOCK_REVIEWS.map((reviewItem) => (
            <ReviewCard
              key={reviewItem.id}
              review={reviewItem}
              showGameCover={true}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
