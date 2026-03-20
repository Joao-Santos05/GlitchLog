import DrawerMenuButton from "@/components/shared/DrawerMenuButton";
import StarRating from "@/components/shared/StarRating";
import { Heart } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function DiaryScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  });

  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState(false);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());

  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    weekDays.push(d);
  }

  const goToPrevWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() - 7);
    setWeekStart(newStart);
  };

  const goToNextWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() + 7);
    setWeekStart(newStart);
  };

  const handleSelectMonth = (monthIndex: number) => {
    const newDate = new Date(pickerYear, monthIndex, 1);
    newDate.setDate(newDate.getDate() - newDate.getDay());
    setWeekStart(newDate);
    setIsMonthPickerVisible(false);
  };

  const monthYearStr = weekDays[0].toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const fullDateStr = selectedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <View className="flex-1 bg-background">
      <DrawerMenuButton />

      <View className="px-6 pt-32 z-50">
        <Text className="text-white text-2xl font-bold bg-light-400 px-4 py-1.5 rounded-full self-start">
          Diary
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4 px-2">
            <TouchableOpacity
              onPress={() => {
                setPickerYear(weekDays[0].getFullYear());
                setIsMonthPickerVisible(true);
              }}
            >
              <Text className="text-white font-bold text-lg ">
                {monthYearStr} ▾
              </Text>
            </TouchableOpacity>
            <View className="flex-row gap-2">
              <TouchableOpacity onPress={goToPrevWeek} className="p-1">
                <Text className="text-white font-bold text-lg bg-light-400 px-4 py-1.5 rounded-full self-start">
                  {"<"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToNextWeek} className="p-1">
                <Text className="text-white font-bold text-lg bg-light-400 px-4 py-1.5 rounded-full self-start">
                  {">"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-between px-2 mb-2">
            {dayNames.map((d, i) => (
              <Text
                key={i}
                className="text-[#A499C9] font-bold w-8 text-center"
              >
                {d}
              </Text>
            ))}
          </View>

          <View className="flex-row justify-between px-2 mt-2 items-center">
            {weekDays.map((dateObj) => {
              const isSelected =
                dateObj.getDate() === selectedDate.getDate() &&
                dateObj.getMonth() === selectedDate.getMonth() &&
                dateObj.getFullYear() === selectedDate.getFullYear();

              return (
                <TouchableOpacity
                  key={dateObj.toISOString()}
                  onPress={() => setSelectedDate(dateObj)}
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    isSelected ? "bg-light-300" : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`font-bold ${
                      isSelected ? "text-[#2C225A]" : "text-white"
                    }`}
                  >
                    {dateObj.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text className="text-white font-bold text-lg mb-4">{fullDateStr}</Text>

        {/* LISTA DE ATIVIDADES DO DIA (Mock) */}
        {/* Quando você integrar com API, você vai filtrar os dados usando a variável `selectedDate`! */}
        <View className="bg-background rounded-xl p-3 mb-4 flex-row items-center border border-[#4A3F75]">
          <Image
            source={{ uri: "https://placehold.co/100x150" }}
            className="w-12 h-16 rounded-md mr-4 border border-[#4A3F75]"
          />
          <View>
            <Text className="text-light-200 text-sm">
              You posted a review for
            </Text>
            <Text className="text-white font-bold mb-1">
              The Witcher 3: Wild Hunt!
            </Text>
            <View className="flex-row items-center gap-2">
              <StarRating rating={4.5} size={12} />
              <Heart color={"red"} fill={"red"} size={12} />
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isMonthPickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMonthPickerVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60 px-6">
          <View className="bg-[#2D214F] w-full rounded-2xl p-6 border border-[#4A3F75]">
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity
                onPress={() => setPickerYear(pickerYear - 1)}
                className="p-2"
              >
                <Text className="text-white font-bold text-xl">{"<"}</Text>
              </TouchableOpacity>
              <Text className="text-white text-xl font-bold">{pickerYear}</Text>
              <TouchableOpacity
                onPress={() => setPickerYear(pickerYear + 1)}
                className="p-2"
              >
                <Text className="text-white font-bold text-xl">{">"}</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {MONTHS.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  onPress={() => handleSelectMonth(index)}
                  className="w-[30%] bg-[#4A3F75] py-3 rounded-lg items-center mb-3"
                >
                  <Text className="text-white font-medium">{month}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => setIsMonthPickerVisible(false)}
              className="mt-4 py-3 items-center"
            >
              <Text className="text-[#A499C9] font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
