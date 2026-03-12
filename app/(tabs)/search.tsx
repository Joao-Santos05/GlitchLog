import GameCard from "@/components/GameCard";
import { icons } from "@/constants/icons"; // Descomente se for usar sua logo
import { fetchGames } from "@/services/api";
import useFetch from "@/services/useFetch"; // Certifique-se que este hook existe
import { SearchIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: games,
    loading,
    error,
    refetch: loadGames,
  } = useFetch(() => fetchGames({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadGames();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, loadGames]);

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={games || []}
        renderItem={({ item }) => <GameCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 8,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-14" />
            </View>

            <View className="flex-row items-center bg-[#1A133A] rounded-xl px-4 py-3 my-5 mt-15 border border-[#F2E8FF]/20">
              <SearchIcon size={20} color="#C8ADFF" />
              <TextInput
                placeholder="Search for games..."
                placeholderTextColor="#C8ADFF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 ml-3 text-light-200 text-base"
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
              games &&
              games.length > 0 && (
                <Text className="text-lg text-white font-bold mb-4">
                  Results for:{" "}
                  <Text className="text-[#C8ADFF]">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5 items-center">
              <Text className="text-center text-[#A499C9] text-base">
                {searchQuery.trim()
                  ? "No games found for this term."
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
