import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type ActionSheetProps = {
  onEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
};

const ActionSheet: React.FC<ActionSheetProps> = ({
  onEdit,
  onDelete,
  onCancel,
}) => (
  <View style={styles.actionSheet}>
    <TouchableOpacity style={styles.actionItem} onPress={onEdit}>
      <Text>Edit Crop</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionItem} onPress={onDelete}>
      <Text style={{ color: "red" }}>Delete Crop</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionItem} onPress={onCancel}>
      <Text>Cancel</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  actionSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    borderWidth: scale(1),
    borderColor: "#999",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  actionItem: {
    paddingVertical: scale(15),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
});

export default ActionSheet;
