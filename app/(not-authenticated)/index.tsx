import { Item } from "@/components/Item";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { scale } from "react-native-size-matters";

const pages = [
  {
    title: "Welcome to FarmLink",
    content:
      "FarmLink brings fresh, locally-grown farm produce right to your doorstep. We bridge the gap between farmers and customers by offering fresh crops at affordable prices. Join us today to support local farmers and eat healthy.",
    imageUrl: require("../../assets/images/home-page/img1.jpg"),
  },
  {
    title: "Why Support Local Farmers?",
    content:
      "By buying directly from local farmers, you're supporting sustainable farming and helping small businesses thrive. Our farmers grow crops without the use of harmful pesticides, ensuring you get fresh, nutritious, and organic produce.",
    imageUrl: require("../../assets/images/home-page/img1.jpg"),
  },
  {
    title: "Explore Fresh Produce",
    content:
      "Browse through our wide variety of farm-fresh crops, from seasonal vegetables to fruits and grains. We update our inventory regularly, so you’ll always have access to the freshest produce, directly from the farm to your kitchen.",
    imageUrl: require("../../assets/images/home-page/img1.jpg"),
  },
  {
    title: "How It Works",
    content:
      "1. Browse: Explore our catalog of fresh farm produce. 2. Order: Select your favorite crops and place your order. 3. Enjoy: Have it delivered to your doorstep, all while supporting local farmers.",
    imageUrl: require("../../assets/images/home-page/img1.jpg"),
  },
  {
    title: "Join Our Community",
    content:
      "Sign up now to become part of a community that values fresh, healthy food and supports local farmers. Let’s grow together, and take a step toward a more sustainable future.",
    imageUrl: require("../../assets/images/home-page/img1.jpg"),
    button: true,
  },
];

export default function Home() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/login");
  };

  const renderItem = ({ item }: { item: (typeof pages)[0] }) => (
    <Item
      title={item.title}
      content={item.content}
      button={item.button}
      imageUrl={item.imageUrl}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handlePress} style={styles.skip}>
          <FontAwesome name="arrow-right" size={20} color="white" />
          <Text style={{ color: "white" }}>Skip</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={pages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  skipContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    alignItems: "flex-end",
  },
  skip: {
    display: "flex",
    fontSize: scale(14),
    color: "#333",
    flexDirection: "row",
    backgroundColor: "black",
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(4),
    gap: scale(5),
  },
});
