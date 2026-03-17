import { router } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Review } from "../../types";
import StarRating from "./StarRating";

interface Props {
  review: Review;
  showGameCover?: boolean;
}

export default function ReviewCard({ review, showGameCover = true }: Props) {
  return (
    <TouchableOpacity
      key={review.id}
      className="bg-[#2D214F] rounded-xl p-4 mb-4 flex-row border border-[#4A3F75]/50"
      onPress={() => router.push(`/reviews/${review.id}`)}
    >
      <View className="flex-1 mr-3">
        <View className="flex-row items-center mb-2">
          <Image
            source={{ uri: review.reviewer.avatarUrl }}
            className="w-8 h-8 rounded-full mr-2"
          />
          <View>
            <Text className="text-white font-bold text-sm leading-tight">
              {review.game.title}{" "}
              <Text className="text-[#A499C9] text-xs font-normal">
                {review.game.year}
              </Text>
            </Text>
            <View className="flex-row items-center">
              <Text className="text-[#A499C9] text-[10px] mr-1">
                Review by {review.reviewer.name}
              </Text>
              <StarRating rating={review.stars} size={8} />
              <MessageCircle
                size={10}
                color="#A499C9"
                className="ml-2 mr-0.5"
              />
              <Text className="text-[#A499C9] text-[10px]">
                {review.comments}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-light-200 text-xs leading-4" numberOfLines={5}>
          {review.content}
        </Text>
      </View>
      <Image
        source={{ uri: review.game.coverUrl }}
        className="w-16 h-24 rounded-md border border-[#4A3F75]"
      />
    </TouchableOpacity>
  );
}
