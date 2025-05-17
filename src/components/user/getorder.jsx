// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userResponse = await axios.get("http://localhost:5000/user/me", {
//           withCredentials: true, // Include cookies for auth
//         });
//         setIsAdmin(userResponse.data.isAdmin); // Assuming the API returns user role
//       } catch (err) {
//         console.error("Failed to fetch user data", err);
//         navigate('/login'); // Redirect if user is not logged in
//       }
//     };

//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/user/orders", {
//           withCredentials: true,
//         });
//         setOrders(response.data.orders);
//       } catch (err) {
//         setError(err.response?.data?.error || 'Failed to fetch orders');
//         if (err.response?.status === 401) {
//           navigate('/login');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//     fetchOrders();
//   }, [navigate]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>{isAdmin ? "All Orders" : "Your Orders"}</h1>
//       <ul>
//         {orders.map((order) => (
//           <li key={order._id}>
//             <p>Order ID: {order._id}</p>
//             {isAdmin && <p>User Email: {order.userId.email}</p>}
//             <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
//             {/* Add any other relevant order details here */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Orders;
