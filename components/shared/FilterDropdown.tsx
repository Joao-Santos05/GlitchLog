import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface FilterOption {
  label: string; // O que aparece escrito (ex: "5 Stars")
  value: string | number; // O valor real por trás (ex: 5)
}

interface FilterDropdownProps {
  activeLabel: string; // O texto que fica no botão principal
  options: FilterOption[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string | number) => void;
  widthClass?: string; // Para você controlar a largura do menu se precisar
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
