import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { mycontext } from "../Context";
import './buy.css';

export default function BuyNowPage() {
  const { productId } = useParams();
  const [specificProduct, setSpecificProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expirationDate: '', cvv: '' });
  const [currentStep, setCurrentStep] = useState(1);
  const { addressDetails, setAddressDetails } = useContext(mycontext);
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddress, setEditAddress] = useState({});
  const [isAddingAddress, setIsAddingAddress] = useState(false); // New state to toggle the add address form
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    locality: "",
    landmark: "",
    addressType: ""
  }); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/products/${productId}`, { withCredentials: true });
        setSpecificProduct(response.data.specificProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/addresses", { withCredentials: true });
        setUserAddresses(response.data.addresses);
        if (response.data.addresses.length > 0) {
          setSelectedAddress(response.data.addresses[0]);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setAddressDetails(address);
  };

  const handleEditClick = (address) => {
    setIsEditing(true);
    setEditAddress(address);
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/user/address/${editAddress._id}`,
        { addressDetails: editAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedAddresses = userAddresses.map((addr) =>
          addr._id === editAddress._id ? response.data.address : addr
        );
        setUserAddresses(updatedAddresses);
        setIsEditing(false);
        setSuccessMessage("Address updated successfully!");
        setShowSuccessAlert(true);
        setShowTick(true);

        setTimeout(() => {
          navigate("/main");
        }, 4000);
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update the address. Please try again.");
    }
  };

  const handleAddAddressClick = () => {
    setIsAddingAddress(true);
  };

  const handleCancelAddAddress = () => {
    setIsAddingAddress(false);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const requiredFields = ["address", "city", "state", "pincode", "phone", "locality", "landmark", "addressType"];
    const missingFields = requiredFields.filter((field) => !newAddress[field] || newAddress[field].trim() === "");
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/address", 
        { addressDetails: newAddress },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      setUserAddresses([...userAddresses, response.data.address]);
      setIsAddingAddress(false);
      setSuccessMessage("Address added successfully!");
      setShowSuccessAlert(true);
      setShowTick(true);

      setTimeout(() => {
        setShowSuccessAlert(false);
        setShowTick(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address. Please try again.");
    }
  };

  const validateAddress = () => {
    const requiredFields = ["pincode", "locality", "address", "city", "state", "landmark", "addressType", "phone"];
    const missingFields = requiredFields.filter((field) => !addressDetails[field] || addressDetails[field].trim() === "");
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleBuyNow = () => {
    if (!validateAddress() || quantity <= 0 || (specificProduct && quantity > specificProduct.stock)) {
      alert("Invalid quantity or out of stock.");
      return;
    }
    setCurrentStep(2);
  };

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    setShowSuccessAlert(true);
    setIsLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    const payload = {
      productId,
      quantity,
      addressDetails,
      paymentMethod,
      cardDetails: paymentMethod === "online_payment" ? cardDetails : undefined,
    };

    try {
      const response = await axios.post("http://localhost:5000/user/buy", payload, { headers, withCredentials: true });

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      if (paymentMethod === "cash_on_delivery") {
        setSuccessMessage("Order placed successfully! Please pay cash on delivery.");
      } else {
        setSuccessMessage("Payment successful! Your order has been placed.");
      }

      setShowSuccessAlert(true);
      setShowTick(true);

      setTimeout(() => {
        navigate("/main");
      }, 4000);
    } catch (error) {
      console.error("Error during purchase:", error.response?.data || error);
      alert(error.response?.data?.error || "There was an issue completing your purchase.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, Math.min(parseInt(e.target.value), specificProduct.stock));
    setQuantity(newQuantity);
  };

  const totalPrice = specificProduct ? (specificProduct.price * quantity).toFixed(2) : 0;

  return (
    <main className="buy-now-main">
      <div className="buy-now-container">
        {loading ? (
          <p>Loading...</p>
        ) : specificProduct ? (
          <div className="buy-now-content">
            <div className="purchase-sections">
              <div className="product-details">
                <h1 className="product-title">{specificProduct.breed} {specificProduct.category}</h1>
                <img src={specificProduct.image} alt={specificProduct.breed} className="product-image" />
                <p className="product-price">Price per unit: ₹{specificProduct.price.toFixed(2)}</p>
                <p className="product-stock">Stock available: {specificProduct.stock}</p>
                <div className="quantity-selector">
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-input"
                  />
                  <button className="quantity-btn">Add to Cart</button>
                </div>
              </div>

              <div className="address-selection">
                <h2>Choose an Address</h2>
                <div className="address-list">
                  {userAddresses.length > 0 ? (
                    userAddresses.map((address) => (
                      <div
                        key={address._id}
                        className={`address-item ${selectedAddress && selectedAddress._id === address._id ? 'selected' : ''}`}
                        onClick={() => handleAddressSelect(address)}
                      >
                        <p>{address.address} - {address.city}</p>
                        <p>{address.state}, {address.pincode}</p>
                        <button className="edit-btn" onClick={() => handleEditClick(address)}>Edit</button>
                      </div>
                    ))
                  ) : (
                    <p>No addresses found. Please add a new address.</p>
                  )}
                </div>
                {isAddingAddress ? (
                  <form onSubmit={handleAddNewAddress}>
                    <h3>Add New Address</h3>
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={newAddress.address}
                      onChange={handleAddressChange}
                    />
                    <label>City:</label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                    />
                    <label>State:</label>
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                    />
                    <label>Pincode:</label>
                    <input
                      type="text"
                      name="pincode"
                      value={newAddress.pincode}
                      onChange={handleAddressChange}
                    />
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleAddressChange}
                    />
                    <label>Locality:</label>
                    <input
                      type="text"
                      name="locality"
                      value={newAddress.locality}
                      onChange={handleAddressChange}
                    />
                    <label>Landmark:</label>
                    <input
                      type="text"
                      name="landmark"
                      value={newAddress.landmark}
                      onChange={handleAddressChange}
                    />
                    <label>Address Type:</label>
                    <input
                      type="text"
                      name="addressType"
                      value={newAddress.addressType}
                      onChange={handleAddressChange}
                    />
                    <button type="submit">Add Address</button>
                    <button type="button" onClick={handleCancelAddAddress}>Cancel</button>
                  </form>
                ) : (
                  <button onClick={handleAddAddressClick}>Add New Address</button>
                )}
              </div>

              {selectedAddress && currentStep === 2 && (
                <div className="payment-methods-section">
                  <h3>Select Payment Method:</h3>
                  <div className="payment-method-options">
                    <div
                      onClick={() => handlePaymentMethodSelection('cash_on_delivery')}
                      className={`payment-method-option ${paymentMethod === 'cash_on_delivery' ? 'selected' : ''}`}
                    >
                      <span>💵</span> Cash on Delivery
                    </div>
                    <div
                      onClick={() => handlePaymentMethodSelection('online_payment')}
                      className={`payment-method-option ${paymentMethod === 'online_payment' ? 'selected' : ''}`}
                    >
                      <span>💳</span> Online Payment
                    </div>
                  </div>

                  {paymentMethod === 'online_payment' && (
                    <div className="card-details-form">
                      <input
                        type="text"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        placeholder="Card Number"
                      />
                      <input
                        type="text"
                        value={cardDetails.expirationDate}
                        onChange={(e) => setCardDetails({ ...cardDetails, expirationDate: e.target.value })}
                        placeholder="MM/YY"
                      />
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        placeholder="CVV"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleConfirmOrder}
                    className="confirm-button"
                    disabled={!paymentMethod || isLoading}
                  >
                    {isLoading ? "Processing..." : "Confirm Order"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </div>

      {/* Success Alert */}
      <div className={`alert-overlay ${showSuccessAlert ? 'show' : ''}`}>
        <div className={`alert-box ${showTick ? 'show-tick' : ''}`}>
          <div className="alert-icon">
            {showTick ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="green" className="alert-tick-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="green" className="alert-spinner">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V3m0 18v-3m3.372-7.372l2.121-2.121M3.707 9.707L5.828 7.586m12.728 0l2.121-2.121m-5.197 5.197l2.121 2.121" />
              </svg>
            )}
          </div>
          <div className="alert-message">{successMessage}</div>
          <button className="alert-button" onClick={() => navigate('/main')}>Close</button>
        </div>
      </div>
    </main>
  );
}
