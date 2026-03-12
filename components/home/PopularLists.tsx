import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { List } from "../../types";

interface Props {
  lists: List[];
}

export default function PopularLists({ lists }: Props) {
  const router = useRouter();

  return (
    <View className="mt-8">
      <Text className="text-white text-lg font-bold px-6 mb-4">
        Popular Lists This Month
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        className="gap-4"
      >
        {lists.map((list) => (
          <TouchableOpacity
            key={list.id}
            className="w-36 mr-4"
            onPress={() => router.push(`/lists/${list.id}`)}
          >
            <View className="flex-row h-28 w-full mb-3">
              <Image
                source={{ uri: list.coverUrls[0] }}
                className="flex-1 h-full rounded-l-lg"
              />
              <View className="flex-1 h-full flex-col">
                <Image
                  source={{ uri: list.coverUrls[1] }}
                  className="flex-1 w-full rounded-tr-lg"
                />
                <Image
                  source={{ uri: list.coverUrls[2] }}
                  className="flex-1 w-full rounded-br-lg"
                />
              </View>
            </View>
            <Text
              className="text-white text-sm font-bold mb-2"
              numberOfLines={2}
            >
              {list.title}
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: list.creator.avatarUrl }}
                  className="w-5 h-5 rounded-full mr-2"
                />
                <Text className="text-gray-400 text-xs">
                  {list.creator.name}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Heart size={10} color="#9CA3AF" />
                <Text className="text-gray-400 text-[10px]">{list.likes}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
