import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function ProfileLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={
          {
            //Estilização
          }
        }
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Meu Perfil",
            title: "Perfil",
          }}
        />
        {/*Itens da Sidebar*/}
      </Drawer>
    </GestureHandlerRootView>
  );
}
