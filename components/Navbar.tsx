import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import Icon2 from "./icons/home/icon2";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon2 />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flexDirection: "column",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  icon: {
    marginBottom: 10,
  },
});
