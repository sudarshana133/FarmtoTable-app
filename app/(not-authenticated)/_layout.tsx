import Navbar from "@/components/Navbar";
import { Slot } from "expo-router";
import { SafeAreaView, View } from "react-native";
export default function _layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar />
      <Slot />
    </SafeAreaView>
  );
}
