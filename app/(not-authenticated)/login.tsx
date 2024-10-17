import axios from "axios";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import UserAuthContext from "@/context/UserAuthContext";
import { verifyToken } from "@/utils/auth";
import Toast from "react-native-toast-message";
import { customToast } from "@/components/shared/Toast";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const userContxt = useContext(UserAuthContext);
  const handlePress = async () => {
    setLoading(true);
    try {
      // Make the login API call
      const res = await axios.post(
        "https://project-kdn1.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );

      const token = res.data;

      await AsyncStorage.setItem("token", token);

      const user = await verifyToken();

      userContxt?.setUser(user);
      if (!user) return;
      if (user.type === "farmer") {
        router.push("/(authenticated)/farmer");
      } else {
        router.push("/(authenticated)/customer");
      }
    } catch (error: any) {
      customToast({
        type: "error",
        text1: "Error",
        text2: error.response.data.error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.txtContainer}>
        <Text style={styles.txt}>Login</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          onChangeText={setUsername}
          value={username}
          style={styles.input}
          placeholder="Username"
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={handlePress}
          disabled={loading}
        >
          {loading && <ActivityIndicator size="small" color="#fff" />}
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  txtContainer: {
    alignItems: "center",
    marginTop: scale(20),
  },
  txt: {
    fontSize: scale(30),
    fontWeight: "700",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: scale(30),
    paddingVertical: scale(20),
    marginTop: scale(20),
    width: "90%",
    height: scale(250),
    alignSelf: "center",
  },
  input: {
    height: scale(40),
    width: "100%",
    marginVertical: scale(12),
    borderWidth: 1,
    borderColor: "gray",
    padding: scale(10),
    borderRadius: 5,
    backgroundColor: "white",
  },
  btn: {
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    paddingVertical: scale(10),
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnTxt: {
    color: "white",
  },
});
