import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Crop } from "@/types/crop";

interface CropBoxProps {
  item: Crop;
  onPress: () => void; // Accept `onPress` from parent
}

const CropBox: React.FC<CropBoxProps> = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.cropItemContainer}>
        <Text style={styles.cropName}>{item.name}</Text>
        <Text style={styles.farmerName}>{item.farmerName}</Text>
        <Text style={styles.cropDetails}>Address: {item.address}</Text>
        <Text style={styles.cropDetails}>Price: ₹{item.price}</Text>
        <Text style={styles.cropDetails}>Quantity: {item.quantity} tons</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cropItemContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cropName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  farmerName: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  cropDetails: {
    fontSize: 14,
    color: "#333",
  },
});

export default CropBox;
