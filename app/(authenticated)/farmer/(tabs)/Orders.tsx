import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAuthContext from "@/context/UserAuthContext";
import OrderBox from "@/components/farmer/orders/OrderBox";
import { Order } from "@/types/order";
import { useRouter } from "expo-router";
import { customToast } from "@/components/shared/Toast";
import { scale } from "react-native-size-matters";

export default function Orders() {
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null);
  const [approvedOrder, setApprovedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userContxt = useContext(UserAuthContext);
  const user = userContxt?.user;
  const router = useRouter();
  const fetchApprovedOrders = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    if (token && user?.username) {
      try {
        const resApproved = await axios.post(
          "https://project-kdn1.onrender.com/api/order/getapprovedorders",
          { farmerUsername: user.username },
          { headers: { token: `Bearer ${token}` } }
        );
        setApprovedOrder(resApproved.data.orders[0]);
      } catch (error: any) {
        customToast({
          type: "error",
          text1: "Error",
          text2: "Some error occurred while fetching approved orders",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchPendingOrders = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    if (token && user?.username) {
      try {
        const resPending = await axios.post(
          "https://project-kdn1.onrender.com/api/order/getpendingOrders",
          { farmerUsername: user.username, pending: true },
          { headers: { token: `Bearer ${token}` } }
        );
        setPendingOrder(resPending.data.orders[0]);
      } catch (error: any) {
        console.log("Error fetching pending orders:", error.response.data);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const getAllOrders = async () => {
      Promise.all([fetchApprovedOrders()]);
    };
    getAllOrders();
  }, [user]);

  const goToPendingOrders = () => {
    router.push("/farmer/pendingorders");
  };

  const goToApprovedOrders = () => {
    router.push("/farmer/approvedorders");
  };
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
      {/* Pending Order (only shows one) */}
      {/* {pendingOrder ? (
        <View>
          <Text style={styles.subtitle}>Pending Order</Text>
          <OrderBox order={pendingOrder} status="pending" />
          <Button title="See More" onPress={goToPendingOrders} />
        </View>
      ) : (
        <Text>No Pending Orders</Text>
      )} */}

      {/* Approved Order (only shows one) */}
      {approvedOrder ? (
        <View style={styles.marginTop}>
          <Text style={styles.subtitle}>Approved Order</Text>
          <OrderBox
            order={approvedOrder}
            status="approved"
            showSeeMore={true}
            onSeeMorePress={goToApprovedOrders}
          />
        </View>
      ) : (
        <Text>No Approved Orders</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
  },
  subtitle: {
    fontSize: scale(20),
    marginVertical: scale(10),
    fontWeight: "bold",
  },
  marginTop: {
    marginTop: scale(20),
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(10),
    paddingVertical: scale(10),
  },
  seeMoreText: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginLeft: scale(10),
  },
});
