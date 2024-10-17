import { useContext, useEffect, useState } from "react";
import UserAuthContext from "@/context/UserAuthContext";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Button,
} from "react-native";
import { Crop } from "@/types/crop";
import { Order } from "@/types/order";
import { useRouter } from "expo-router";

export default function FarmerHome() {
  const userContxt = useContext(UserAuthContext);
  const user = userContxt?.user;
  const [crops, setCrops] = useState<Crop[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCrops = async () => {
    try {
      const res = await axios.get(
        `https://project-kdn1.onrender.com/api/farmer/getlatestcrops/${user?.name}`
      );
      setCrops(res.data);
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `https://project-kdn1.onrender.com/api/farmer/getlatestorders/${user?.username}`
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        await Promise.all([fetchCrops(), fetchOrders()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [user?.name, user?.username]);
  

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greetingText}>
          Hi, <Text style={styles.username}>{user?.name}</Text>
        </Text>
      </View>

      {/* Crops Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your recent crops</Text>
        {crops.length > 0 ? (
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Crop</Text>
              <Text style={styles.tableHeaderCell}>Price</Text>
              <Text style={styles.tableHeaderCell}>Quantity</Text>
            </View>
            {crops.map((item, index) => (
              <View
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
                key={item._id}
              >
                <Text style={styles.tableCell} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                <Text style={styles.tableCell} numberOfLines={1} ellipsizeMode="tail">₹{item.price}</Text>
                <Text style={styles.tableCell} numberOfLines={1} ellipsizeMode="tail">{item.quantity}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text>No Crops</Text>
          </View>
        )}
      </View>

      {/* Orders Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your recent orders</Text>
        {orders.length > 0 ? (
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Crop</Text>
              <Text style={styles.tableHeaderCell}>Customer</Text>
              <Text style={styles.tableHeaderCell}>Price</Text>
            </View>
            {orders.map((item, index) => (
              <View
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
                key={item._id}
              >
                <Text style={styles.tableCell} numberOfLines={1} ellipsizeMode="tail">{item.cropName}</Text>
                <Text style={styles.tableCell} numberOfLines={1} ellipsizeMode="tail">{item.customerUsername}</Text>
                <Text style={styles.tableCell} numberOfLines={1} ellipsizeMode="tail">₹{item.price}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text>No Orders</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    color: "#1e90ff",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    textTransform:"capitalize"
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
});
