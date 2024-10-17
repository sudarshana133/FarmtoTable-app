import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import UserAuthContext from "@/context/UserAuthContext";
import { Crop } from "@/types/crop";
import { customToast } from "../shared/Toast";

export default function EditCropModal({
  selectedCrop,
  onClose,
  getCrops,
}: {
  selectedCrop: Crop;
  onClose: () => void;
  getCrops: () => void;
}) {
  const [cropName, setCropName] = useState(selectedCrop?.name || "");
  const [quantity, setQuantity] = useState(
    String(selectedCrop?.quantity || "")
  );
  const [price, setPrice] = useState(String(selectedCrop?.price || ""));
  const [min, setMin] = useState(String(selectedCrop?.minVal || ""));
  const [max, setMax] = useState(String(selectedCrop?.maxVal || ""));
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(UserAuthContext);
  const user = userContext?.user;

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");

    if (
      !cropName ||
      !quantity ||
      !price ||
      !min ||
      !max ||
      !user?.name ||
      !token
    ) {
      customToast({
        type: "info",
        text1: "Warning",
        text2: "Please fill all the details",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.put(
        `https://project-kdn1.onrender.com/api/crop/editcrop`,
        {
          id: selectedCrop._id,
          name: cropName,
          quantity: Number(quantity),
          price: Number(price),
          min: Number(min),
          max: Number(max),
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      customToast({
        type: "success",
        text1: "Success",
        text2: "Crop updated successfully",
      });
      getCrops();
      onClose();
    } catch (error: any) {
      console.log(error);
      customToast({
        type: "error",
        text1: "Error",
        text2: error.response.data,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal animationType="fade" transparent visible>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Edit Crop</Text>
          <TextInput
            style={styles.input}
            placeholder="Crop Name"
            value={cropName}
            onChangeText={setCropName}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity in tons"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Min Price"
            keyboardType="numeric"
            value={min}
            onChangeText={setMin}
          />
          <TextInput
            style={styles.input}
            placeholder="Max Price"
            keyboardType="numeric"
            value={max}
            onChangeText={setMax}
          />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitText}>Submit</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: "#0a4785",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#CCCCCC",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
