import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Crop } from "@/types/crop";
import { AntDesign } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAuthContext from "@/context/UserAuthContext";
import Toast from "react-native-toast-message";
import { customToast } from "../shared/Toast";

interface CropDetailsProps {
  item: Crop;
  crops: Crop[];
  setCrops: React.Dispatch<React.SetStateAction<Crop[]>>;
  onClose: () => void;
}

export default function CropDetailSheet({
  item,
  onClose,
  crops,
  setCrops,
}: CropDetailsProps) {
  const [slideAnim] = useState(new Animated.Value(300));
  const [enteredQty, setEnteredQty] = useState<string>("0");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userContxt = useContext(UserAuthContext);
  const user = userContxt?.user;

  // Slide in from bottom animation
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const onAddToCart = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(
        "https://project-kdn1.onrender.com/api/cart/additems",
        {
          items: [
            {
              cropId: item?._id,
              quantity: enteredQty,
            },
          ],
          customerUsername: user?.username,
          farmerUsername: item.farmerUsername, // TODO: this should be changed to farmer username from farmer name
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCrops(crops.filter((crop) => crop._id !== item._id));
      customToast({
        type: "success",
        text1: "Success!",
        text2: "Added item successfully",
      });
    } catch (error: any) {
      customToast({
        type: "error",
        text1: "Error",
        text2: "Failed to add item to cart",
      });
    } finally {
      onClose();
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const qty = Number(enteredQty);
    if (qty > item.quantity) {
      setErrorMessage("Quantity exceeds the available quantity.");
    } else {
      setErrorMessage(null);
      onAddToCart();
    }
  };

  return (
    <Animated.View
      style={[styles.actionSheet, { transform: [{ translateY: slideAnim }] }]}
    >
      {/* Close button */}
      <Pressable style={styles.closeButton} onPress={onClose}>
        <AntDesign name="close" size={scale(20)} color="#fff" />
      </Pressable>

      <View style={styles.content}>
        {/* Crop details */}
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.farmerUsername}</Text>
          <Text style={styles.detailText}>Address: {item.address}</Text>
          <Text style={styles.detailText}>Price: ₹{item.price}</Text>
          <Text style={styles.detailText}>
            Available Quantity: {item.quantity}
          </Text>
        </View>

        {/* Quantity input and error */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.quantityInput}
            value={enteredQty}
            onChangeText={setEnteredQty}
            keyboardType="numeric"
            placeholder="Enter quantity"
            placeholderTextColor="#aaa"
          />
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>

        {/* Add to Cart button */}
        <TouchableOpacity
          style={styles.addToCart}
          onPress={handleAddToCart}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  actionSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    borderColor: "#999",
    borderWidth: scale(1),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: scale(20),
    height: scale(400),
  },
  closeButton: {
    position: "absolute",
    top: scale(10),
    right: scale(10),
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: scale(20),
    padding: scale(5),
  },
  content: {
    paddingVertical: scale(10),
  },
  detailContainer: {
    marginBottom: scale(20),
  },
  title: {
    fontSize: scale(24),
    fontWeight: "bold",
    color: "#fff",
    marginBottom: scale(10),
  },
  subtitle: {
    fontSize: scale(18),
    color: "#ffe4b5",
    marginBottom: scale(10),
    textTransform: "capitalize",
  },
  detailText: {
    fontSize: scale(16),
    color: "#fff",
    marginBottom: scale(6),
  },
  inputContainer: {
    marginBottom: scale(20),
  },
  quantityInput: {
    borderColor: "#fff",
    borderWidth: scale(1),
    borderRadius: scale(8),
    padding: scale(10),
    fontSize: scale(16),
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: scale(10),
  },
  errorText: {
    color: "red",
    fontSize: scale(14),
    marginBottom: scale(10),
  },
  addToCart: {
    backgroundColor: "#000",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
