import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface GlitchTextProps {
  text: string;
  fontSize?: number;
}

export default function GlitchText({ text, fontSize = 40 }: GlitchTextProps) {
  // Estado para controlar a "tremida" do glitch
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Esse intervalo simula os keyframes do CSS, rodando a cada 50ms
    const interval = setInterval(() => {
      setOffset({
        x: (Math.random() - 0.5) * 6, // Tremida horizontal (entre -3 e 3)
        y: (Math.random() - 0.5) * 2, // Tremida vertical (entre -1 e 1)
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    // 1. box-none na View principal: "Deixe o dedo passar pelo espaço vazio"
    <View
      className="relative items-center justify-center"
      pointerEvents="box-none"
    >
      {/* 1ª Camada: Sombra Ciano (Fundo) */}
      <Text
        pointerEvents="none" // 2. none nas letras: "Deixe o dedo passar pelas letras"
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

      {/* 2ª Camada: Sombra Vermelha (Fundo) */}
      <Text
        pointerEvents="none" // <-- Aqui também!
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

      {/* 3ª Camada: Texto Branco Principal (Frente) */}
      <Text
        pointerEvents="none" // <-- E aqui também!
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
