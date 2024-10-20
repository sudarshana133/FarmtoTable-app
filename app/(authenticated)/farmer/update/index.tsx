import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { scale } from "react-native-size-matters";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import UserAuthContext from "@/context/UserAuthContext";
import { verifyToken } from "@/utils/auth";
import { customToast } from "@/components/shared/Toast";

export default function UpdateProfile() {
  const userContxt = useContext(UserAuthContext);
  const user = userContxt?.user;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setContact(String(user?.contactNum) || "");
      setUsername(user?.username || "");
    }
  }, [user]);

  const handleButton1 = () => {
    setBtn1(!btn1);
  };

  const handleButton2 = () => {
    setBtn2(!btn2);
  };

  const handleSubmit = async () => {
    if (!name || !contact || !username || !password || !confirmPassword) {
      customToast({
        type: "info",
        text1: "Warning",
        text2: "Please fill all the fields",
      });
    } else if (contact.length !== 10) {
      customToast({
        type: "warning",
        text1: "Error",
        text2: "Contact number should be 10 digits.",
      });
    } else if (password !== confirmPassword) {
      customToast({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match",
      });
    } else {
      try {
        setIsLoading(true);
        const response = await axios.put(
          "https://project-kdn1.onrender.com/api/auth/update",
          {
            id: user?._id,
            name,
            username,
            password,
            contactNum: contact,
          }
        );

        await AsyncStorage.setItem("token", response.data);
        const updatedUser = await verifyToken();
        userContxt?.setUser(updatedUser);
        customToast({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully!",
        });
        router.back();
      } catch (error: any) {
        customToast({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.error,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contact}
        onChangeText={setContact}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {/* Password Input */}
      <View style={styles.passwordWrapper}>
        <TextInput
          style={[styles.input, styles.passwordInput, { borderWidth: 0 }]}
          placeholder="Password"
          value={password}
          secureTextEntry={!btn1}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleButton1} style={styles.eyeIcon}>
          {btn1 ? (
            <FontAwesome6 name="eye-slash" size={24} color="black" />
          ) : (
            <FontAwesome name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      {/* Confirm Password Input */}
      <View style={styles.passwordWrapper}>
        <TextInput
          style={[styles.input, styles.passwordInput, { borderWidth: 0 }]}
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry={!btn2}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={handleButton2} style={styles.eyeIcon}>
          {btn2 ? (
            <FontAwesome6 name="eye-slash" size={24} color="black" />
          ) : (
            <FontAwesome name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLoading ? "Updating..." : "Update"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: scale(16),
    marginTop: scale(16),
    justifyContent: "flex-start",
  },
  header: {
    fontSize: scale(24),
    fontWeight: "bold",
    marginBottom: scale(20),
  },
  input: {
    paddingVertical: scale(10),
    borderColor: "#E0E0E0",
    borderWidth: 1,
    marginBottom: scale(10),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    width: "100%",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: scale(8),
    marginBottom: scale(10),
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
  },
  eyeIcon: {
    paddingHorizontal: scale(10),
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    alignItems: "center",
    marginTop: scale(20),
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: "500",
    color: "#FFF",
  },
});
