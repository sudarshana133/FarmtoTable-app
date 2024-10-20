import Navbar from "@/components/Navbar";
import { Slot } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

export default function _layout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
