import { Canvas, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import * as THREE from "three";
import { useRouter } from "expo-router";

// --- 1. COMPONENTE 3D LIMPO ---
function HyperspeedBackground({ isVisible }: { isVisible: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
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
      if (positions[i * 3 + 2] > 5) positions[i * 3 + 2] = -50;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!isVisible) return null; // Destrói o 3D imediatamente

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      {/* @ts-ignore */}
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} />
    </points>
  );
}

// --- 2. A TELA INICIAL (ROTA) ---
export default function BootScreen() {
  const router = useRouter();
  const [show3D, setShow3D] = useState(true);

  const pulseScaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const pulseAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // 1. Cria e inicia a animação de Pulso da Logo
    pulseAnimRef.current = Animated.loop(
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
    );
    pulseAnimRef.current.start();

    // 2. TEMPORIZADOR DO BOOT (3 Segundos)
    const timer = setTimeout(() => {
      setShow3D(false); // Mata o Canvas 3D

      if (pulseAnimRef.current) {
        pulseAnimRef.current.stop(); // Para o pulso
      }

      // 3. Faz a animação de explosão e some com a tela
      Animated.parallel([
        Animated.timing(pulseScaleAnim, {
          toValue: 25,
          duration: 1000,
          easing: Easing.back(1.5),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // CORREÇÃO DA ROTA: 'as any' silencia o TypeScript chato do Expo Router
        router.replace("/(main)" as any);
      });
    }, 3000);

    // Limpeza de segurança
    return () => {
      clearTimeout(timer);
      if (pulseAnimRef.current) pulseAnimRef.current.stop();
    };
  }, [pulseScaleAnim, opacityAnim, router]);

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
      {show3D && (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={styles.canvas}>
          <HyperspeedBackground isVisible={show3D} />
        </Canvas>
      )}

      <View style={styles.logoContainer}>
        <Animated.Image
          source={require("@/assets/icons/logo.png")}
          style={[styles.logo, { transform: [{ scale: pulseScaleAnim }] }]}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
}

// ATENÇÃO AQUI: Garanta que você está copiando até a última linha!
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2c225a" },
  canvas: { ...StyleSheet.absoluteFillObject },
  logoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { width: 200, height: 200 },
});
