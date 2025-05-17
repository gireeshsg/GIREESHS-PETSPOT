// src/pages/OrderPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/orders", { withCredentials: true });
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch orders.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h2>Order ID: {order._id}</h2>
              <p>Product: {order.productId.name}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Shipping Address: {JSON.stringify(order.addressDetails)}</p>
              <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderPage;
