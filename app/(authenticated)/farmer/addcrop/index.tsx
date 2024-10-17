import { useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { scale } from "react-native-size-matters";
import UserAuthContext from "@/context/UserAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { customToast } from "@/components/shared/Toast";

export default function AddCrop() {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useContext(UserAuthContext);
  const user = userContext?.user;

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");

    if (
      !cropName ||
      !quantity ||
      !price ||
      !min ||
      !max ||
      !user?.name ||
      !token
    ) {
      customToast({
        type: "info",
        text1: "Warning",
        text2: "Please add all details",
      });
      return;
    }
    const parseToken = token;
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://project-kdn1.onrender.com/api/crop/addCrop",
        {
          name: cropName,
          farmerName: user.name,
          address: user.address,
          quantity: Number(quantity),
          price: Number(price),
          minVal: Number(min),
          maxVal: Number(max),
        },
        {
          headers: {
            token: `Bearer ${parseToken}`,
          },
        }
      );
      customToast({
        type: "success",
        text1: "Success",
        text2: "Crop added successfully",
      });
    } catch (error: any) {
      customToast({
        type: "error",
        text1: "Error",
        text2: error.response.data,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Add Crop</Text>
        <TextInput
          style={styles.input}
          placeholder="Crop Name"
          value={cropName}
          onChangeText={setCropName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity in tons"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Min Price"
          keyboardType="numeric"
          value={min}
          onChangeText={setMin}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Price"
          keyboardType="numeric"
          value={max}
          onChangeText={setMax}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          {isLoading && <ActivityIndicator size="small" color="#fff" />}
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    backgroundColor: "#fff",
  },
  formContainer: {
    marginTop: scale(30),
    alignItems: "center",
  },
  title: {
    fontSize: scale(24),
    fontWeight: "bold",
    marginBottom: scale(20),
  },
  input: {
    width: "100%",
    height: scale(45),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
    marginBottom: scale(10),
  },
  btn: {
    width: "100%",
    backgroundColor: "black",
    paddingHorizontal: scale(12),
    color: "white",
    display: "flex",
    flexDirection: "row",
    paddingVertical: scale(10),
    gap: scale(4),
    borderRadius: scale(5),
    margin: scale(5),
    justifyContent: "center",
  },
});
