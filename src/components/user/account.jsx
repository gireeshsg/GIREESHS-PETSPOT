import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaBox, FaSignOutAlt } from 'react-icons/fa';
import './UserProfile.css';
import { mycontext } from '../Context';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const nav = useNavigate();
    const { products, setProducts,isLoggedIn, setIsLoggedIn, setCartItems,setOrders } = useContext(mycontext);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId")
    const user =localStorage.getItem("user")
        if (token,user,userId) {
          setIsLoggedIn(true);
        }
      }, []);
    
      const handleLogout = () => {
        localStorage.removeItem("token");
      localStorage.removeItem("userId")
      localStorage.removeItem("user")
      localStorage.removeItem("addressDetails")
        setIsLoggedIn(false);
        setOrders([]);
         // Change state to logged out
        nav("/main"); // Redirect to homepage
      };
    

    const handleGetOrder = () => {
        nav('/getorders');
    };
    const handlecart = () => {
        nav('/cart');
    };
    const handlewishlist = () => {
        nav('/wishlist');
    };


    return (
        <div className="profile-container">
            <h1 className="profile-title">User Profile</h1>
            <div className="button-container">
                <button onClick={handleGetOrder} className="button order-button">
                    <FaBox /> My Orders
                </button>
                <button onClick={handlewishlist} className="button wishlistt-button">
                    <FaHeart /> Wishlist
                </button>
                <button onClick={handlecart} className="button cartt-button">
                  <FaShoppingCart  />cartpage
                </button>
            </div>
            <button className="button logout-button" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
            </button>
        </div>
    );
};

export default UserProfile;
