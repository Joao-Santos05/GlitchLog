import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface FilterOption {
  label: string;
  value: string | number;
}

interface FilterDropdownProps {
  activeLabel: string;
  options: FilterOption[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string | number) => void;
  widthClass?: string;
}

export default function FilterDropdown({
  activeLabel,
  options,
  isOpen,
  onToggle,
  onSelect,
  widthClass = "w-32",
}: FilterDropdownProps) {
  return (
    <View className="relative z-50">
      <TouchableOpacity onPress={onToggle}>
        <Text className="text-[#A499C9] text-xs font-bold uppercase">
          {activeLabel} ▾
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View
          className={`absolute top-6 right-0 bg-[#2D214F] border border-[#4A3F75] rounded-md py-2 shadow-lg ${widthClass}`}
        >
          {options.map((opt, index) => (
            <TouchableOpacity
              key={index}
              className="px-4 py-2"
              onPress={() => onSelect(opt.value)}
            >
              <Text className="text-white text-xs">{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
