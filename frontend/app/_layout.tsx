import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar hidden={true} />
        {/* Apenas carrega as rotas! Sem views flutuantes invisíveis. */}
        <Stack>
          {/* index é a nossa nova tela de Loading */}
          <Stack.Screen
            name="index"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="(main)"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="games/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="reviews/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="reviews/new" options={{ headerShown: false }} />
          <Stack.Screen name="lists/new" options={{ headerShown: false }} />
          <Stack.Screen name="lists/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="lists/edit/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
