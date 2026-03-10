import React from "react";
import { ScrollView, View } from "react-native";

const login = () => {
  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      ></ScrollView>
    </View>
  );
};

export default login;
