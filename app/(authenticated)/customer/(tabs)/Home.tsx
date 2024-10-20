import { useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Category from "@/components/customer/Category";
import categories, { CategoryProps } from "@/constants/Features";

export default function Home() {
  return (
    <View style={styles.homeContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: CategoryProps }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            <Category category={item.category} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#f5f5f5",
  },
  categoryItem: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
});
