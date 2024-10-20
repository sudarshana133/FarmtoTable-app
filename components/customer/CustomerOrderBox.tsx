import { Order } from "@/types/order";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { scale } from "react-native-size-matters";

type OrderBoxProps = {
  order: Order;
};

const CustomerOrderBox: React.FC<OrderBoxProps> = ({ order }) => {
  return (
    <View style={styles.customerOrderBox}>
      <Text style={styles.title}>Order Summary</Text>
      <View style={styles.divider}></View>
      <Text style={styles.orderDetails}>Total Price: ₹{order.totalPrice}</Text>
      <Text style={styles.orderDetails}>
        Payment Status: {order.paymentStatus}
      </Text>
      <Text style={styles.orderDetails}>
        Order Date: {new Date(order.OrderPlaceTime).toLocaleDateString()}
      </Text>

      <Text style={styles.itemsTitle}>Items:</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.crop.name}</Text>
            <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CustomerOrderBox;

const styles = StyleSheet.create({
  customerOrderBox: {
    backgroundColor: "#FFFFFF",
    padding: scale(20),
    marginVertical: scale(12),
    borderRadius: scale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: scale(0.15),
    shadowRadius: scale(8),
    elevation: scale(5),
    borderWidth: scale(1),
    borderColor: "#ECECEC",
  },
  title: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  divider: {
    height: scale(1),
    backgroundColor: "#ECECEC",
    marginVertical: scale(8),
  },
  orderDetails: {
    fontSize: scale(16),
    color: "#555",
    marginBottom: scale(6),
  },
  itemsTitle: {
    marginTop: scale(12),
    fontSize: scale(17),
    fontWeight: "600",
    color: "#444",
    marginBottom: scale(6),
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scale(6),
    borderBottomWidth: scale(1),
    borderBottomColor: "#ECECEC",
  },
  itemName: {
    fontSize: scale(16),
    color: "#333",
    flex: 2,
  },
  itemQuantity: {
    fontSize: scale(15),
    color: "#666",
    flex: scale(1),
    textAlign: "center",
  },
  itemPrice: {
    fontSize: scale(16),
    fontWeight: "500",
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
});
