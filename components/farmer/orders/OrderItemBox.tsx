import { OrderItem } from "@/types/order";
import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

interface OrderItemBoxProps {
  orderItem: OrderItem;
}

const OrderItemBox: React.FC<OrderItemBoxProps> = ({ orderItem }) => {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
      <Text style={styles.cropName}>{orderItem.crop.name}</Text>
        <Text style={styles.value}>{orderItem.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderItemBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    borderRadius: scale(8),
    padding: scale(10),
    marginBottom: scale(10),
    borderWidth: scale(1),
    borderColor: "#e0e0e0",
  },
  cropName: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#333",
    marginBottom: scale(6),
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: scale(14),
    color: "#666",
    fontWeight: "bold",
  },
  value: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#333",
  },
});
