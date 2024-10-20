import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { scale } from "react-native-size-matters";
import { Crop } from "@/types/crop";

type CropTableProps = {
  crops: Crop[];
  onCropSelect: (crop: Crop) => void;
  refreshing: boolean;
  onRefresh: () => void;
};

const CropTable: React.FC<CropTableProps> = ({
  crops,
  onCropSelect,
  refreshing,
  onRefresh,
}) => {
  return (
    <View>
      {crops.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={crops}
          style={styles.table}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => (
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Name</Text>
              <Text style={styles.tableHeaderCell}>Price</Text>
              <Text style={styles.tableHeaderCell}>Quantity</Text>
              <Text style={styles.tableHeaderCell}>Address</Text>
            </View>
          )}
          renderItem={({ item, index }: { item: Crop; index: number }) => (
            <TouchableOpacity onPress={() => onCropSelect(item)}>
              <View
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
              >
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>₹{item.price}</Text>
                <Text style={styles.tableCell}>{item.quantity.toFixed(2)}</Text>
                <Text
                  style={styles.tableCell}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.address}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <View>
          <Text>No crops found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: scale(1),
    borderColor: "black",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  tableHeaderCell: { flex: 1, fontWeight: "bold", textAlign: "center" },
  tableRow: { flexDirection: "row", padding: 10 },
  tableCell: { flex: 1, textAlign: "center", textTransform: "capitalize" },
  evenRow: { backgroundColor: "#f9f9f9" },
  oddRow: { backgroundColor: "#fff" },
});

export default CropTable;
