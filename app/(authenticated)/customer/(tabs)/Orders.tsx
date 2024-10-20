import CustomerOrderBox from "@/components/customer/CustomerOrderBox";
import { customToast } from "@/components/shared/Toast";
import UserAuthContext from "@/context/UserAuthContext";
import { Order } from "@/types/order";
import { getToken } from "@/utils/auth";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userContxt = useContext(UserAuthContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const user = userContxt?.user;

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const res = await axios.get(
        `https://project-kdn1.onrender.com/api/order/customer/${user?.username}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data.orders);
    } catch (error: any) {
      customToast({
        type: "error",
        text2: "Some error occurred",
        text1: "Error!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getOrders();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={[styles.safeArea, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Your orders</Text>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(order) => order._id}
          renderItem={({ item }: { item: Order }) => (
            <CustomerOrderBox order={item} />
          )}
          contentContainerStyle={styles.flatList}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      ) : (
        <View>
          <Text>You have not kept any orders.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: scale(15),
  },
  title: {
    fontSize: scale(24),
    fontWeight: "bold",
    marginVertical: scale(10),
    color: "#333",
  },
  flatList: {
    flexGrow: 0,
  },
});
