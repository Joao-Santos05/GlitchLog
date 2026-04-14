import FavoriteGames from "@/components/profile/FavoriteGames";
import ProfileHeader from "@/components/profile/ProfileHeader";
import RPlayed from "@/components/profile/RPlayed";
import StatsRow from "@/components/profile/StatsRow";
import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import ReviewCard from "@/components/shared/ReviewCard";
import { Game, Review } from "@/types";
import React, { useRef, useState, useCallback } from "react";
import { Animated, Text, View, RefreshControl, Platform } from "react-native";

const statsMock = [
  { label: "Total Games", value: "45" },
  { label: "Games This Year", value: "12" },
  { label: "Lists", value: "4" },
  { label: "Reviews", value: "25" },
];

const favoritesMock: Game[] = [
  {
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
  },
  {
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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

export default function ProfileScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

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
        <ProfileHeader scrollY={scrollY} />
        <StatsRow stats={statsMock} />
        <FavoriteGames games={favoritesMock} />

        <View className="h-[1px] bg-gray-600 w-full mt-6 opacity-30" />

        <RPlayed games={recentGamesMock} />
        <View className="mt-8 px-6 pb-24">
          <Text className="text-white text-lg font-bold mb-4 bg-light-400 px-4 py-1.5 rounded-full">
            Recent Reviews
          </Text>
          {MOCK_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
