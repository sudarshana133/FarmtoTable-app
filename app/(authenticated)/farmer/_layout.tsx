import { Stack } from "expo-router";
import { View, Text } from "react-native";
export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="update/index"
        options={{
          headerTitle: "Update",
        }}
      />
      <Stack.Screen
        name="pendingorders/index"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="addcrop/index"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="approvedorders/index"
        options={{
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
