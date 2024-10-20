import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { scale } from "react-native-size-matters";

interface ItemProps {
  title: string;
  content: string;
  imageUrl: string | number;
  button?: boolean;
}

export const Item: React.FC<ItemProps> = ({
  title,
  content,
  imageUrl,
  button,
}) => {
  return (
    <View style={itemStyles.container}>
      {imageUrl && (
        <Image
          source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
          style={itemStyles.image}
        />
      )}
      <Text style={itemStyles.title}>{title}</Text>
      <Text style={[itemStyles.content, { textAlign: "justify" }]}>
        {content}
      </Text>
      {button && (
        <TouchableOpacity
          style={itemStyles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={itemStyles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    padding: scale(20),
    alignItems: "center",
  },
  image: {
    width: scale(250),
    height: scale(250),
    marginBottom: scale(20),
    borderRadius: scale(5),
  },
  title: {
    fontSize: scale(28),
    fontWeight: "bold",
    color: "#333",
    marginBottom: scale(10),
  },
  content: {
    paddingHorizontal: scale(12),
    fontSize: scale(14),
    color: "#666",
    textAlign: "center",
    marginBottom: scale(20),
  },
  button: {
    backgroundColor: "black",
    paddingVertical: scale(10),
    paddingHorizontal: scale(30),
    borderRadius: scale(5),
  },
  buttonText: {
    color: "white",
    fontSize: scale(14),
  },
});
