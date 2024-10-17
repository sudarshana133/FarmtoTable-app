import Icon1 from "@/components/icons/home/icon1";
import { useRouter } from "expo-router";
import { Text, SafeAreaView, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";

export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Icon1 />
        <Text style={styles.txt1}>Bringing Fields to Your Doorstep</Text>
        <Text style={styles.txt2}>
          Connecting Farmers, Nurturing Communities.
        </Text>
      </View>
      <View style={styles.btns}>
        <Button title="Login" color={"green"} onPress={()=>{
          router.push("/login")
        }}/>
        <Button title="Signup" color={"green"} onPress={()=>{
          router.push("/signup")
        }}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    marginTop: scale(40),
  },
  txt1: {
    fontSize: scale(25),
    marginVertical: scale(15),
    paddingHorizontal: scale(50),
  },
  txt2: {
    fontSize: scale(15),
    marginVertical: scale(5),
    paddingHorizontal: scale(10),
  },
  btns: {
    flexDirection: "row",
    alignItems: "center",
    margin: "auto",
    gap: scale(30),
  },
});
