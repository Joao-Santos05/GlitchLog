import { Star, StarHalf } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface StarRatingProps {
  rating: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export default function StarRating({
  rating,
  size = 10,
  activeColor = "#ff8945",
  inactiveColor = "#C8ADFF",
}: StarRatingProps) {
  const safeRating = Math.round((rating || 0) * 2) / 2;

  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((index) => {
        const isFull = safeRating >= index;
        const isHalf = !isFull && safeRating >= index - 0.5;

        return (
          <View key={index} style={{ position: "relative" }} className="mr-0.5">
            <Star size={size} color={inactiveColor} fill="transparent" />

            {isFull && (
              <View style={{ position: "absolute" }}>
                <Star size={size} color={activeColor} fill={activeColor} />
              </View>
            )}

            {isHalf && (
              <View style={{ position: "absolute" }}>
                <StarHalf size={size} color={activeColor} fill={activeColor} />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
