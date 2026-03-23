import GameCard from "@/components/shared/GameCard";
import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import FilterDropdown, {
  FilterOption,
} from "@/components/shared/FilterDropdown";
import RatingFilterDropdown from "@/components/shared/RatingFilterDropdown";
import { icons } from "@/constants/icons";
import { fetchGames } from "@/services/api";
import { SearchIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Animated,
  Text,
  TextInput,
  View,
  RefreshControl,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GENRES_OPTIONS: FilterOption[] = [
  { label: "All Genres", value: "All" },
  { label: "Action", value: "Action" },
  { label: "Drama", value: "Drama" },
  { label: "Horror", value: "Horror" },
  { label: "Platformer", value: "Platformer" },
  { label: "Sci-Fi", value: "Sci-Fi" },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const loadData = useCallback(
    async (isRefreshing = false) => {
      if (!isRefreshing) setLoading(true);
      setError(null);
      try {
        const res = await fetchGames({ query: searchQuery });
        setGames(res);
      } catch (err: any) {
        setError(err);
      } finally {
        if (!isRefreshing) setLoading(false);
        if (isRefreshing) setRefreshing(false);
      }
    },
    [searchQuery],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData(true);
  }, [loadData]);

  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(() => {
      if (isMounted) loadData();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      isMounted = false;
    };
  }, [loadData]);

  const filteredGames = (games || [])
    .map((game: any) => {
      let rawRating = game.vote_average || game.rating || 0;
      if (rawRating > 10) rawRating = rawRating / 20;
      else if (rawRating > 5) rawRating = rawRating / 2;
      const roundedRating = Math.round(rawRating * 2) / 2;
      return { ...game, vote_average: roundedRating };
    })
    .filter((game: any) => {
      const matchesRating =
        selectedRating === 0 || game.vote_average === selectedRating;
      const matchesGenre =
        selectedGenre === "All" ||
        (game.genres &&
          game.genres.some(
            (g: any) => g.name?.toLowerCase() === selectedGenre.toLowerCase(),
          ));
      return matchesRating && matchesGenre;
    });

  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />
      <Animated.FlatList
        data={filteredGames}
        renderItem={({ item }) => <GameCard {...item} />}
        keyExtractor={(item: any) => item.id.toString()}
        className="px-5"
        numColumns={3}
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
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 8,
          zIndex: -1,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
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
        ListHeaderComponentStyle={{
          zIndex: 1000,
          elevation: 1000,
          paddingBottom: 10,
          paddingTop: insets.top > 0 ? insets.top + 20 : 30,
        }}
        ListHeaderComponent={
          <View style={{ zIndex: 1000, elevation: 1000 }}>
            <View className="w-full flex-row justify-center mt-10 relative h-14 z-10">
              <Animated.Image
                source={icons.logo}
                className="w-12 h-14"
                style={{
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [-56, 0],
                        outputRange: [-28, 0],
                        extrapolateRight: "clamp",
                      }),
                    },
                    {
                      scale: scrollY.interpolate({
                        inputRange: [-56, 0],
                        outputRange: [2, 1],
                        extrapolateRight: "clamp",
                      }),
                    },
                  ],
                }}
              />
            </View>

            <View className="flex-row items-center bg-[#1A133A] rounded-xl px-4 py-3 my-5 border border-[#F2E8FF]/20 z-10">
              <SearchIcon size={20} color="#C8ADFF" />
              <TextInput
                placeholder="Search for games..."
                placeholderTextColor="#C8ADFF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 ml-3 text-white text-base"
              />
            </View>

            {(loading || refreshing) && (
              <ActivityIndicator
                size="large"
                color="#C8ADFF"
                style={{ marginTop: 10, marginBottom: 20 }}
              />
            )}

            <View
              className="flex-row gap-6 mb-4 justify-end relative"
              style={{ zIndex: 1000, elevation: 1000 }}
            >
              <RatingFilterDropdown
                activeLabel={
                  selectedRating === 0
                    ? "RATING"
                    : `${selectedRating.toFixed(1)} STARS`
                }
                rating={selectedRating}
                isOpen={isRatingOpen}
                onToggle={() => {
                  setIsRatingOpen(!isRatingOpen);
                  setIsGenreOpen(false);
                }}
                onChange={(val) => setSelectedRating(val)}
              />

              <FilterDropdown
                activeLabel={selectedGenre === "All" ? "GENRE" : selectedGenre}
                options={GENRES_OPTIONS}
                isOpen={isGenreOpen}
                onToggle={() => {
                  setIsGenreOpen(!isGenreOpen);
                  setIsRatingOpen(false);
                }}
                onSelect={(val) => {
                  setSelectedGenre(val as string);
                  setIsGenreOpen(false);
                }}
                widthClass="w-32"
              />
            </View>

            {error && (
              <Text className="text-red-400 text-center my-3 font-semibold">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() !== "" &&
              filteredGames.length > 0 && (
                <Text className="text-lg text-white font-bold mb-4">
                  Results for:{" "}
                  <Text className="text-[#C8ADFF]">{searchQuery}</Text>
                </Text>
              )}
          </View>
        }
        ListEmptyComponent={
          !loading && !error && !refreshing ? (
            <View className="mt-10 px-5 items-center">
              <Text className="text-center text-[#A499C9] text-base">
                {searchQuery.trim()
                  ? `No games found for ${selectedRating > 0 ? selectedRating.toFixed(1) + " stars" : "this term"}.`
                  : "Type a game name to search."}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
