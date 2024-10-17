import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Farm To Table",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: scale(10) }}
              onPress={() => {
                router.push("/customer/search");
              }}
            >
              <FontAwesome name="search" size={scale(20)} color="black" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: "Cart",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Orders"
        options={{
          title: "Orders",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clipboard-list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
