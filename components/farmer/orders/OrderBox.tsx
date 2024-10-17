import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Order } from "@/types/order";
import { FontAwesome } from "@expo/vector-icons";

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
        <Text style={styles.customerText}>Customer: {order.customerUsername}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <Text style={styles.label}>Crop:</Text>
          <Text style={styles.value}>{order.cropName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Qty:</Text>
          <Text style={styles.value}>{order.quantity}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Total Price:</Text>
          <Text style={styles.value}>₹{order.price.toFixed(2)}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Billing Date:</Text>
          <Text style={styles.value}>{new Date(order.OrderPlaceTime).toLocaleDateString()}</Text>
        </View>

        {showSeeMore && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.approveButton} onPress={onSeeMorePress}>
              <FontAwesome name="check-circle" size={20} color="#fff" />
              <Text style={styles.approveText}>Approved</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.seeMoreButton} onPress={onSeeMorePress}>
              <FontAwesome name="arrow-right" size={20} color="black" />
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
    backgroundColor: "#f9f9f9",
    borderColor: "#38A3A5",
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    marginBottom: 10,
  },
  customerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  body: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  item: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: "#38A3A5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  approveText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#38A3A5",
  },
});
