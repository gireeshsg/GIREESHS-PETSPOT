import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { mycontext } from '../Context';
import './order.css';

const Order = () => {
  const { orders, setOrders, setIsLoggedIn } = useContext(mycontext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOrderId, setEditOrderId] = useState(null);
  const [updatedAddress, setUpdatedAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    pincode: '',
    locality: '',
    landmark: '',
    addressType: '',
    phone: '',
  });
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchOrders();
    } else {
      setIsLoggedIn(false);
      setOrders([]);
    }
  }, [setIsLoggedIn, setOrders]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/user/getorders", { withCredentials: true });
      if (response.data && response.data.orders) {
        setOrders(response.data.orders);
      } else {
        throw new Error("No orders found.");
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message || "Failed to fetch orders.");
      console.error("Fetch Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const order = orders.find(o => o.orderId === orderId);
    
    // Check if the order is already canceled
    if (order.canceled) {
      alert(`Order ${orderId} has already been canceled!`);
      return;
    }

    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    setLoadingAction(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`http://localhost:5000/user/cancelOrder/${orderId}`, {}, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const { canceled, orderStatus } = response.data;
        setOrders(prevOrders => prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: orderStatus, canceled } : order
        ));
      } else {
        setError('Failed to cancel order. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while canceling the order.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order permanently?");
    if (!confirmDelete) return;

    setLoadingAction(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:5000/user/deleteorder/${orderId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
      } else {
        setError('Failed to delete order. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while deleting the order.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleEditClick = (order) => {
    setEditOrderId(order.orderId);
    setUpdatedAddress({ ...order.address });
  };

  const handleUpdateAddress = async (orderId) => {
    setLoadingAction(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/user/updateAddress", {
        orderId,
        addressDetails: updatedAddress,
      }, { withCredentials: true });

      if (response.status === 200) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.orderId === orderId ? { ...order, address: updatedAddress } : order
          )
        );
        setEditOrderId(null);
        setUpdatedAddress({
          street: '',
          city: '',
          state: '',
          zip: '',
          pincode: '',
          locality: '',
          landmark: '',
          addressType: '',
          phone: '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while updating the address.');
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="order-container">
      <h2>Your Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <ul className="order-list">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map(order => (
            <li key={order.orderId} className={`order-item card ${order.canceled ? 'canceled' : ''}`}>
              <div className="order-details">
                <div className="delivery-details">
                  <h3 className='det'>Delivery Details</h3>
                  <div className="address-container">
                    <div className='del'>
                    <span className='del' >FullName: {order.address?.fullname|| 'Not available'}</span>
                      <span className='del' >Address: {order.address?.address || 'Street not available'}</span>
                      <span className='del'>City: {order.address?.city || 'City not available'}</span>
                      <span className='del'>State: {order.address?.state || 'State not available'}</span>
                    </div>
                    <div>
                      <span className='del' >Pincode: {order.address?.pincode || 'ZIP not available'}</span>
                      <span className='del'>Landmark: {order.address?.landmark || 'Not available'}</span>
                      <span className='del' >Address Type: {order.address?.addressType || 'Not available'}</span>
                      <span className='del' >Locality: {order.address?.locality|| 'Not available'}</span>
                      <p className='gmi'>User Email: {order.userEmail || 'Email not available'}</p>
                      <p className='gmi'>orderdDate: {order. orderDate || 'Email not available'}</p>
                    </div>
                    <div>
                      <p>Phone: {order.address?.phone || 'Phone not available'}</p>
                    </div>
                  </div>
                </div>

                <div className="product-details">
                  <h3 className='det'>Product Details</h3>
                  {/* <h4>{order.product?.name || 'Product name not available'} (x{order.quantity})</h4> */}
                  {order.productImage && (
                    <img src={order.productImage} alt={order.product?.name} className="product-image" />
                  )}
                      <p className='cati'>Category: {order.productCategory || 'Category not available'}</p>
                  <p className='pri'>Price:  <strong>${order.productPrice || 'Price not available'}</strong></p>
                 
              
                </div>
              </div>

              <div className="order-status-bar">
  <div className="status-bar">
    {/* Status steps, filled dynamically based on the order status */}
    <div className={`status-step ${order.status === 'Confirmed' || order.status === 'Shipped' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'filled' : ''}`} />
    <div className={`status-step ${order.status === 'Shipped' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'filled' : ''}`} />
    <div className={`status-step ${order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'filled' : ''}`} />
    <div className={`status-step ${order.status === 'Delivered' ? 'filled' : ''}`} />
  </div>

  {/* Status labels */}
  <div className="status-labels">
    <span>Confirmed</span>
    <span>Shipped</span>
    <span>Out for Delivery</span>
    <span>Delivered</span>
  </div>

  {/* Circles at the end of each step */}
  <div className={`status-circle status-circle-1 ${order.status === 'Confirmed' ? 'active' : order.status === 'Shipped' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'completed' : 'pending'}`}>
    1
  </div>
  <div className={`status-circle status-circle-2 ${order.status === 'Shipped' ? 'active' : order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'completed' : 'pending'}`}>
    2
  </div>
  <div className={`status-circle status-circle-3 ${order.status === 'Out for Delivery' ? 'active' : order.status === 'Delivered' ? 'completed' : 'pending'}`}>
    3
  </div>
  <div className={`status-circle status-circle-4 ${order.status === 'Delivered' ? 'active' : 'pending'}`}>
    4
  </div>
</div>


              <div className="order-actions">
                {!order.canceled ? (
                  <button 
                    className={`cancel-button ${loadingAction ? 'loading' : ''}`} 
                    onClick={() => handleCancelOrder(order.orderId)}
                    disabled={loadingAction}
                  >
                    {loadingAction ? <span className="spinner"></span> : 'Cancel Order'}
                  </button>
                ) : null}

                

                {editOrderId === order.orderId && !order.canceled ? (
                  <div className="edit-address">
                    <h4>Edit Address</h4>
                    {Object.keys(updatedAddress).map((key) => (
                      <input
                        key={key}
                        type="text"
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={updatedAddress[key]}
                        onChange={e => setUpdatedAddress({ ...updatedAddress, [key]: e.target.value })}
                      />
                    ))}
                    <button className="save-button" onClick={() => handleUpdateAddress(order.orderId)} disabled={loadingAction}>
                      {loadingAction ? 'Saving...' : 'Save Address'}
                    </button>
                  </div>
                ) : null}

                <button 
                  className={`delete-button ${loadingAction ? 'loading' : ''}`} 
                  onClick={() => handleDeleteOrder(order.orderId)}
                  disabled={loadingAction}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </ul>
    </div>
  );
};

export default Order;
