import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAuthContext from "@/context/UserAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scale } from "react-native-size-matters";
import { useRouter } from "expo-router";

export default function Profile() {
  const userContext = useContext(UserAuthContext);
  const user = userContext?.user;
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Name</Text>
            <Text style={styles.userInfoText}>{user?.name}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Username</Text>
            <Text style={styles.userInfoText}>{user?.username}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Contact no.</Text>
            <Text style={styles.userInfoText}>{user?.contactNum}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Address</Text>
            <Text style={styles.userInfoText}>{user?.address}</Text>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.buttonGreen}
            onPress={()=>router.push("/farmer/update")}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRed}
            onPress={() => alert("Delete Account")}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBlue}
            onPress={async () => {
              await AsyncStorage.removeItem("token");
              router.push("/");
            }}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    justifyContent: "center",
  },
  userInfoSection: {
    marginBottom: scale(24),
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  userInfoLabel: {
    fontSize: scale(16),
    fontWeight: "500",
    color: "#333",
  },
  userInfoText: {
    fontSize: scale(16),
    fontWeight: "400",
    color: "#555",
  },
  btnContainer: {
    flexDirection: "column",
    marginTop: scale(20),
  },
  buttonGreen: {
    backgroundColor: "#4CAF50",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    marginBottom: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRed: {
    backgroundColor: "#F44336",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    marginBottom: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBlue: {
    backgroundColor: "#2196F3",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: "500",
    color: "#FFF",
  },
});
