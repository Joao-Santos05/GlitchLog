import React from "react";
import { Text, View } from "react-native";

const search = () => {
  return (
    <View>
      <Text>search</Text>
    </View>
  );
};

export default search;

// import GameCard from "@/components/GameCard";
// import { icons } from "@/constants/icons";
// import { images } from "@/constants/images";
// import { fetchGames } from "@/services/api";
// import useFetch from "@/services/useFetch";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
// import { SearchBar } from "react-native-screens";

// const Search = () => {
//   const [searchQuery, setSearcQuery] = useState("");

//   const {
//     data: games,
//     loading,
//     error,
//     refetch: loadGames,
//     reset,
//   } = useFetch(
//     () =>
//       fetchGames({
//         query: searchQuery,
//       }),
//     false,
//   );

//   useEffect(() => {
//     const timeoutId = setTimeout(async () => {
//       if (searchQuery.trim()) {
//         await loadGames();
//       } else {
//         reset();
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [searchQuery, loadGames, reset]);

//   return (
//     <View className="flex-1 bg-background">
//       <FlatList
//         data={""}
//         renderItem={({ item }) => <GameCard {...item} />}
//         // keyExtractor={(item) => item.id.toString()}
//         className="px-5"
//         numColumns={3}
//         columnWrapperStyle={{
//           justifyContent: "center",
//           gap: 16,
//           marginVertical: 16,
//         }}
//         contentContainerStyle={{ paddingBottom: 100 }}
//         ListHeaderComponent={
//           <>
//             <View className="w-full flex-row justify-center mt-20">
//               <Image source={icons.logo} className="w-12 h-10" />
//             </View>

//             <View className="my-5">
//               <SearchBar
//                 placeholder="Search for games ..."
//                 // value={searchQuery}
//                 // onChangeText={(text: string) => setSearcQuery(text)}
//                 // onPress={() => {}}
//               />
//             </View>

//             {loading && (
//               <ActivityIndicator
//                 size="large"
//                 color="#0000ff"
//                 className="my-3"
//               />
//             )}

//             {error && (
//               <Text className="text-red-500 px-5 my-3">
//                 Error: {error.message}
//               </Text>
//             )}

//             {/* {!loading && !error && searchQuery.trim() && games?.lenght > 0 && (
//               <Text className="text-xl text-white font-bold">
//                 Search Results for{""}
//                 <Text className="text-accent">{searchQuery}</Text>
//               </Text>
//             )} */}
//           </>
//         }
//         ListEmptyComponent={
//           !loading && !error ? (
//             <View className="mt-10 px-5">
//               <Text className="text-center text-gray-500">
//                 {searchQuery.trim() ? "No games found" : "Search for a game"}
//               </Text>
//             </View>
//           ) : null
//         }
//       />
//     </View>
//   );
// };

// export default Search;
