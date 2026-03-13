import GameCard from "@/components/GameCard";
import FilterDropdown, {
  FilterOption,
} from "@/components/shared/FilterDropdown";
import RatingFilterDropdown from "@/components/shared/RatingFilterDropdown";
import { icons } from "@/constants/icons";
import { fetchGames } from "@/services/api";
import { SearchIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Text,
  TextInput,
  View,
} from "react-native";

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

  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  // Busca na API sem loop infinito
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchGames({ query: searchQuery });
        if (isMounted) setGames(res);
      } catch (err: any) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      load();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      isMounted = false;
    };
  }, [searchQuery]);

  // TRADUÇÃO E FILTRAGEM
  const filteredGames = (games || [])
    .map((game: any) => {
      // 1. Normaliza a nota da API (que pode vir até 10 ou 100) para a escala de 0 a 5
      let rawRating = game.vote_average || game.rating || 0;
      if (rawRating > 10) rawRating = rawRating / 20;
      else if (rawRating > 5) rawRating = rawRating / 2;

      // 2. Arredonda a nota para o 0.5 mais próximo.
      // Isso garante que o Filtro e o GameCard falem a mesma língua!
      const roundedRating = Math.round(rawRating * 2) / 2;

      return { ...game, vote_average: roundedRating };
    })
    .filter((game: any) => {
      // 3. Aplica o filtro de correspondência EXATA
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
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 8,
          zIndex: -1, // Joga os cards pra trás para o dropdown flutuar por cima
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponentStyle={{
          zIndex: 1000,
          elevation: 1000,
          paddingBottom: 10,
        }}
        ListHeaderComponent={
          <View style={{ zIndex: 1000, elevation: 1000 }}>
            <View className="w-full flex-row justify-center mt-20 relative h-14 z-10">
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

            {/* BARRA DE FILTROS */}
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

            {loading && (
              <ActivityIndicator
                size="large"
                color="#C8ADFF"
                className="my-5"
              />
            )}

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
          !loading && !error ? (
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
