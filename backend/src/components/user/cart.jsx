import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mycontext } from "../Context";
import "./cart.css";
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'; 

export default function Cart() {
  const { setCartItems, setIsLoggedIn, isLoggedIn, products,setProducts,specificProduct } = useContext(mycontext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItemsState] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchCartItems();
    } else {
      setIsLoggedIn(false);
      clearCart();
    }
  }, [setIsLoggedIn]);

  const clearCart = () => {
    setCartItemsState([]);
    setCartItems([]); // Clear context cart items
    setTotalAmount(0); // Reset total amount
    localStorage.removeItem("cartItems"); // Clear local storage
  };

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/user/cart", {
        withCredentials: true,
      });
      const fetchedCart = response.data.cart;
      setCartItemsState(fetchedCart);
      setCartItems(fetchedCart); // Update context
      localStorage.setItem("cartItems", JSON.stringify(fetchedCart)); // Save to local storage
      calculateTotalAmount(fetchedCart);
    } catch (err) {
      setError("Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch cart data from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Update the products' inCart state based on localStorage data
    const updatedProducts = products.map(product => ({
      ...product,
      inCart: savedCart.some(item => item._id === product._id)  // Check if product is in localStorage cart
    }));
    
    setProducts(updatedProducts);
  }, []);
  
  useEffect(() => {
    if (isLoggedIn) {
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItemsState(savedCart);
      setCartItems(savedCart); // Update context
      calculateTotalAmount(savedCart);
    }
  }, [isLoggedIn, setCartItems]);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
    setTotalAmount(total);
  };

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update local storage
  };

  const handleIncrease = (productId) => {
    const updatedCart = cartItems.map(item =>
      item._id === productId ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    setCartItemsState(updatedCart);
    setCartItems(updatedCart); // Update context
    updateLocalStorage(updatedCart); // Update local storage
    calculateTotalAmount(updatedCart);
  };

  const handleDecrease = (productId) => {
    const updatedCart = cartItems.map(item =>
      item._id === productId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    setCartItemsState(updatedCart);
    setCartItems(updatedCart); // Update context
    updateLocalStorage(updatedCart); // Update local storage
    calculateTotalAmount(updatedCart);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/user/cart", {
        data: { productId },
        withCredentials: true,
      });
      const updatedCart = cartItems.filter(item => item._id !== productId);
      setCartItemsState(updatedCart);
      setCartItems(updatedCart); // Update context
      updateLocalStorage(updatedCart); // Update local storage
      calculateTotalAmount(updatedCart);
    } catch (err) {
      console.error("Error removing product from cart:", err);
      setError("Failed to remove product from cart");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <header className="bod">
        
      <div className="container">
      <h1 className="cart-title">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {/* <h2 className="cart-subtitle">Cart Items:</h2> */}
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} className="prroduct-image" />
                  <div className="item-details">
                    <strong>{item.name}</strong>
                    <p className="ji">Category: {item.category}</p>
                    <p className="ji">Breed: {item.breed}</p>
                    <p className="ji">Price: ₹{item.price}</p>
                    <p className="ji"> Quantity: {item.qty || 1}</p>
                    {/* <p>Total: ₹{parseInt(item.price) * (item.qty || 1)}</p> */}
                    <button onClick={() => nav(`/buy/${item._id}`)} className="buy-button">buynow</button>
                  </div>
                  <div className="item-actions">
                  <button className="icon-button" onClick={() => handleIncrease(item._id)}>
          <FaPlus /> {/* Add icon */}
        </button>
        <button className="icon-button" onClick={() => handleDecrease(item._id)}>
          <FaMinus /> {/* Minus icon */}
        </button>
        <button className="icon-button" onClick={() => removeFromCart(item._id)}>
          <FaTrash /> {/* Trash icon for remove */}
        </button>
      
                  </div>
                  
                
              </li>
              ))}
            </ul>
            <h3 className="total-amount">Total Amount: ₹{totalAmount}</h3>
            
          </div>
        )}
      </div>
     
    </header>
  );
}

