import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { mycontext } from '../Context';
import './user.css';

const OrderManagement = () => {
  const { orders, setOrders } = useContext(mycontext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch orders when component mounts
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('http://localhost:5000/user/orders', { withCredentials: true });
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Update order status by sending a PATCH request to the backend
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/user/orders/${orderId}/updateStatus`, 
        { status }, 
        { withCredentials: true }
      );
      if (response.status === 200) {
        // Update order state with the new status
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status } : order
          )
        );
        alert('Order status updated!');
      } else {
        alert('Error updating order status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError(error.response?.data?.error || 'Failed to update order status. Please try again later.');
    }
  };

  // Handle order deletion
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/user/orders/${orderId}`, { withCredentials: true });
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        alert("Order deleted successfully.");
      } catch (error) {
        console.error('Error deleting order:', error);
        setError(error.response?.data?.error || 'Failed to delete order. Please try again later.');
      }
    }
  };

  // Effect to fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading orders...</p>;
  }

  return (
    <div className='order-management-container'>
      <h1 className="title">Order Management</h1>
      {error && <p className="error-message">{error}</p>}
      
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Image</th>
            <th>User Email</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Shipping Address</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.product && order.product.image.length > 0 ? (
                    <img src={order.product.image[0]} alt={order.product.breed} className="productr-image" />
                  ) : (
                    <p>No image</p>
                  )}
                </td>
                <td>{order.userId ? order.userId.email : 'User info unavailable'}</td>
                <td>{order.product ? order.product.category : 'N/A'}</td>
                <td>{order.quantity}</td>
                <td>
                  {order.address ? (
                    <p>{order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
                  ) : (
                    <p>Address unavailable</p>
                  )}
                </td>
                <td>{order.paymentStatus}</td>
                <td>{order.status}</td>
                <td>
                  <button className="action-button" onClick={() => handleDeleteOrder(order._id)}>
                    Delete
                  </button>
                  <button 
                    className="action-button" 
                    onClick={() => updateOrderStatus(order._id, 'Shipped')} 
                    disabled={order.status === 'Shipped' || order.status === 'Delivered'}
                  >
                    Shipped
                  </button>
                  <button 
                    className="action-button" 
                    onClick={() => updateOrderStatus(order._id, 'Out of Delivery')} 
                    disabled={order.status === 'Out of Delivery' || order.status === 'Delivered'}
                  >
                    Out of Delivery
                  </button>
                  <button 
                    className="action-button" 
                    onClick={() => updateOrderStatus(order._id, 'Delivered')} 
                    disabled={order.status === 'Delivered'}
                  >
                    Delivered
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
