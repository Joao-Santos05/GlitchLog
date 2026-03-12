import { useRouter } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";
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

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    router.replace("/(tabs)");
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
          <Text className="text-white text-3xl font-bold mb-2">Sign Up</Text>
          <Text className="text-gray-300 text-sm">
            Create an account to continue.
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

        <View className="flex-row items-center bg-[#4A3F75] rounded-full px-5 py-4 mb-4">
          <Mail color="#A499C9" size={20} />
          <TextInput
            className="flex-1 ml-3 text-white"
            placeholder="Email"
            placeholderTextColor="#A499C9"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="flex-row items-center bg-[#4A3F75] rounded-full px-5 py-4 mb-8">
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

        <TouchableOpacity
          className="bg-[#C8ADFF] rounded-full py-3.5 items-center mb-8 w-[55%] self-center"
          onPress={handleSignup}
        >
          <Text className="text-[#2C225A] font-bold text-lg">Sign Up</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center">
          <Text className="text-[#A499C9] text-xs">
            Already have an account? Go to the{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text className="text-[#E9A6A6] text-xs font-bold">Login Page</Text>
          </TouchableOpacity>
          <Text className="text-[#A499C9] text-xs">.</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
