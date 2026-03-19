import { Tabs } from "expo-router";
import {
  Gamepad2,
  GamepadDirectional,
  Headset,
  Search,
} from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff8945",
        tabBarInactiveTintColor: "#C8ADFF",
        sceneStyle: {
          backgroundColor: "#2c225a",
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 22,
        },

        tabBarStyle: {
          backgroundColor: "#2c225a",
          height: 90,
          position: "absolute",
          borderTopWidth: 0.5,
          borderTopColor: "#5b4967",
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <GamepadDirectional size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Gamepad2 size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Headset size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen name="likes" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="diary" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="lists" options={{ href: null, headerShown: false }} />
      <Tabs.Screen
        name="wishlist"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="reviews"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="settings"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="manageaccount"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="privacysecurity"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="language"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="helpcenter"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen name="tos" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}
