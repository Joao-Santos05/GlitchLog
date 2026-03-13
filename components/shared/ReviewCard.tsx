import { Link } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Review } from "../../types";
import StarRating from "./StarRating"; // Seu componente de estrelas!

interface Props {
  review: Review;
  showGameCover?: boolean;
}

export default function ReviewCard({ review, showGameCover = true }: Props) {
  return (
    <Link href={`/reviews/${review.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-[#402c64] rounded-xl p-4 mb-4 flex-row"
      >
        <View className="flex-1 pr-4">
          <View className="flex-row items-center mb-2">
            <Image
              source={{ uri: review.reviewer.avatarUrl }}
              className="w-8 h-8 rounded-full mr-3"
            />
            <View>
              <Text className="text-white text-sm font-bold">
                {review.game.title}{" "}
                <Text className="text-gray-400 text-xs font-normal">
                  {review.game.year}
                </Text>
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-gray-400 text-xs mr-2">
                  Review by{" "}
                  <Text className="text-white font-bold">
                    {review.reviewer.name}
                  </Text>
                </Text>

                <View className="flex-row mr-2">
                  {/* CORREÇÃO AQUI: Usando a nota da review */}
                  <StarRating rating={review.stars || 0} size={10} />
                </View>

                <MessageCircle size={10} color="#9CA3AF" />
                <Text className="text-gray-400 text-[10px] ml-1">
                  {review.comments}
                </Text>
              </View>
            </View>
          </View>
          <Text className="text-gray-300 text-xs leading-5" numberOfLines={4}>
            {review.content}
          </Text>

          <View className="mt-2">
            <Text className="text-[#C8ADFF] text-xs">Read more ›</Text>
          </View>
        </View>

        {showGameCover && (
          <Image
            source={{ uri: review.game.coverUrl }} // Se atualizou sua interface Game, talvez precise mudar para review.game.poster_path
            className="w-20 h-28 rounded-md"
          />
        )}
      </TouchableOpacity>
    </Link>
  );
}
