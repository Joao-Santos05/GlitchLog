import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import {
  BookOpenCheck,
  Calendar,
  Gamepad,
  Heart,
  LibraryBig,
  ListFilterIcon,
  Menu,
  User2,
} from "lucide-react-native";
import { Image, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function CustomDrawerContent(props: any) {
  return (
    <View className="flex-1 bg-[#2C225A]">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="p-6 mb-3">
          <Menu size={20} color={"white"} />
        </View>
        <View className="px-5">
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
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

export default function ProfileLayout() {
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
          name="index"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ color }) => <User2 size={20} color={color} />,
          }}
        />

        <Drawer.Screen
          name="(drawer)/games"
          options={{
            drawerLabel: "Games",
            title: "Games",
            drawerIcon: ({ color }) => <Gamepad size={20} color={color} />,
          }}
        />

        <Drawer.Screen
          name="(drawer)/diary"
          options={{
            drawerLabel: "Diary",
            title: "Diary",
            drawerIcon: ({ color }) => <Calendar size={20} color={color} />,
          }}
        />

        <Drawer.Screen
          name="(drawer)/reviews"
          options={{
            drawerLabel: "Reviews",
            title: "Reviews",
            drawerIcon: ({ color }) => (
              <BookOpenCheck size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(drawer)/lists"
          options={{
            drawerLabel: "Lists",
            title: "Lists",
            drawerIcon: ({ color }) => (
              <ListFilterIcon size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(drawer)/playlist"
          options={{
            drawerLabel: "Playlist",
            title: "Playlist",
            drawerIcon: ({ color }) => <LibraryBig size={20} color={color} />,
          }}
        />

        <Drawer.Screen
          name="(drawer)/likes"
          options={{
            drawerLabel: "Likes",
            title: "Likes",
            drawerIcon: ({ color }) => <Heart size={20} color={color} />,
          }}
        />

        {/* <View>. make LOGOUT
          <TouchableOpacity className="flex-row items-center ml-4">
            <LogOutIcon size={20} color={"white"} />
            <Text className="text-[#E2D4FF] text-base font-semibold">
              Logout
            </Text>
          </TouchableOpacity>
        </View> */}
      </Drawer>
    </GestureHandlerRootView>
  );
}
