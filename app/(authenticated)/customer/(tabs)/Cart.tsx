import CartItem from "@/components/customer/CartItem";
import UserAuthContext from "@/context/UserAuthContext";
import { Cart, Item } from "@/types/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const userContxt = useContext(UserAuthContext);
  const user = userContxt?.user;
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const getCart = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(
        `https://project-kdn1.onrender.com/api/cart/${user?.username}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCart(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handlePayment = () => {
    console.log("Payment button clicked");
  };
  const handleRefresh = async () => {
    setIsRefreshing(true);
    getCart();
    setIsRefreshing(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.totalPrice}>Total: ₹{cart?.totalPrice || 0}</Text>
        <Button
          title="Proceed to Payment"
          onPress={handlePayment}
          color="#28a745"
        />
      </View>
      {cart != null ? (
        <FlatList
          data={cart?.items}
          keyExtractor={(item: Item) => item._id.toString()}
          renderItem={({ item }: { item: Item }) => (
            <CartItem
              item={item}
              cart={cart}
              setCart={setCart}
              getCart={getCart}
            />
          )}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
        />
      ) : (
        <View>
          <Text>No cart Details add items</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
