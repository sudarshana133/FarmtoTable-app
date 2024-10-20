import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import UserAuthContext from "@/context/UserAuthContext";
import { Crop } from "@/types/crop";
import CropTable from "./CropTable";
import ActionSheet from "./ActionSheet";
import EditCropModal from "./EditCropModal";
import { customToast } from "../shared/Toast";

export default function FarmerCrops() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selected, setSelected] = useState<Crop | null>(null);
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const userContxt = useContext(UserAuthContext);
  const user = userContxt?.user;

  const getCrops = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token || !user?.username) return;

      const res = await axios.post(
        "https://project-kdn1.onrender.com/api/crop/farmercrops",
        { farmer: user?.username },
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      setCrops(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCropSelected = (crop: Crop) => {
    setSelected(crop);
    setActionSheetVisible(true);
  };

  const handleDelete = async () => {
    if (selected) {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("no token");
      }
      setActionSheetVisible(false);
      try {
        const res = await axios.delete(
          "https://project-kdn1.onrender.com/api/crop/deletecrop",
          {
            headers: { token: "Bearer " + token },
            data: { id: selected._id, name: user?.username },
          }
        );
        customToast({
          text1: "Success",
          text2: "Deleted crop successfully",
          type: "success",
        });
        setCrops(crops.filter((c) => c._id !== selected._id));
      } catch (error) {
        console.log(error);
        customToast({
          text1: "Failure",
          text2: "Failed to delete crop",
          type: "error",
        });
      }
    }
  };

  const handleEdit = () => {
    if (selected) {
      setActionSheetVisible(false);
      setIsEditing(true);
    }
  };

  useEffect(() => {
    getCrops();
  }, [user]);

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.box, isEditing ? { opacity: 0.2 } : { opacity: 1 }]}>
        <CropTable
          crops={crops}
          onCropSelect={handleCropSelected}
          refreshing={refreshing}
          onRefresh={getCrops}
        />
      </View>
      {isActionSheetVisible && (
        <ActionSheet
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCancel={() => setActionSheetVisible(false)}
        />
      )}

      {isEditing && selected && (
        <View style={styles.editmodal}>
          <EditCropModal
            getCrops={getCrops}
            selectedCrop={selected}
            onClose={() => setIsEditing(false)}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
    backgroundColor: "#fff",
  },
  box: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editmodal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
});
