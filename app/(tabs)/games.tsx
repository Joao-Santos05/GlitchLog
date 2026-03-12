import { icons } from "@/constants/icons";
import React from "react";
import { Image, ScrollView, View } from "react-native";

const notifications = () => {
  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <Image source={icons.logotext} className="size-10 w-full mx-auto" />
      </ScrollView>
    </View>
  );
};

export default notifications;
