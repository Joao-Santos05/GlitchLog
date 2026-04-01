import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import GlitchText from "@/components/shared/GlitchText";
import { Bookmark, Heart, Sparkles } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("screen").height;
const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;
const SWIPE_OUT_DURATION = 250;

const MOCK_DISCOVERY_GAMES = [
  {
    id: 1,
    title: "Shadows of the City",
    poster_path: "https://via.placeholder.com/400x600/1A133A/FFFFFF",
    genres: ["Cyberpunk", "Action RPG"],
  },
  {
    id: 2,
    title: "Possum Springs",
    poster_path: "https://via.placeholder.com/400x600/2D214F/FFFFFF",
    genres: ["Adventure", "Story-Rich"],
  },
  {
    id: 3,
    title: "Galactic Frontier",
    poster_path: "https://via.placeholder.com/400x600/4A3F75/FFFFFF",
    genres: ["Sci-Fi", "Strategy"],
  },
];

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const [games, setGames] = useState(MOCK_DISCOVERY_GAMES);
  const position = useRef(new Animated.ValueXY()).current;
  const toastAnim = useRef(new Animated.Value(0)).current;

  const showWishlistToast = () => {
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const forceSwipe = (direction: "right" | "left" | "down") => {
    let x = 0;
    let y = 0;

    if (direction === "right") x = width * 1.5;
    else if (direction === "left") x = -width * 1.5;
    else if (direction === "down") y = height * 1.5;

    Animated.timing(position, {
      toValue: { x, y },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: "right" | "left" | "down") => {
    if (direction === "down") {
      showWishlistToast();
    }
    position.setValue({ x: 0, y: 0 });
    setGames((prevGames) => prevGames.slice(1));
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else if (
          gesture.dy > SWIPE_THRESHOLD &&
          Math.abs(gesture.dx) < SWIPE_THRESHOLD - 40
        ) {
          forceSwipe("down");
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const topCardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate: rotate },
    ],
  };

  // VERMELHO (ESQUERDA)
  const redOpacity = position.x.interpolate({
    inputRange: [-width / 2, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const redBorderWidth = position.x.interpolate({
    inputRange: [-width / 2, 0],
    outputRange: [25, 0],
    extrapolate: "clamp",
  });
  const redGlow = position.x.interpolate({
    inputRange: [-width / 2, 0],
    outputRange: [50, 0],
    extrapolate: "clamp",
  });

  // VERDE (DIREITA)
  const greenOpacity = position.x.interpolate({
    inputRange: [0, width / 2],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const greenBorderWidth = position.x.interpolate({
    inputRange: [0, width / 2],
    outputRange: [0, 25],
    extrapolate: "clamp",
  });
  const greenGlow = position.x.interpolate({
    inputRange: [0, width / 2],
    outputRange: [0, 50],
    extrapolate: "clamp",
  });

  // LARANJA (BAIXO - WISHLIST)
  const orangeOpacity = position.y.interpolate({
    inputRange: [0, height / 3],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const orangeBorderWidth = position.y.interpolate({
    inputRange: [0, height / 3],
    outputRange: [0, 25],
    extrapolate: "clamp",
  });
  const orangeGlow = position.y.interpolate({
    inputRange: [0, height / 3],
    outputRange: [0, 50],
    extrapolate: "clamp",
  });

  const renderCards = () => {
    return games
      .map((game, index) => {
        if (index === 0) {
          return (
            <Animated.View
              key={game.id}
              style={[
                topCardStyle,
                {
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  zIndex: 100,
                },
              ]}
              {...panResponder.panHandlers}
            >
              <View className="w-full h-full rounded-3xl overflow-hidden bg-[#1A133A] border border-[#4A3F75]">
                <Image
                  source={{ uri: game.poster_path }}
                  className="w-full flex-1"
                  resizeMode="cover"
                />
                <View className="p-6 bg-[#1A133A]">
                  <Text className="text-white text-2xl font-bold mb-1">
                    {game.title}
                  </Text>
                  <Text className="text-[#C8ADFF] font-medium uppercase tracking-wider text-[10px]">
                    {game.genres.join(" • ")}
                  </Text>
                </View>
              </View>
            </Animated.View>
          );
        }

        if (index === 1) {
          return (
            <Animated.View
              key={game.id}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: -index,
                transform: [{ scale: 0.97 }],
                opacity: 0.6,
              }}
            >
              <View className="w-full h-full rounded-3xl overflow-hidden bg-[#1A133A] border border-[#4A3F75]">
                <Image
                  source={{ uri: game.poster_path }}
                  className="w-full flex-1"
                  resizeMode="cover"
                />
                <View className="p-6 bg-[#1A133A]">
                  <Text className="text-white text-2xl font-bold mb-1">
                    {game.title}
                  </Text>
                  <Text className="text-[#C8ADFF] font-medium uppercase tracking-wider text-[10px]">
                    {game.genres.join(" • ")}
                  </Text>
                </View>
              </View>
            </Animated.View>
          );
        }

        return null;
      })
      .reverse();
  };

  return (
    <View className="flex-1 bg-background relative overflow-hidden">
      <Animated.View
        pointerEvents="none"
        style={{
          opacity: redOpacity,
          position: "absolute",
          top: -insets.top,
          left: 0,
          right: 0,
          height: screenHeight,
          borderWidth: redBorderWidth,
          borderColor: "#ef4444",
          shadowColor: "#ef4444",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: redGlow,
          elevation: 25,
          zIndex: 9999,
        }}
      />

      <Animated.View
        pointerEvents="none"
        style={{
          opacity: greenOpacity,
          position: "absolute",
          top: -insets.top,
          left: 0,
          right: 0,
          height: screenHeight,
          borderWidth: greenBorderWidth,
          borderColor: "#10B981",
          shadowColor: "#10B981",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: greenGlow,
          elevation: 25,
          zIndex: 9999,
        }}
      />

      <Animated.View
        pointerEvents="none"
        style={{
          opacity: orangeOpacity,
          position: "absolute",
          top: -insets.top,
          left: 0,
          right: 0,
          height: screenHeight,
          borderWidth: orangeBorderWidth,
          borderColor: "#ff8945",
          shadowColor: "#ff8945",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: orangeGlow,
          elevation: 25,
          zIndex: 9999,
        }}
      />

      {/* HEADER FIXO */}
      <View
        className="flex items-center justify-center border-b border-dark-300 z-20 bg-background/90"
        style={{ paddingTop: Math.max(insets.top, 20) + 16, paddingBottom: 24 }}
      >
        <DrawerMenuButton />
        <GlitchText text="Discover" fontSize={48} />
      </View>

      {/* MENSAGEM DE FIM DOS CARDS E ÁREA DO CARD */}
      <View
        className="flex-1 px-5 z-10 w-full"
        style={{ marginTop: 24, marginBottom: 24 }}
      >
        {games.length === 0 && (
          <View className="absolute inset-0 items-center justify-center z-0">
            <Sparkles size={48} color="#C8ADFF" />
            <Text className="text-white text-xl font-bold mt-4">
              {"{You're all caught up!}"}
            </Text>
            <Text className="text-[#A499C9] text-center mt-2 px-10">
              We are looking for more games to recommend based on your tastes.
            </Text>
          </View>
        )}

        <View className="w-full h-full relative z-10">{renderCards()}</View>
      </View>

      {/* TOAST DE WISHLIST */}
      <Animated.View
        className="absolute w-full items-center z-50 px-5"
        style={[
          { top: insets.top + 100 },
          {
            transform: [
              {
                translateY: toastAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View className="bg-[#1A133A] border border-[#ff8945] px-6 py-3 rounded-full flex-row items-center shadow-lg shadow-orange-500/30">
          <Bookmark size={18} color="#ff8945" fill="#ff8945" />
          <Text className="text-white font-bold ml-2 text-sm">
            Added to Wishlist
          </Text>
        </View>
      </Animated.View>

      {/* BOTÕES DE AÇÃO INFERIORES */}
      <View className="w-full flex-row px-4 items-center justify-between z-40 pb-6">
        {/* F Key Keycap */}
        <View className="flex-1 items-center">
          <View className="bg-[#111019] border border-[#ef444440] w-14 h-14 rounded-full justify-center items-center shadow-lg shadow-red-500/20">
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#0c0b11",
                borderRadius: 6,
                borderWidth: 1,
                borderColor: "#ef444480",
                elevation: 3,
                shadowColor: "#ef4444",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#ef4444", fontSize: 16, fontWeight: "bold" }}
              >
                F
              </Text>
            </View>
          </View>
          <Text className="text-[#ef4444] text-[8px] font-bold mt-1 uppercase tracking-wider">
            F
          </Text>
        </View>

        {/* Wishlist */}
        <View className="flex-1 items-center">
          <View className="bg-[#1A133A] border border-[#ff8945]/50 w-24 h-14 rounded-full justify-center items-center">
            <Bookmark size={20} color="#ff8945" />
          </View>
          <Text className="text-[#ff8945] text-[8px] font-bold mt-1 uppercase tracking-wider">
            Wishlist
          </Text>
        </View>

        {/* Interested */}
        <View className="flex-1 items-center">
          <View className="bg-[#111019] border border-[#10B98140] w-14 h-14 rounded-full justify-center items-center shadow-lg shadow-green-500/20">
            <Heart size={20} color="#10B981" />
          </View>
          <Text className="text-[#10B981] text-[8px] font-bold mt-1 uppercase tracking-wider">
            Interested
          </Text>
        </View>
      </View>
    </View>
  );
}
