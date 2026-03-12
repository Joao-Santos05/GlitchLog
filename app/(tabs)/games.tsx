import { useRouter } from "expo-router";
import { Heart, Star } from "lucide-react-native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const MOCK_GAMES = [
  {
    id: "1",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+1",
    rating: 4,
    liked: true,
  },
  {
    id: "2",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+2",
    rating: 5,
    liked: false,
  },
  {
    id: "3",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+3",
    rating: 3,
    liked: true,
  },
  {
    id: "4",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+4",
    rating: 4,
    liked: false,
  },
  {
    id: "5",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+5",
    rating: 5,
    liked: true,
  },
  {
    id: "6",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+6",
    rating: 2,
    liked: false,
  },
  {
    id: "7",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+7",
    rating: 4,
    liked: true,
  },
  {
    id: "8",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+8",
    rating: 5,
    liked: false,
  },
  {
    id: "9",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+9",
    rating: 3,
    liked: true,
  },
  {
    id: "10",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+10",
    rating: 5,
    liked: true,
  },
  {
    id: "11",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+11",
    rating: 4,
    liked: false,
  },
  {
    id: "12",
    coverUrl: "https://via.placeholder.com/150x200/2D3748/FFFFFF?text=Game+12",
    rating: 3,
    liked: false,
  },
];

export default function GamesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <View className="px-6 pt-16 pb-4 flex-row items-center justify-between border-b border-dark-300">
        <Text className="text-white text-sm font-bold tracking-widest">
          GAMES
        </Text>
        <View className="flex-row gap-4">
          <Text className="text-[#A499C9] text-xs">RATING ▾</Text>
          <Text className="text-[#A499C9] text-xs">GENRE ▾</Text>
        </View>
      </View>

      <FlatList
        data={MOCK_GAMES}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 20,
        }}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-[31%]"
            onPress={() => router.push(`/games/${item.id}`)}
          >
            <Image
              source={{ uri: item.coverUrl }}
              className="w-full aspect-[2/3] rounded-md border border-light-100"
            />
            <View className="flex-row items-center justify-between mt-1.5 px-0.5">
              <View className="flex-row">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    color={i < item.rating ? "#FF8A65" : "#4A3F75"}
                    fill={i < item.rating ? "#FF8A65" : "transparent"}
                  />
                ))}
              </View>
              {item.liked && <Heart size={10} color="#FF8A65" fill="#FF8A65" />}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
