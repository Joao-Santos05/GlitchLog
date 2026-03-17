import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router"; // <-- Importe o usePathname aqui
import { Drawer } from "expo-router/drawer";
import {
  Bell,
  BookOpenCheck,
  Calendar,
  Heart,
  LibraryBig,
  ListFilterIcon,
  LogOutIcon,
  User2,
} from "lucide-react-native";
import { Alert, Image, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const handleLogout = () => {
  Alert.alert("Logout", "Are you sure?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Exit",
      style: "destructive",
      onPress: () => {
        console.log("User Logged Out");
      },
    },
  ]);
};

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname(); // <-- Pega a rota que está aberta no momento

  // Coloque aqui o Hexadecimal exato do seu bg-light-400
  const LIGHT_400_HEX = "#5A4FCF";

  return (
    <View className="flex-1 bg-[#2C225A]">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <View className="px-5 mt-6">
          <View className="flex-row items-center">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=11" }}
              className="size-16 rounded-full"
            />
            <View className="ml-4 flex-col">
              <Text className="text-white text-xl font-bold">David</Text>
              <Text className="text-[#A499C9] text-sm mt-0.5">@david_dvd</Text>
            </View>
          </View>

          <View className="flex-row mt-6 gap-x-3">
            <View className="bg-light-400 rounded-full px-4 py-2">
              <Text className="text-white text-xs font-semibold">
                500 Followers
              </Text>
            </View>
            <View className="bg-light-400 rounded-full px-4 py-2">
              <Text className="text-white text-xs font-semibold">
                420 Followings
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-7 px-2">
          <DrawerItem
            label="Profile"
            icon={({ color }) => <User2 size={20} color={color} />}
            inactiveTintColor="#A499C9"
            activeTintColor="#FFFFFF"
            activeBackgroundColor={LIGHT_400_HEX}
            focused={pathname === "/profile"}
            onPress={() => router.push("/profile")}
            style={{ borderRadius: 100 }} // Deixa o fundo redondo igual uma pílula!
          />
          <DrawerItem
            label="Notifications"
            icon={({ color }) => <Bell size={20} color={color} />}
            inactiveTintColor="#A499C9"
            activeTintColor="#FFFFFF"
            activeBackgroundColor={LIGHT_400_HEX}
            focused={pathname === "/notifications"}
            onPress={() => router.push("/notifications")}
            style={{ borderRadius: 100 }}
          />
          <DrawerItem
            label="Diary"
            icon={({ color }) => <Calendar size={20} color={color} />}
            inactiveTintColor="#A499C9"
            activeTintColor="#FFFFFF"
            activeBackgroundColor={LIGHT_400_HEX}
            focused={pathname === "/diary"}
            onPress={() => router.push("/diary")}
            style={{ borderRadius: 100 }}
          />
          <DrawerItem
            label="Reviews"
            icon={({ color }) => <BookOpenCheck size={20} color={color} />}
            inactiveTintColor="#A499C9"
            activeTintColor="#FFFFFF"
            activeBackgroundColor={LIGHT_400_HEX}
            focused={pathname === "/reviews"}
            onPress={() => router.push("/reviews")}
            style={{ borderRadius: 100 }}
          />
          <DrawerItem
            label="Lists"
            icon={({ color }) => <ListFilterIcon size={20} color={color} />}
            inactiveTintColor="#A499C9"
            activeTintColor="#FFFFFF"
            activeBackgroundColor={LIGHT_400_HEX}
            focused={pathname === "/lists"}
            onPress={() => router.push("/lists")}
            style={{ borderRadius: 100 }}
          />
          <DrawerItem
            label="Wishlist"
            icon={({ color }) => <LibraryBig size={20} color={color} />}
            inactiveTintColor="#A499C9"
            activeTintColor="#FFFFFF"
            activeBackgroundColor={LIGHT_400_HEX}
            focused={pathname === "/wishlist"}
            onPress={() => router.push("/wishlist")}
            style={{ borderRadius: 100 }}
          />
          <DrawerItem
            label="Likes"
            icon={({ color }) => <Heart size={20} color={color} />}
            inactiveTintColor="#A499C9"
            activeTintColor="#FFFFFF"
            activeBackgroundColor={LIGHT_400_HEX}
            focused={pathname === "/likes"}
            onPress={() => router.push("/likes")}
            style={{ borderRadius: 100 }}
          />

          <DrawerItem
            label="Logout"
            icon={({ color }) => <LogOutIcon size={20} color={color} />}
            onPress={handleLogout}
            inactiveTintColor="#A499C9"
            style={{
              borderRadius: 100,
              marginTop: 20,
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

export default function MainLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#2C225A",
            width: "70%",
          },
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
