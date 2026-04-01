import { router } from "expo-router";
import { Heart, MessageCircle } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import StarRating from "./StarRating";
import ProfilePicture from "./ProfilePicture";
import { Review } from "@/interfaces/interfaces";

interface Props {
  review: Review;
  showGameCover?: boolean;
}

export default function ReviewCard({ review, showGameCover = true }: Props) {
  return (
    <TouchableOpacity
      key={review.id}
      className="bg-background rounded-xl p-4 mb-4 flex-row items-center border border-[#4A3F75]/50"
      onPress={() => router.push(`/reviews/${review.id}` as any)}
    >
      <View className="flex-1 mr-6">
        <View className="flex-row items-center mb-2">
          <ProfilePicture
            url={review.reviewer.avatarUrl}
            size={32}
            userId={review.reviewer.id}
            style={{ marginRight: 8 }}
          />

          <View>
            <Text className="text-white font-bold text-sm leading-tight">
              {review.game.title}{" "}
              <Text className="text-white text-xs font-normal">
                {review.game.year}
              </Text>
            </Text>
            <View className="flex-row items-center">
              <Text className="text-white text-[10px] mr-1">
                {review.reviewer.name}
              </Text>
            </View>
            <View className="flex-row items-center pt-1">
              <StarRating rating={review.stars} size={9} />
            </View>
          </View>
        </View>

        <Text className="text-white text-xs leading-4" numberOfLines={5}>
          {review.content}
        </Text>

        <View className="flex-row items-center pt-2 gap-2">
          <Heart color={"red"} fill={"red"} size={9} />
          <Text className="text-light-200 text-[10px]">{review.likes}</Text>
          <MessageCircle size={10} color="#C8ADFF" className="ml-2 mr-0.5" />
          <Text className="text-light-200 text-[10px]">{review.comments}</Text>
        </View>
      </View>

      {showGameCover && (
        <Image
          source={{ uri: review.game.coverUrl }}
          className="w-20 h-32 rounded-md border border-[#4A3F75]"
        />
      )}
    </TouchableOpacity>
  );
}
