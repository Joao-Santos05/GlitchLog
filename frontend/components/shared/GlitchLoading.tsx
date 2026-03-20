// components/GlitchLoadingScreen.tsx
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import * as THREE from "three";

// --------------------------------------------------------
// 1. COMPONENTE DO FUNDO: Hyperspeed (Túnel de Luzes) - SEM WARNS!
// --------------------------------------------------------
function HyperspeedBackground({ isVisible }: { isVisible: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Animação nativa para desvanecer o fundo 3D também
  const backgroundOpacityAnim = useRef(new Animated.Value(0.8)).current;

  const particlesCount = 400;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const col = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color("#ff8945");
    const color2 = new THREE.Color("#C8ADFF");

    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 1.0) * 50;

      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3 + 2] += delta * 40;
      if (positions[i * 3 + 2] > 5) {
        positions[i * 3 + 2] = -50;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Escuta isVisible para sumir com o fundo 3D
  useEffect(() => {
    if (!isVisible) {
      Animated.timing(backgroundOpacityAnim, {
        toValue: 0,
        duration: 1200, // Um pouco mais lento que a logo
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, backgroundOpacityAnim]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* CORRIGIDO: Passando argumentos nativos como array de args */}
        {/* @ts-ignore */}
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          args={[positions, 3]}
        />
        {/* @ts-ignore */}
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          args={[colors, 3]}
        />
      </bufferGeometry>
      {/* CORRIGIDO: Removido o warn de vertexColors */}
      {/* @ts-ignore */}
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} />
    </points>
  );
}

// --------------------------------------------------------
// 2. O ENVELOPE FINAL COM A LOGO FLUTUANTE E EXPANSÃO
// --------------------------------------------------------
export default function GlitchLoadingScreen({
  isVisible,
}: {
  isVisible: boolean;
}) {
  // Animação de PULSO (Respiração) da logo
  const pulseScaleAnim = useRef(new Animated.Value(0.85)).current;

  // Animação de SUMIR toda a tela de loading
  const containerOpacityAnim = useRef(new Animated.Value(1)).current;

  // A Lógica do Pulso
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScaleAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseScaleAnim, {
          toValue: 0.85,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseScaleAnim]);

  // A MÁGICA: Escuta a mudança de 'isVisible' para EXPANDIR A LOGO E SUMIR
  useEffect(() => {
    // Se isVisible for false, a logo se expande e o túnel some!
    if (!isVisible) {
      // Para o loop de pulso atual imediatamente
      pulseScaleAnim.stopAnimation();

      Animated.parallel([
        // 1. Expande a logo para um tamanho gigante (Zunindo na tela)
        Animated.timing(pulseScaleAnim, {
          toValue: 25, // GIGANTE!
          duration: 1200, // Expansão rápida
          easing: Easing.back(1.5), // Dá um pequeno impulso antes de explodir
          useNativeDriver: true,
        }),
        // 2. Desvanece toda a tela de loading
        Animated.timing(containerOpacityAnim, {
          toValue: 0,
          duration: 1000, // Sumir rápido para revelar o app
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, pulseScaleAnim, containerOpacityAnim]);

  return (
    // Aplicamos a animação de Opacidade e forçamos o pointerEvents
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: "#2c225a", opacity: containerOpacityAnim },
      ]}
      pointerEvents="none"
    >
      {/* A GRANDE SACADA: O Canvas agora é condicional! 
          Quando isVisible vira false (hora de expandir), o Canvas é destruído 
          instantaneamente da memória. Ele não tem mais como roubar cliques! */}
      {isVisible && (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={styles.canvas}>
          <HyperspeedBackground isVisible={isVisible} />
        </Canvas>
      )}

      {/* CAMADA DE FRENTE: A Logo pulsando e Expandindo (Ela continua viva e animando!) */}
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require("@/assets/icons/logo.png")}
          style={[
            styles.logo,
            {
              transform: [{ scale: pulseScaleAnim }],
            },
          ]}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  canvas: {
    ...StyleSheet.absoluteFillObject, // Túnel preenche tudo
  },
  logoContainer: {
    ...StyleSheet.absoluteFillObject, // Sobrepõe o 3D
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
