// import React, { useState, useContext } from 'react';
// import './payment.css'; // Optional CSS for styling
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios'; // Import axios for making HTTP requests
// import { mycontext } from '../Context'; // Assuming you have a context for address management

// const PaymentPage = () => {
//   const { addressDetails } = useContext(mycontext); // Get address details from context
//   const [paymentMethod, setPaymentMethod] = useState('cash'); // Default payment method
//   const [cardNumber, setCardNumber] = useState('');
//   const [cardExpiry, setCardExpiry] = useState('');
//   const [cardCVC, setCardCVC] = useState('');
//   const [paymentSuccess, setPaymentSuccess] = useState(false); // State for payment success
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   const handlePayment = async () => {
//     // Simple validation
//     if (paymentMethod === 'card') {
//       if (!cardNumber || !cardExpiry || !cardCVC) {
//         toast.error("Please fill in all card fields.");
//         return;
//       }

//       // Basic regex validation (optional)
//       const cardNumberValid = /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
//       const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry);
//       const cvcValid = /^\d{3}$/.test(cardCVC);

//       if (!cardNumberValid || !expiryValid || !cvcValid) {
//         toast.error("Please enter valid card details.");
//         return;
//       }
//     }

//     // Prepare the purchase data
//     const payload = {
//       productId: "YOUR_PRODUCT_ID", // Replace with actual product ID
//       quantity: 1, // Adjust as needed
//       addressDetails,
//       paymentMethod: paymentMethod === 'card' ? 'online_payment' : 'cash_on_delivery',
//     };

//     setIsLoading(true);

//     try {
//       const response = await axios.post('http://localhost:5000/user/purchase', payload, { withCredentials: true });
//       toast.success(response.data.message);
//       setPaymentSuccess(true);
//       resetFields();
//     } catch (error) {
//       console.error("Error during purchase:", error);
//       toast.error(error.response?.data?.error || "There was an issue processing your payment.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetFields = () => {
//     setCardNumber('');
//     setCardExpiry('');
//     setCardCVC('');
//     setPaymentMethod('cash');
//     setPaymentSuccess(false);
//   };

//   return (
//     <div className="payment-page">
//       <h1>Payment Page</h1>
//       <div className="payment-methods">
//         <label>
//           <input
//             type="radio"
//             value="cash"
//             checked={paymentMethod === 'cash'}
//             onChange={() => setPaymentMethod('cash')}
//           />
//           Cash on Delivery
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="card"
//             checked={paymentMethod === 'card'}
//             onChange={() => setPaymentMethod('card')}
//           />
//           Credit/Debit Card
//         </label>
//       </div>

//       {paymentMethod === 'card' && (
//         <div className="card-details">
//           <input
//             type="text"
//             placeholder="Card Number"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             maxLength="19" // Format for card number with spaces
//           />
//           <input
//             type="text"
//             placeholder="Expiry Date (MM/YY)"
//             value={cardExpiry}
//             onChange={(e) => setCardExpiry(e.target.value)}
//             maxLength="5" // Format MM/YY
//           />
//           <input
//             type="text"
//             placeholder="CVC"
//             value={cardCVC}
//             onChange={(e) => setCardCVC(e.target.value)}
//             maxLength="3" // CVC length
//           />
//         </div>
//       )}

//       <button onClick={handlePayment} className="pay-button" disabled={isLoading}>
//         {isLoading ? "Processing..." : "Pay Now"}
//       </button>
//       {paymentSuccess && <div className="payment-success-animation">✔️</div>}
//       <ToastContainer />
//     </div>
//   );
// };

// export default PaymentPage;
