import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
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
  return (
    <View className="flex-1 bg-[#2C225A]">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingBottom: 20 }}
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
            <View className="border border-[#F2E8FF]/30 rounded-full px-4 py-1.5">
              <Text className="text-white text-xs font-semibold">
                500 Followers
              </Text>
            </View>
            <View className="border border-[#F2E8FF]/30 rounded-full px-4 py-1.5">
              <Text className="text-white text-xs font-semibold">
                420 Followings
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-7">
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            icon={({ color }) => <LogOutIcon size={20} color={color} />}
            onPress={handleLogout}
            inactiveTintColor="#A499C9"
            style={{
              borderRadius: 20,
              paddingHorizontal: 10,
              marginBottom: 8,
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
          drawerActiveBackgroundColor: "#B8AAFF",
          drawerActiveTintColor: "#2C225A",
          drawerInactiveTintColor: "#A499C9",
          drawerItemStyle: {
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 8,
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color }) => <User2 size={20} color={color} />,
          }}
        />
        <Drawer.Screen
          name="notifications"
          options={{
            drawerLabel: "Notifications",
            title: "Notifications",
            drawerIcon: ({ color }) => <Bell size={20} color={color} />,
          }}
        />

        <Drawer.Screen
          name="diary"
          options={{
            drawerLabel: "Diary",
            title: "Diary",
            drawerIcon: ({ color }) => <Calendar size={20} color={color} />,
          }}
        />

        <Drawer.Screen
          name="reviews"
          options={{
            drawerLabel: "Reviews",
            title: "Reviews",
            drawerIcon: ({ color }) => (
              <BookOpenCheck size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="lists"
          options={{
            drawerLabel: "Lists",
            title: "Lists",
            drawerIcon: ({ color }) => (
              <ListFilterIcon size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="wishlist"
          options={{
            drawerLabel: "Wishlist",
            title: "Wishlist",
            drawerIcon: ({ color }) => <LibraryBig size={20} color={color} />,
          }}
        />

        <Drawer.Screen
          name="likes"
          options={{
            drawerLabel: "Likes",
            title: "Likes",
            drawerIcon: ({ color }) => <Heart size={20} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
