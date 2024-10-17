import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token");
};

export const verifyToken = async (): Promise<User | null> => {
  const token = await getToken();
  if (!token) return null;

  try {
    const decoded: User = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
