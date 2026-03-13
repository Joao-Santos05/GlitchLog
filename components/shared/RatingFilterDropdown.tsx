import React, { useRef } from "react";
import { PanResponder, Text, TouchableOpacity, View } from "react-native";
import StarRating from "./StarRating";

interface RatingFilterDropdownProps {
  activeLabel: string;
  rating: number;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (rating: number) => void;
}

export default function RatingFilterDropdown({
  activeLabel,
  rating,
  isOpen,
  onToggle,
  onChange,
}: RatingFilterDropdownProps) {
  const containerWidth = 140;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => handleTouch(evt.nativeEvent.locationX),
      onPanResponderMove: (evt) => handleTouch(evt.nativeEvent.locationX),
    }),
  ).current;

  const handleTouch = (x: number) => {
    let newRating = (x / containerWidth) * 5;

    newRating = Math.max(0, Math.min(5, newRating));

    newRating = Math.round(newRating * 2) / 2;

    onChange(newRating);
  };

  return (
    <View className="relative z-50">
      <TouchableOpacity onPress={onToggle}>
        <Text className="text-[#A499C9] text-xs font-bold uppercase">
          {activeLabel} ▾
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View className="absolute top-6 right-0 bg-[#2D214F] border border-[#4A3F75] rounded-md py-3 px-4 shadow-lg flex-row items-center w-56 justify-between">
          <View
            {...panResponder.panHandlers}
            style={{
              width: containerWidth,
              height: 30,
              justifyContent: "center",
            }}
          >
            <View pointerEvents="none" className="flex-row">
              <StarRating rating={rating} size={24} />
            </View>
          </View>

          <Text className="text-white font-bold text-lg w-10 text-right">
            {rating.toFixed(1)}
          </Text>
        </View>
      )}
    </View>
  );
}
