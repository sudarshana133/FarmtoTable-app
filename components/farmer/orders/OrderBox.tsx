import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Order } from "@/types/order";
import { FontAwesome } from "@expo/vector-icons";
import OrderItemBox from "./OrderItemBox";
import { scale } from "react-native-size-matters";

type OrderBoxProps = {
  order: Order;
  status: "pending" | "approved";
  showSeeMore?: boolean;
  onSeeMorePress?: () => void;
};

export default function OrderBox({
  order,
  status,
  showSeeMore = false,
  onSeeMorePress,
  
}: OrderBoxProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.customerText}>
          Customer: {order.customerUsername}
        </Text>
      </View>

      <View style={styles.body}>
        {/* Move the labels outside */}
        <View style={styles.labelsRow}>
          <Text style={styles.label}>Crop</Text>
          <Text style={styles.label}>Qty</Text>
        </View>

        <FlatList
          data={order.items}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }: { item: (typeof order.items)[0] }) => (
            <OrderItemBox orderItem={item} />
          )}
        />

        <View style={styles.item}>
          <Text style={styles.label}>Total Price:</Text>
          <Text style={styles.value}>₹{order.totalPrice}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Billing Date:</Text>
          <Text style={styles.value}>
            {new Date(order.OrderPlaceTime).toLocaleDateString()}
          </Text>
        </View>

        {showSeeMore && (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.approveButton}
              onPress={onSeeMorePress}
            >
              <FontAwesome name="check-circle" size={20} color="#fff" />
              <Text style={styles.approveText}>Approved</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.seeMoreButton}
              onPress={onSeeMorePress}
            >
              <Text style={styles.seeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderColor: "#38A3A5",
    borderWidth: scale(2),
    borderRadius: scale(12),
    padding: scale(16),
    marginVertical: scale(6),
    shadowColor: "#000",
    shadowOffset: { width: scale(0), height: scale(3) },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(6),
    elevation: scale(6),
  },
  header: {
    marginBottom: scale(14),
  },
  customerText: {
    fontSize: scale(22),
    fontWeight: "bold",
    color: "#38A3A5",
  },
  body: {
    paddingVertical: scale(12),
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(8),
    paddingHorizontal: scale(6),
  },
  label: {
    fontSize: scale(14),
    fontWeight: "bold",
    color: "#666",
  },
  item: {
    marginBottom: scale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(6),
    paddingVertical: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(12),
  },
  approveButton: {
    backgroundColor: "#38A3A5",
    paddingHorizontal: scale(18),
    paddingVertical: scale(10),
    borderRadius: scale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  approveText: {
    color: "#fff",
    marginLeft: scale(8),
    fontSize: scale(16),
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginLeft: scale(8),
    color: "#38A3A5",
  },
  value: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#333",
    textAlign: "right",
  },
});
