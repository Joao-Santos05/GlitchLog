import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleProp, TouchableOpacity, ViewStyle } from "react-native";

interface ProfilePictureProps {
  url?: string;
  size?: number;
  userId?: string | number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export default function ProfilePicture({
  url,
  size = 40,
  userId,
  onPress,
  style,
  disabled = false,
}: ProfilePictureProps) {
  const router = useRouter();

  const handlePress = (e: any) => {
    e.stopPropagation();

    if (onPress) {
      onPress();
    } else if (userId) {
      router.push(`/profile/${userId}` as any);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || (!onPress && !userId)}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#4A3F75",
        },
        style,
      ]}
    >
      <Image
        source={{ uri: url || "https://i.pravatar.cc/150" }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}
