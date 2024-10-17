import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { scale } from "react-native-size-matters";
import { useRouter } from "expo-router";

export default function AddCropButton() {
  const router = useRouter();

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/farmer/addcrop")}
      >
        <FontAwesome name="plus-circle" size={24} color="white" />
        <Text style={{ color: "white" }}>Add Crop</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    bottom: 0,
    right: scale(4),
    zIndex: 1,
  },
  btn: {
    backgroundColor: "black",
    paddingHorizontal: scale(12),
    color: "white",
    display: "flex",
    flexDirection: "row",
    paddingVertical: scale(10),
    gap: scale(4),
    borderRadius: scale(5),
    margin: scale(5),
  },
});
