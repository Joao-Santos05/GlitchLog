import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import FilterDropdown, {
  FilterOption,
} from "@/components/shared/FilterDropdown";
import RatingFilterDropdown from "@/components/shared/RatingFilterDropdown";
import StarRating from "@/components/shared/StarRating";
import { Game } from "@/interfaces/interfaces";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const MOCK_GAMES: Game[] = [
  {
    id: 1,
    title: "Alien",
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    release_date: "2014-10-07",
    vote_average: 4,
    overview: "Um jogo assustador no espaço.",
    backdrop_path: null,
    vote_count: 1500,
    genres: [
      { id: 1, name: "Horror" },
      { id: 2, name: "Sci-Fi" },
    ],
    platforms: [],
    developers: [],
    publishers: [],
  },
  {
    id: 2,
    title: "Detroit",
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    release_date: "2018-05-25",
    vote_average: 5,
    overview: "Os androides sonham com ovelhas elétricas?",
    backdrop_path: null,
    vote_count: 8500,
    genres: [
      { id: 2, name: "Sci-Fi" },
      { id: 3, name: "Drama" },
    ],
    platforms: [],
    developers: [],
    publishers: [],
  },
  {
    id: 3,
    title: "Dispatch",
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    release_date: "2024-01-01",
    vote_average: 4.5,
    overview: "Descrição do dispatch.",
    backdrop_path: null,
    vote_count: 320,
    genres: [{ id: 4, name: "Action" }],
    platforms: [],
    developers: [],
    publishers: [],
  },
  {
    id: 4,
    title: "Silksong",
    poster_path: "https://via.placeholder.com/100x140/2D3748/FFFFFF",
    release_date: "2025-12-31",
    vote_average: 5,
    overview: "A lenda de Hornet.",
    backdrop_path: null,
    vote_count: 10,
    genres: [
      { id: 5, name: "Platformer" },
      { id: 4, name: "Action" },
    ],
    platforms: [],
    developers: [],
    publishers: [],
  },
];

const GENRES_OPTIONS: FilterOption[] = [
  { label: "All Genres", value: "All" },
  { label: "Action", value: "Action" },
  { label: "Drama", value: "Drama" },
  { label: "Horror", value: "Horror" },
  { label: "Platformer", value: "Platformer" },
  { label: "Sci-Fi", value: "Sci-Fi" },
];

export default function GamesScreen() {
  const router = useRouter();

  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const filteredGames = MOCK_GAMES.filter((game) => {
    const gameRating = Math.round((game.vote_average || 0) * 2) / 2;
    const matchesRating = selectedRating === 0 || gameRating === selectedRating;

    const matchesGenre =
      selectedGenre === "All" ||
      game.genres.some((g) => g.name === selectedGenre);
    return matchesRating && matchesGenre;
  });

  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />
      <View className="px-6 pt-32 pb-4 flex-row items-center justify-between border-b border-dark-300 relative">
        <Text className="text-white text-sm font-bold tracking-widest bg-light-400 px-4 py-1.5 rounded-full self-start">
          GAMES
        </Text>

        <View className="flex-row gap-6">
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
      </View>

      <FlatList
        data={filteredGames}
        keyExtractor={(game) => game.id.toString()}
        numColumns={3}
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 14,
          marginBottom: 20,
          zIndex: -1,
        }}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-10">
            No games found with {selectedRating.toFixed(1)} stars.
          </Text>
        }
        renderItem={({ item: game }) => (
          <TouchableOpacity
            className="w-[31%]"
            onPress={() => router.push(`/games/${game.id}`)}
          >
            <Image
              source={{
                uri:
                  game.poster_path ||
                  "https://placehold.co/600x400/1a1a1a/ffffff.png",
              }}
              className="w-full aspect-[2/3] rounded-md border border-[#4A3F75]"
            />
            <View className="flex-row items-center justify-between mt-1.5 px-0.5">
              <View className="flex-row mt-1">
                <StarRating rating={game.vote_average || 0} size={10} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
