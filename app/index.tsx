import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { useRouter } from "expo-router";
import { verifyToken } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function YourComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<"farmer" | "customer" | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const decodedToken = await verifyToken();
      if (decodedToken) {
        setType(decodedToken.type);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.push("/(not-authenticated)/");
    } else if (isAuthenticated && type === "farmer") {
      router.push("/(authenticated)/farmer/(tabs)/Home");
    } else if (isAuthenticated && type === "customer") {
      router.push("/(authenticated)/customer");
    }
  }, [isAuthenticated, loading, type, router]);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return null;
}
