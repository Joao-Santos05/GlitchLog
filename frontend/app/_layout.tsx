// import { useFonts } from "expo-font";
import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
import "./globals.css";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   Neotriad: require("../assets/fonts/Neotriad.otf"),
  // });

  // useEffect(() => {
  //   if (error) {
  //     console.error("font error", error);
  //   }
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }

  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="games/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="reviews/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="reviews/new" options={{ headerShown: false }} />
        <Stack.Screen name="lists/new" options={{ headerShown: false }} />
        <Stack.Screen name="lists/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="lists/edit/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
