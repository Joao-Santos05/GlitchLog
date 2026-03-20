import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface GlitchTextProps {
  text: string;
  fontSize?: number;
}

export default function GlitchText({ text, fontSize = 38 }: GlitchTextProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 2,
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      className="relative items-center justify-center"
      pointerEvents="box-none"
    >
      <Text
        pointerEvents="none"
        style={{
          fontSize,
          fontFamily: "Neotriad",
          position: "absolute",
          color: "white",
          opacity: 0.8,
          textShadowColor: "#00ffff",
          textShadowOffset: { width: -2 + offset.x, height: offset.y },
          textShadowRadius: 1,
          zIndex: 1,
        }}
      >
        {text}
      </Text>

      <Text
        pointerEvents="none"
        style={{
          fontSize,
          fontFamily: "Neotriad",
          position: "absolute",
          color: "white",
          opacity: 0.8,
          textShadowColor: "#ff0000",
          textShadowOffset: { width: 2 - offset.x, height: -offset.y },
          textShadowRadius: 1,
          zIndex: 2,
        }}
      >
        {text}
      </Text>

      <Text
        pointerEvents="none"
        style={{
          fontSize,
          fontFamily: "Neotriad",
          color: "white",
          zIndex: 3,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
