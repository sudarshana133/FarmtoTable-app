import Navbar from "@/components/Navbar";
import UserAuthContextProvider from "@/context/UserAuthContextProvider";
import { Slot } from "expo-router";
import { SafeAreaView, View } from "react-native";
import Toast from "react-native-toast-message";

export default function _layout() {
  return (
    <UserAuthContextProvider>
      <View style={{ flex: 1, marginTop: 12 }}>
        <Slot />
        <Toast />
      </View>
    </UserAuthContextProvider>
  );
}
