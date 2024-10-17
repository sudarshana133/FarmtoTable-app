import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAuthContext from '@/context/UserAuthContext';
import { Order } from '@/types/order';
import OrderBox from '@/components/farmer/orders/OrderBox';

export default function PendingOrders() {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const userContext = useContext(UserAuthContext);
  const user = userContext?.user;
  
  useEffect(() => {
    const fetchPendingOrders = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token && user?.username) {
        try {
          const res = await axios.post(
            'https://project-kdn1.onrender.com/api/order/getpendingOrders',
            { farmerUsername: user.username, pending: true },
            { headers: { token: `Bearer ${token}` } }
          );
          setPendingOrders(res.data.orders);
        } catch (error) {
          console.error('Error fetching pending orders:', error);
        }
      }
    };

    fetchPendingOrders();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Orders</Text>
      {pendingOrders.length > 0 ? (
        <FlatList
          data={pendingOrders}
          renderItem={({ item }) => <OrderBox order={item} status="pending" />}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>No Pending Orders</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
