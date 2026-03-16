import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Menu } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DrawerMenuButton() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{
        position: "absolute",
        top: insets.top > 0 ? insets.top + 10 : 40,
        left: 20,
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 8,
        borderRadius: 100,
      }}
    >
      <Menu color="white" size={24} />
    </TouchableOpacity>
  );
}
