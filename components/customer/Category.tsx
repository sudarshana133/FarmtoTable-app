import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import axios from "axios";
import { Crop } from "@/types/crop";
import { getToken } from "@/utils/auth";
import { scale } from "react-native-size-matters";
import CropDetailSheet from "./CropDetailSheet";

interface CategoryProps {
  category: string;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<Crop | null>(null);
  const getCrops = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `https://project-kdn1.onrender.com/api/crop/category/${category}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCrops(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCrops();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <View>
      {crops.length > 0 ? (
        <FlatList
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          data={crops}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item, index }: { item: Crop; index: number }) => (
            <Pressable
              onPress={() => setSelected(item)}
              style={[
                styles.cropItem,
                index === 0 ? {} : styles.notFirstItem,
                index === crops.length - 1 ? styles.lastItem : {},
              ]}
            >
              <Text style={styles.cropName}>{item.name}</Text>
              <Text style={styles.cropDetails}>
                Farmer: {item.farmerUsername}
              </Text>
              <Text style={styles.cropDetails}>Price: ₹{item.price}</Text>
              <Text style={styles.cropDetails}>Address: {item.address}</Text>
              <Text style={styles.cropDetails}>
                Quantity: {item.quantity} tons
              </Text>
            </Pressable>
          )}
          horizontal
        />
      ) : (
        <View>
          <Text>No crops in this category</Text>
        </View>
      )}
      {selected && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selected}
          onRequestClose={() => setSelected(null)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <CropDetailSheet
                item={selected}
                onClose={() => setSelected(null)}
                crops={crops}
                setCrops={setCrops}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: scale(10),
    paddingRight: scale(15),
  },
  cropItem: {
    padding: scale(10),
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  notFirstItem: {
    marginLeft: scale(15),
  },
  lastItem: {
    marginRight: scale(10),
  },
  cropName: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#333",
  },
  cropDetails: {
    fontSize: scale(14),
    color: "#777",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Category;
