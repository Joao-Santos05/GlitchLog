import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./globals.css";

export default function RootLayout() {
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
