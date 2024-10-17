import { Crop } from "@/types/crop";
import { useDebounce } from "@/utils/debounce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Modal,
  View,
} from "react-native";
import CropBox from "@/components/customer/CropBox";
import CropDetailSheet from "@/components/customer/CropDetailSheet"; // Use modal sheet
import UserAuthContext from "@/context/UserAuthContext";

export default function Search() {
  const [searchText, setSearchText] = useState<string | null>("");
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const userContxt = useContext(UserAuthContext);
  const user = userContxt?.user;

  useDebounce({
    value: searchText,
    setDebouncedValue,
    delay: 500,
  });

  const findCrop = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://project-kdn1.onrender.com/api/crop/search",
        { name: debouncedValue, customerUsername: user?.username },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCrops(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    findCrop();
  }, [debouncedValue]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    findCrop();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setSearchText}
        value={searchText || ""}
        placeholder="Search crops..."
        style={styles.searchInput}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={crops}
        keyExtractor={(item: Crop) => item._id.toString()}
        renderItem={({ item }: { item: Crop }) => (
          <CropBox item={item} onPress={() => setSelectedCrop(item)} /> // Pass `onPress`
        )}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Modal for the Crop Detail Sheet */}
      {selectedCrop && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedCrop}
          onRequestClose={() => setSelectedCrop(null)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <CropDetailSheet
                item={selectedCrop}
                onClose={() => setSelectedCrop(null)}
                crops={crops}
                setCrops={setCrops}
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  searchInput: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  flatListContainer: {
    paddingBottom: 16,
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
