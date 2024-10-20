import { Item, Cart } from "@/types/cart";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scale } from "react-native-size-matters";
import { customToast } from "../shared/Toast";

interface CartItemProps {
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  cart: Cart;
  item: Item;
  getCart: () => Promise<void>;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  cart,
  setCart,
  getCart,
}) => {
  const [quantity, setQuantity] = useState("");
  const [focused, setFocused] = useState(false);

  const handleUpdateQuantity = async () => {
    try {
      // API call to update quantity
      const token = await AsyncStorage.getItem("token");
      const res = await axios.put(
        `https://project-kdn1.onrender.com/api/cart/update`,
        {
          cartId: cart._id,
          itemId: item._id,
          quantity: Number(quantity),
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      customToast({
        type: "success",
        text1: "Success!",
        text2: "Cart items updated successfully",
      });
      setCart(res.data);
    } catch (error: any) {
      customToast({
        type: "error",
        text1: "Error",
        text2: error.response.data,
      });
    }
  };

  const handleRemoveItem = async () => {
    try {
      // API call to remove the item
      const token = await AsyncStorage.getItem("token");
      await axios.delete(
        `https://project-kdn1.onrender.com/api/cart/remove/${item._id}`,
        {
          data: {
            cartId: cart._id,
          },
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      getCart();
      console.log("Item removed");
    } catch (error: any) {
      console.log("Error removing item", error);
    }
  };

  return (
    <View style={styles.cartItem}>
      <View style={styles.header}>
        <Text style={styles.cropName}>{item.crop.name}</Text>
        <TouchableOpacity
          onPress={handleRemoveItem}
          style={styles.removeButton}
        >
          <Ionicons name="trash-outline" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>

      <Text style={styles.cropDetail}>Farmer: {item.crop.farmerUsername}</Text>
      <Text style={styles.cropDetail}>Address: {item.crop.address}</Text>
      <Text style={styles.cropDetail}>
        Available Quantity: {item.crop.quantity}
      </Text>
      <Text style={styles.cropDetail}>Price: ₹{item.crop.price}</Text>
      <Text style={styles.cropDetail}>Min Price: ₹{item.crop.minVal}</Text>
      <Text style={styles.cropDetail}>Max Price: ₹{item.crop.maxVal}</Text>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>
          You have already {item.quantity} tons
        </Text>
        <TextInput
          style={[
            styles.quantityInput,
            { borderColor: focused ? "#28a745" : "#ccc" }, // Dynamic border color on focus
          ]}
          value={quantity}
          keyboardType="numeric"
          placeholder="Enter quantity"
          placeholderTextColor="#888" // Adjust placeholder color for better visibility
          onChangeText={(val) => setQuantity(val)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateQuantity}
      >
        <Text style={styles.updateButtonText}>Update Quantity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: "#fff",
    padding: scale(16),
    marginVertical: scale(8),
    borderRadius: scale(12),
    shadowColor: "#000",
    shadowOpacity: scale(0.1),
    shadowRadius: scale(8),
    elevation: scale(5),
    marginHorizontal: scale(10),
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(12),
  },
  cropName: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#333",
  },
  removeButton: {
    padding: scale(6),
    backgroundColor: "#f8d7da",
    borderRadius: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  cropDetail: {
    fontSize: scale(14),
    color: "#555",
    marginVertical: scale(4),
  },
  quantityContainer: {
    marginTop: scale(12),
    flexDirection: "column",
    alignItems: "flex-start",
  },
  quantityLabel: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#333",
    marginBottom: scale(8),
  },
  quantityInput: {
    borderWidth: scale(1),
    borderColor: "#ccc",
    borderRadius: scale(6),
    width: scale(140),
    height: scale(40),
    paddingHorizontal: scale(10),
    textAlign: "center",
    fontSize: scale(16),
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  updateButton: {
    backgroundColor: "#28a745",
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    borderRadius: scale(6),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(12),
  },
  updateButtonText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
