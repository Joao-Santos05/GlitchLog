import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CreateListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [listName, setListName] = useState("");

  const handleCreate = () => {
    const finalName = listName.trim() === "" ? "Untitled" : listName;
    // Aqui você enviaria pra API. Por enquanto, só redirecionamos pra lista criada (ID fictício 1)
    router.replace(`/lists/edit/1`);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background justify-center items-center px-8"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-white text-xl font-bold mb-10">
        Give your list a name
      </Text>

      <TextInput
        className="w-full text-white text-center text-lg py-2 mb-12 border-b border-[#A499C9]/50"
        placeholder="My List"
        placeholderTextColor="#A499C9"
        value={listName}
        onChangeText={setListName}
        autoFocus
      />

      <View className="flex-row w-full justify-center gap-4">
        <TouchableOpacity
          className="bg-[#4A3F75] rounded-full py-2 px-8"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#F4A298] rounded-full py-2 px-8"
          onPress={handleCreate}
        >
          <Text className="text-[#2C225A] font-bold">create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
