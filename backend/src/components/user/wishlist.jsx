import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mycontext } from "../Context";
import "./wishlist.css"; // Ensure this CSS file is available

export default function Wishlist() {
  const { setIsLoggedIn, isLoggedIn } = useContext(mycontext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!isLoggedIn) return; 
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/user/wishlist", {
          withCredentials: true,
        });
        setWishlistItems(response.data.wishlist);
      } catch (err) {
        setError("Failed to fetch wishlist items");
        console.error("Error fetching wishlist items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, [isLoggedIn]);

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete("http://localhost:5000/user/wishlist", {
        data: { productId },
        withCredentials: true,
      });

      // Check if the response indicates a successful removal
      if (response.status === 200) {
        // Update the wishlist state
        setWishlistItems(wishlistItems.filter(item => item._id !== productId));
      }
    } catch (err) {
      console.error("Error removing product from wishlist:", err);
      setError("Failed to remove product from wishlist");
    }
  };

  // Uncomment and implement handleLogout if needed
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   setIsLoggedIn(false);
  //   nav("/");
  // };

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return ( 
    <header className="wish">
      <div className="wishlistt-container">
        <header className="wishlistt-header">
          <h1>Your Wishlist</h1>
          <button className="logoutt-button" onClick={() => {/* handleLogout */}}>
          Logout
          </button>
        </header>
        {wishlistItems.length === 0 ? (
          <p className="empty-message">Your wishlist is empty</p>
        ) : (
          <section className="wishlistt-content">
            <h2 className="wishlistt-subtitle">Wishlist Items:</h2>
            <ul className="wishlistt-items">
              {wishlistItems.map((item) => (
                <li key={item._id} className="wishlistt-item">
                  <img src={item.image} alt={item.name} className="productu-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-category">Category: {item.category}</p>
                    <p className="item-breed">Breed: {item.breed}</p>
                    <p className="item-gender">Gender: {item.gender}</p>
                    <p className="item-size">Size: {item.size}</p>
                  </div>
                  <button 
                    className="remove-button" 
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </header>
  );
}
