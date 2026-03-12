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
        tabBarActiveTintColor: "#E9A6A6",
        tabBarInactiveTintColor: "#C8ADFF",

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 12,
        },

        tabBarStyle: {
          backgroundColor: "#372660",
          height: 90,
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <GamepadDirectional size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color }) => <Gamepad2 size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Headset size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
