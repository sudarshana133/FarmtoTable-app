import { Stack } from "expo-router";
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
        name="search/index"
        options={{
          headerTitle: "Search",
        }}
      />
    </Stack>
  );
}
