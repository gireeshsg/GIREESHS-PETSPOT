// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { mycontext } from "../Context";
// import './buy.css';

// export default function BuyNowPage() {
//   const { productId } = useParams();
//   const [specificProduct, setSpecificProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//   const [cardDetails, setCardDetails] = useState({ cardNumber: '', expirationDate: '', cvv: '' });
//   const [currentStep, setCurrentStep] = useState(1);
//   const { addressDetails, setAddressDetails } = useContext(mycontext);
//   const [userAddresses, setUserAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null); // for selecting an address
//   const navigate = useNavigate();
//   const [showTick, setShowTick] = useState(false);

//   useEffect(() => {
//     // Fetch product details
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/user/products/${productId}`, { withCredentials: true });
//         setSpecificProduct(response.data.specificProduct);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [productId]);

//   useEffect(() => {
//     // Fetch saved user addresses
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/user/addresses", { withCredentials: true });
//         setUserAddresses(response.data.addresses);
//         if (response.data.addresses.length > 0) {
//           setSelectedAddress(response.data.addresses[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//       }
//     };

//     fetchAddresses();
//   }, []);

//   // Handle address selection
//   const handleAddressSelect = (address) => {
//     setSelectedAddress(address);
//     setAddressDetails(address); // Update global context with selected address
//   };

//   const validateAddress = () => {
//     const requiredFields = ["pincode", "locality", "address", "city", "state", "landmark", "addressType", "phone"];
//     const missingFields = requiredFields.filter(field => !addressDetails[field] || addressDetails[field].trim() === "");
//     if (missingFields.length > 0) {
//       alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
//       return false;
//     }
//     return true;
//   };

//   const handleBuyNow = () => {
//     if (!validateAddress() || quantity <= 0 || (specificProduct && quantity > specificProduct.stock)) {
//       alert("Invalid quantity or out of stock.");
//       return;
//     }
//     setCurrentStep(2);
//   };

//   const handleConfirmOrder = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("No token found. Please log in again.");
//       return;
//     }
//     setShowSuccessAlert(true);
//     setIsLoading(true);
//     const headers = { Authorization: `Bearer ${token}` };
//     const payload = {
//       productId,
//       quantity,
//       addressDetails,
//       paymentMethod,
//       cardDetails: paymentMethod === 'online_payment' ? cardDetails : undefined,
//     };

//     try {
//       const response = await axios.post("http://localhost:5000/user/buy", payload, { headers, withCredentials: true });

//       if (response.data.error) {
//         alert(response.data.error);
//         return;
//       }

//       if (paymentMethod === 'cash_on_delivery') {
//         setSuccessMessage("Order placed successfully! Please pay cash on delivery.");
//       } else {
//         setSuccessMessage("Payment successful! Your order has been placed.");
//       }

//       setShowSuccessAlert(true);
//     } catch (error) {
//       console.error("Error during purchase:", error.response?.data || error);
//       alert(error.response?.data?.error || "There was an issue completing your purchase.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePaymentMethodSelection = (method) => {
//     setPaymentMethod(method);
//   };

//   const handleQuantityChange = (e) => {
//     const newQuantity = Math.max(1, Math.min(parseInt(e.target.value), specificProduct.stock));
//     setQuantity(newQuantity);
//   };

//   const totalPrice = specificProduct ? (specificProduct.price * quantity).toFixed(2) : 0;

//   return (
//     <main className="buy-now-main">
//       <div className="buy-now-container">
//         {loading ? (
//           <p>Loading...</p>
//         ) : specificProduct ? (
//           <div className="buy-now-content">
//             {/* Step Indicator */}
//             <div className="step-indicator">
//               <div className={`step ${currentStep === 1 ? 'active' : ''}`}><span>1</span></div>
//               <div className={`line ${currentStep > 1 ? 'completed' : ''}`}></div>
//               <div className={`step ${currentStep === 2 ? 'active' : ''}`}><span>2</span></div>
//             </div>

//             {/* Main Content */}
//             <div className="purchase-sections">
//               {/* Product Details Section */}
//               <div className="product-details">
//                 <h1 className="product-title">{specificProduct.breed} {specificProduct.category}</h1>
//                 <img src={specificProduct.image} alt={specificProduct.breed} className="product-image" />
//                 <p className="product-price">Price per unit: ₹{specificProduct.price.toFixed(2)}</p>
//                 <p className="product-description">{specificProduct.description}</p>
//                 <p className="product-stock">Stock Available: {specificProduct.stock}</p>
//                 {specificProduct.stock === 0 && <p className="out-of-stock">Out of Stock</p>}
//               </div>

//               {/* Shipping Address Section */}
//               <div className="shipping-address">
//                 <h3>Shipping Address:</h3>

//                 {/* Display Saved Addresses */}
//                 <div className="saved-addresses">
//                   <h4>Saved Addresses:</h4>
//                   {userAddresses.length > 0 ? (
//                     userAddresses.map((address, index) => (
//                       <div
//                         key={index}
//                         className={`address-card ${selectedAddress?.phone === address.phone ? 'selected' : ''}`}
//                         onClick={() => handleAddressSelect(address)}
//                       >
//                         <p>{address.address}, {address.city}, {address.state}</p>
//                         <p>{address.phone}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No saved addresses available</p>
//                   )}
//                 </div>

//                 {/* Address Fields Form */}
//                 <div className="address-fields-form">
//                   <h4>Or, Add New Address:</h4>
//                   <input
//                     type="text"
//                     placeholder="Street Address"
//                     value={addressDetails.address || ''}
//                     onChange={(e) => setAddressDetails({ ...addressDetails, address: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     placeholder="City"
//                     value={addressDetails.city || ''}
//                     onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     placeholder="State"
//                     value={addressDetails.state || ''}
//                     onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Pincode"
//                     value={addressDetails.pincode || ''}
//                     onChange={(e) => setAddressDetails({ ...addressDetails, pincode: e.target.value })}
//                   />
//                   <input
//                     type="tel"
//                     placeholder="Phone"
//                     value={addressDetails.phone || ''}
//                     onChange={(e) => setAddressDetails({ ...addressDetails, phone: e.target.value })}
//                   />
//                 </div>

//                 {/* Quantity Section */}
//                 <div className="quantity-selection">
//                   <label>Quantity:</label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={quantity}
//                     onChange={handleQuantityChange}
//                     max={specificProduct.stock}
//                   />
//                   <p>Total Price: ₹{totalPrice}</p>
//                 </div>

//                 {/* Buy Now Button */}
//                 <button onClick={handleBuyNow} className="buy-now-button" disabled={isLoading || specificProduct.stock === 0}>
//                   {isLoading ? "Processing..." : "Confirm Purchase"}
//                 </button>
//               </div>
//             </div>

//             {/* Payment Method Section */}
//             {currentStep === 2 && (
//               <div className="payment-methods-section">
//                 <h3>Select Payment Method:</h3>
//                 <div className="payment-method-options">
//                   <div
//                     onClick={() => handlePaymentMethodSelection('cash_on_delivery')}
//                     className={`payment-method-option ${paymentMethod === 'cash_on_delivery' ? 'selected' : ''}`}
//                   >
//                     <span>💵</span> Cash on Delivery
//                   </div>
//                   <div
//                     onClick={() => handlePaymentMethodSelection('online_payment')}
//                     className={`payment-method-option ${paymentMethod === 'online_payment' ? 'selected' : ''}`}
//                   >
//                     <span>💳</span> Online Payment
//                   </div>
//                 </div>

//                 {paymentMethod === 'online_payment' && (
//                   <div className="card-details-form">
//                     <input
//                       type="text"
//                       value={cardDetails.cardNumber}
//                       onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
//                       placeholder="Card Number"
//                     />
//                     <input
//                       type="text"
//                       value={cardDetails.expirationDate}
//                       onChange={(e) => setCardDetails({ ...cardDetails, expirationDate: e.target.value })}
//                       placeholder="MM/YY"
//                     />
//                     <input
//                       type="text"
//                       value={cardDetails.cvv}
//                       onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
//                       placeholder="CVV"
//                     />
//                   </div>
//                 )}

//                 <button onClick={handleConfirmOrder} className="confirm-button" disabled={!paymentMethod || isLoading}>
//                   {isLoading ? "Processing..." : "Confirm Order"}
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <p>Product not found</p>
//         )}
//       </div>

//       {/* Success Alert */}
//       <div className={`alert-overlay ${showSuccessAlert ? 'show' : ''}`}>
//         <div className={`alert-box ${showTick ? 'show-tick' : ''}`}>
//           <div className="alert-icon">
//             {showTick ? (
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="green" className="alert-tick-icon">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="green" className="alert-spinner">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V3m0 18v-3m3.372-7.372l2.121-2.121M3.707 9.707L5.828 7.586m12.728 0l2.121-2.121m-5.197 5.197l2.121 2.121" />
//               </svg>
//             )}
//           </div>
//           <div className="alert-message">{successMessage}</div>
//           <button className="alert-button" onClick={() => navigate('/main')}>Close</button>
//         </div>
//       </div>
//     </main>
//   );
// }
