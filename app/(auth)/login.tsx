import { useRouter } from "expo-router";
import { Lock, User } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(main)/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#2C225A]"
    >
      <View className="h-[45%] w-full z-10">
        <View className="absolute top-0 left-0 w-full h-full overflow-hidden bg-[#1E1B30]">
          <Image
            source={require("../../assets/images/BannerLogin.png")}
            className="absolute w-full h-full opacity-60"
            resizeMode="cover"
          />
          <View className="absolute -bottom-16 left-[-10%] w-[120%] h-40 bg-[#2C225A] -rotate-12" />
        </View>

        <View className="absolute bottom-[-40px] self-center items-center justify-center w-52 h-52 bg-[#2C225A] rounded-full">
          <Image
            source={require("@/assets/icons/logo.png")}
            className="w-full h-38 mb-8"
            resizeMode="contain"
          />
        </View>

        <View className="absolute bottom-[-110px] self-center items-center justify-center w-52 h-52 z-20">
          <Image
            source={require("@/assets/icons/logotext.png")}
            className="w-60 h-20"
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="flex-1 px-8 pt-16 mt-3">
        <View className="items-center mb-8">
          <Text className="text-white text-3xl font-bold mb-2">Login</Text>
          <Text className="text-gray-300 text-sm">
            Please log in to continue.
          </Text>
        </View>

        <View className="flex-row items-center bg-[#4A3F75] rounded-full px-5 py-4 mb-4">
          <User color="#A499C9" size={20} />
          <TextInput
            className="flex-1 ml-3 text-white"
            placeholder="Username"
            placeholderTextColor="#A499C9"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View className="flex-row items-center bg-[#4A3F75] rounded-full px-5 py-4 mb-3">
          <Lock color="#A499C9" size={20} />
          <TextInput
            className="flex-1 ml-3 text-white"
            placeholder="Password"
            placeholderTextColor="#A499C9"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity className="items-end mb-10">
          <Text className="text-[#A499C9] text-xs">Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#C8ADFF] rounded-full py-3.5 items-center mb-8 w-[55%] self-center"
          onPress={handleLogin}
        >
          <Text className="text-[#2C225A] font-bold text-lg">Login</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center">
          <Text className="text-[#A499C9] text-xs">
            Dont have an account? Please{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-light-300 text-xs font-bold">Sign Up</Text>
          </TouchableOpacity>
          <Text className="text-[#A499C9] text-xs"> first.</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
