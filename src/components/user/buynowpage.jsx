import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { mycontext } from "../Context";
import { FaCreditCard, FaCashRegister } from 'react-icons/fa'; 
import "./buy.css";

export default function Buynow() {
  const { productId } = useParams();
  const [specificProduct, setSpecificProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expirationDate: '', cvv: '' });
  const navigate = useNavigate();
  const { addressDetails, setAddressDetails } = useContext(mycontext);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (direction, value) => {
    let newQuantity;
    if (direction === 0) {
      // Direct input handling
      newQuantity = parseInt(value, 10);
    } else {
      // Increment or decrement handling
      newQuantity = quantity + direction;
    }

    if (newQuantity >= 1 && newQuantity <= specificProduct.stock) {
      setQuantity(newQuantity);
      setTotalPrice(newQuantity * specificProduct.price); // Update the price based on the quantity
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/products/${productId}`, { withCredentials: true });
        setSpecificProduct(response.data.specificProduct);
        setTotalPrice(response.data.specificProduct.price); // Set the initial total price based on the product's price
      } catch (error) {
        console.error("Error fetching product details:", error);
        setSpecificProduct(null); // Ensure the product is not null in case of an error
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const validateAddress = () => {
    const requiredFields = ["pincode", "locality", "address", "city", "state", "landmark", "addressType", "phone"];
    const missingFields = requiredFields.filter(field => !addressDetails[field] || addressDetails[field].trim() === "");
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleBuyNow = () => {
    if (!validateAddress() || quantity <= 0) {
      return;
    }
    setShowPaymentOptions(true);
  };

  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }
    setIsLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    const payload = {
      productId,
      quantity,
      addressDetails,
      paymentMethod,
      cardDetails: paymentMethod === 'online_payment' ? cardDetails : undefined,
    };
    try {
      const response = await axios.post("http://localhost:5000/user/buy", payload, { headers, withCredentials: true });
      if (paymentMethod === 'cash_on_delivery') {
        setAlertType('order');
        setSuccessMessage("Order placed successfully! Please pay cash on delivery.");
      } else {
        setAlertType('payment');
        setSuccessMessage("Payment successful! Your order has been placed.");
      }
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/main");
      }, 3000);
    } catch (error) {
      console.error("Error during purchase:", error.response?.data || error);
      alert(error.response?.data?.error || "There was an issue completing your purchase.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="buy-now">
      <div className="buy-now-container">
        {loading ? (
          <p>Loading...</p>
        ) : specificProduct ? (
          <>
            <div className="product-section">
              <div className="productt-imageu-container">
                <img src={specificProduct.image} alt={specificProduct.name} className="productu-imageu" />
              </div>

              <div className="product-details-container">
                <h1 className="product-title">{specificProduct.name}</h1>
              
                <p className="product-description">{specificProduct.description}</p>
                <p className="product-author">{specificProduct.author}</p>
                {specificProduct.stock === 0 && <p className="out-of-stock">Out of stock</p>}
              </div>
            </div>

            <div className="address-section">
              <div className="address-box">
                <div className="quantity-box">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1} // Disable the minus button if quantity is 1
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(0, e.target.value)} // Handle direct input changes
                      max={specificProduct.stock}
                      className="quantity-input"
                    />
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= specificProduct.stock} // Disable the plus button if stock is reached
                    >
                      +
                    </button>
                  </div>
                  <p className="pricu"> Total Price: ₹{totalPrice.toFixed(2)}</p>
                </div>

                <p className="stock">Stock available: {specificProduct.stock}</p>
                <h3>Shipping Address</h3>

                {Object.keys(addressDetails).map((key) => (
                  <div key={key}>
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    <input
                      type={key === 'phone' ? 'tel' : 'text'}
                      value={addressDetails[key]}
                      onChange={(e) => setAddressDetails({ ...addressDetails, [key]: e.target.value })}
                      placeholder={`Enter your ${key}`}
                      className="address-input"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="actions-section">
              <div className="confirm-box">
                <button onClick={handleBuyNow} className="confirm-button" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Confirm Purchase"}
                </button>
              </div>

              {showPaymentOptions && (
                <div className="payment-options">
                  <h3>Select Payment Method:</h3>
                  <button onClick={() => handlePaymentMethodSelection('cash_on_delivery')} className="payment-option-button">
                    <FaCashRegister /> Cash on Delivery
                  </button>
                  <button onClick={() => handlePaymentMethodSelection('online_payment')} className="payment-option-button">
                    <FaCreditCard /> Online Payment
                  </button>
                </div>
              )}
            </div>

            {paymentMethod && (
              <div className="payment-confirmation">
                {paymentMethod === 'cash_on_delivery' ? (
                  <>
                    <p className="pg">You have selected Cash on Delivery. Please confirm your order.</p>
                    <button onClick={handleConfirmOrder} className="confirm-button">Confirm Order</button>
                  </>
                ) : (
                  <>
                    <h3>Enter Card Details:</h3>
                    <label>Card Number:</label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      placeholder="Enter card number"
                      className="card-input"
                    />
                    <label>Expiration Date:</label>
                    <input
                      type="text"
                      value={cardDetails.expirationDate}
                      onChange={(e) => setCardDetails({ ...cardDetails, expirationDate: e.target.value })}
                      placeholder="MM/YY"
                      className="card-input"
                    />
                    <label>CVV:</label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      placeholder="Enter CVV"
                      className="card-input"
                    />
                    <button onClick={handleConfirmOrder} className="confirm-button">Confirm Payment</button>
                  </>
                )}
              </div>
            )}

            {showSuccessAlert && (
              <div className={`success-alert ${alertType}`}>
                <div className="alert-content">
                  <div className="alert-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="tick-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <div className="alert-message">{successMessage}</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </main>
  );
}
