/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from "react-native";
import * as THREE from "three";
import { useRouter } from "expo-router";
import GlitchText from "@/components/shared/GlitchText";

const { width, height } = Dimensions.get("window");
const FINAL_Y_POSITION = -(height / 2) + 75;

function HyperspeedBackground({ isVisible }: { isVisible: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 800;

  const pointsObject = useMemo(() => {
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
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    return new THREE.Points(geo, mat);
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

  if (!isVisible) return null;
  return <primitive object={pointsObject} ref={pointsRef} />;
}

export default function BootScreen() {
  const router = useRouter();
  const timeline = useRef(new Animated.Value(0)).current;
  const isNavigating = useRef(false);

  useEffect(() => {
    Animated.timing(timeline, {
      toValue: 100,
      duration: 6500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !isNavigating.current) {
        isNavigating.current = true;
        // @ts-ignore
        router.replace("/(main)");
      }
    });
  }, [timeline, router]);

  const handleSkipAnimation = () => {
    if (isNavigating.current) return;

    isNavigating.current = true;
    timeline.stopAnimation();

    // @ts-ignore
    router.replace("/(main)");
  };

  const canvasOpacity = timeline.interpolate({
    inputRange: [0, 49, 50],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const canvasShakeX = timeline.interpolate({
    inputRange: [40, 42, 44, 46, 48, 50],
    outputRange: [20, -20, 30, -30, 15, 0],
    extrapolate: "clamp",
  });

  const canvasShakeY = timeline.interpolate({
    inputRange: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    outputRange: [0, 10, -10, 8, -8, 15, -15, 5, -5, 10, 0],
    extrapolate: "clamp",
  });

  const canvasScale = timeline.interpolate({
    inputRange: [0, 40, 49, 50],
    outputRange: [1.2, 1.2, 1.4, 0.5],
    extrapolate: "clamp",
  });

  const glitchFlashOpacity = timeline.interpolate({
    inputRange: [
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 95, 96, 97, 98, 99, 100,
    ],
    outputRange: [0, 0.8, 0, 1, 0, 0.9, 0, 1, 0, 1, 0, 0, 0.8, 0, 0.9, 0, 0],
    extrapolate: "clamp",
  });

  const textOpacity = timeline.interpolate({
    inputRange: [50, 52, 94, 95, 96, 97, 98, 99, 100],
    outputRange: [0, 1, 1, 0.2, 1, 0.4, 1, 0.1, 1],
    extrapolate: "clamp",
  });

  const finalLogoShakeX = timeline.interpolate({
    inputRange: [0, 94, 95, 96, 97, 98, 99, 100],
    outputRange: [0, 0, 15, -15, 10, -10, 5, 0],
    extrapolate: "clamp",
  });

  const textTranslateY = timeline.interpolate({
    inputRange: [58, 65, 72, 78, 82, 85, 87, 88, 90],
    outputRange: [
      0,
      FINAL_Y_POSITION * 0.3,
      FINAL_Y_POSITION * 0.6,
      FINAL_Y_POSITION * 0.8,
      FINAL_Y_POSITION * 0.9,
      FINAL_Y_POSITION * 0.95,
      FINAL_Y_POSITION * 0.98,
      FINAL_Y_POSITION * 0.99,
      FINAL_Y_POSITION,
    ],
    extrapolate: "clamp",
  });

  return (
    <Pressable style={styles.container} onPress={handleSkipAnimation}>
      <Animated.View
        style={[
          styles.canvasContainer,
          {
            opacity: canvasOpacity,
            transform: [
              { translateX: canvasShakeX },
              { translateY: canvasShakeY },
              { scale: canvasScale },
            ],
          },
        ]}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={styles.canvas}>
          <HyperspeedBackground isVisible={true} />
        </Canvas>
      </Animated.View>

      <Animated.View
        style={[styles.glitchOverlay, { opacity: glitchFlashOpacity }]}
      />

      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textOpacity,
            transform: [
              { translateY: textTranslateY },
              { translateX: finalLogoShakeX },
            ],
          },
        ]}
      >
        <GlitchText text="GlitchLog" fontSize={48} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  canvasContainer: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "#2c225a",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: "100%",
    height: "100%",
  },
  glitchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
