// import React, { useContext, useEffect, useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./food.css";
// import { mycontext } from "../Context";
// import Navbar from "../Navabar/navabar";
// import { FaInstagram, FaHeart, FaTwitter, FaFacebookF } from "react-icons/fa";

// export default function Food() {
//   const { petFoods, setPetFoods, isLoggedIn, setIsLoggedIn } = useContext(mycontext);
  
//   const [loading, setLoading] = useState(false);
//   const [newItems,setNewItems]=useState([])
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   const nav = useNavigate();

//   const fetchCartItems = async () => {
//     if (isLoggedIn) {
//       try {
//         const response = await axios.get("http://localhost:5000/user/getCart", { withCredentials: true });
//         return response.data.cartItems.map(item => item._id);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         return [];
//       }
//     }
//     return [];
//   };


//   const loggedUser = JSON.parse(localStorage.getItem("user"));

//   console.log("loggedUser",loggedUser.email);
  
//   const fetchPetFoods = useCallback(async () => {
//     const token = localStorage.getItem("token");
//     const adminToken=localStorage.getItem("adminToken")
//     const email=localStorage.getItem("email")
//     const headers = adminToken ? { Authorization: `Bearer ${adminToken}` } : { Authorization: `Bearer ${token}` };
//     try {
//       setLoading(true);
//       const response = await axios.post("http://localhost:5000/user/getPetFood", { email:loggedUser.email }
//     //     {
//     //     headers: headers,
//     //     withCredentials: true,
//     // }
//   );
//       const cartItems = await fetchCartItems();
//       const updatedPetFoods = response.data.allPetFoods.map(petFood => ({
//         ...petFood,
//         inCart: cartItems.includes(petFood._id),
//       }));
//       //{ allProducts: petFoodsWithCartStatus }
//       setNewItems(response)
//       setPetFoods(updatedPetFoods);
//       localStorage.setItem("petFoods", JSON.stringify(updatedPetFoods)); // Save to localStorage
//     } catch (error) {
//       console.error("Error fetching pet foods:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [setPetFoods,isLoggedIn]);

//   console.log("new items",newItems,petFoods);
  

//   const addToCart = async (petFoodId) => {
//     if (!isLoggedIn) {
//       alert("Please login to add to cart");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/addToCartPetFood",
//         { petFoodId },
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         const updatedPetFoods = petFoods.map(petFood =>
//           petFood._id === petFoodId ? { ...petFood, inCart: true } : petFood
//         );
//         setPetFoods(updatedPetFoods);
//         localStorage.setItem("petFoods", JSON.stringify(updatedPetFoods)); // Update localStorage
//         alert("Pet food added to cart successfully");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         alert("Pet food already in cart");
//       } else {
//         console.error("Error adding pet food to cart:", error);
//         alert("Failed to add pet food to cart");
//       }
//     }
//   };

//   const removeFromCart = async (petFoodId) => {
//     try {
//       await axios.delete(`http://localhost:5000/user/cart`, {
//         data: { petFoodId },
//         withCredentials: true,
//       });
//       const updatedPetFoods = petFoods.map(petFood =>
//         petFood._id === petFoodId ? { ...petFood, inCart: false } : petFood
//       );
//       setPetFoods(updatedPetFoods);
//       localStorage.setItem("petFoods", JSON.stringify(updatedPetFoods)); // Update localStorage
//       alert("Pet food removed from cart successfully");
//     } catch (err) {
//       console.error("Error removing pet food from cart:", err);
//       alert("Failed to remove pet food from cart");
//     }
//   };

//   const handleCartAction = async (petFood) => {
//     if (petFood.inCart) {
//       await removeFromCart(petFood._id);
//     } else {
//       await addToCart(petFood._id);
//     }
//   };

//   useEffect(() => {
//     const storedPetFoods = localStorage.getItem("petFoods");
//     if (storedPetFoods) {
//       setPetFoods(JSON.parse(storedPetFoods)); // Load from localStorage on initial render
//     } else {
//       fetchPetFoods(); // Fetch from API if nothing is in localStorage
//     }
//   }, [fetchPetFoods, setPetFoods]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <main>
//       <Navbar />
//       <header className='main-section'>
//         <div className='card-container'>
//           {petFoods.map((petFood) => (
//             <div key={petFood._id} className="petd-card">
//               <div className="petd-card-image-container">
//                 <img src={petFood.image} className="pet-card-image" alt={petFood.category} />
//               </div>
//               <div className="petd-card-details">
//                 <h3 className="petd-card-brand">{petFood.brand}</h3>
//                 <p className="petd-card-quantity">{petFood.quantity} {petFood.units}</p>
//                 <h4 className="petd-card-category">{petFood.category}</h4>
//                 <h4 className="petd-card-price">${petFood.foodprice}</h4>
//                 <div className="petd-card-buttons">
//                   <button className='view-button' onClick={() => handleCartAction(petFood)}>
//                     {petFood.inCart ? "Remove from Cart" : "Add to Cart"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </header>

//       {/* Footer Section */}
//       <footer className="footer">
//         <div className="footer-content">
//           <div className="footer-logo">
//             <h1>petspot</h1>
//           </div>
//           <div className="footer-links">
//             <ul>
//               <li><a href="#about">About Us</a></li>
//               <li><a href="#services">Our Services</a></li>
//               <li><a href="#contact">Contact</a></li>
//               <li><a href="#privacy">Privacy Policy</a></li>
//             </ul>
//           </div>
//           <div className="social-icons">
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//               <FaInstagram />
//             </a>
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//               <FaFacebookF />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//               <FaTwitter />
//             </a>
//           </div>
//           <p>&copy; 2024 Your Company Name. All rights reserved.</p>
//         </div>
//       </footer>
//     </main>
//   );
// }
