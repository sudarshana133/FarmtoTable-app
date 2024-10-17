import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAuthContext from "@/context/UserAuthContext";
import OrderBox from "@/components/farmer/orders/OrderBox";
import { Order } from "@/types/order";
import { scale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ApprovedOrders() {
  const [approvedOrders, setApprovedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userContext = useContext(UserAuthContext);
  const user = userContext?.user;

  useEffect(() => {
    const fetchApprovedOrders = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (token && user?.username) {
        try {
          const res = await axios.post(
            "https://project-kdn1.onrender.com/api/order/getapprovedorders",
            { farmerUsername: user.username, approved: true },
            { headers: { token: `Bearer ${token}` } }
          );
          setApprovedOrders(res.data.orders);
        } catch (error) {
          console.error("Error fetching approved orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApprovedOrders();
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approved Orders</Text>
      <View style={styles.listContainer}>
        {approvedOrders.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={approvedOrders}
            renderItem={({ item }) => (
              <OrderBox order={item} status="approved" />
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ marginBottom: scale(20) }} // Apply marginBottom here
          />
        ) : (
          <Text>No Approved Orders</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: scale(26),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    marginBottom: scale(20),
  },
});
