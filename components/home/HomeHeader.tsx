import { Image, Text, View } from "react-native";

export default function HomeHeader() {
  return (
    <View className="px-6 pt-2 pb-4 flex-row justify-between items-start">
      <View>
        <Text className="text-white text-3xl font-bold">
          Hello, <Text className="text-[#FF8A65]">David!</Text>
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          {"Review or track games you've played..."}
        </Text>
      </View>
      <View className="relative">
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=11" }}
          className="w-12 h-12 rounded-full"
        />
        <View className="absolute top-0 right-0 w-3 h-3 bg-purple-400 rounded-full border-2 border-[#1E1B30]" />
      </View>
    </View>
  );
}
