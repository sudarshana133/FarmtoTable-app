import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { scale } from "react-native-size-matters";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: scale(90),
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  icon: {
    position: "absolute",
    left: scale(30),
  },
  logo: {
    width: scale(90),
    height: scale(70),
  },
});
