import { useFonts } from "expo-font";
import "@/utils/config/i18n";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import "./globals.css";

const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] &&
    typeof args[0] === "string" &&
    args[0].includes("Multiple instances of Three.js")
  ) {
    return;
  }
  originalWarn(...args);
};

LogBox.ignoreLogs(["WARNING: Multiple instances of Three.js being imported"]);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // @ts-ignore
    Neotriad: require("../assets/fonts/Neotriad.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#2c225a" }}>
      <SafeAreaProvider style={{ backgroundColor: "#2c225a" }}>
        <StatusBar hidden={true} />

        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: "#2c225a" },
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ animation: "none" }} />
          <Stack.Screen
            name="(main)"
            options={{ animation: "fade", animationDuration: 1000 }}
          />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="games/[id]" />
          <Stack.Screen name="reviews/[id]" />
          <Stack.Screen name="reviews/new" />
          <Stack.Screen name="lists/new" />
          <Stack.Screen name="lists/[id]" />
          <Stack.Screen name="lists/edit/[id]" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
