// import React, { useContext, useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { mycontext } from '../Context';
// import axios from "axios";
// import './home.css';
// import Navbar from '../Navabar/navabar'; 
// import SortingOptions from '../animations/sorting';
// import { FaInstagram, FaHeart, FaTwitter, FaRegHeart, FaFacebookF } from "react-icons/fa";

// const Dog = () => {
//   const { products, setProducts, isLoggedIn } = useContext(mycontext);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });
//   const [category, setCategory] = useState('Dog'); // Set default category

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

//   const fetchWishlistItems = async () => {
//     if (isLoggedIn) {
//       try {
//         const response = await axios.get("http://localhost:5000/user/getWishlist", { withCredentials: true });
//         const items = response.data.wishlistItems.map(item => item._id);
//         setWishlistItems(items);
//         return items;
//       } catch (error) {
//         console.error("Error fetching wishlist items:", error);
//         return [];
//       }
//     }
//     return [];
//   };

//   const fetchProductsByCategory = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/user/products/category/${category}`, { withCredentials: true });
      
//       const [fetchedCartItems, fetchedWishlistItems] = await Promise.all([
//         fetchCartItems(),
//         fetchWishlistItems(),
//       ]);
  
//       const updatedProducts = response.data.map(product => ({
//         ...product,
//         inCart: fetchedCartItems.includes(product._id),
//         inWishlist: fetchedWishlistItems.includes(product._id),
//       }));
  
//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [category, setProducts]);

//   useEffect(() => {
//     fetchProductsByCategory();
//   }, [category, fetchProductsByCategory]);

//   const handleCategoryChange = (newCategory) => {
//     setCategory(newCategory);
//   };

//   const addToCart = async (productId) => {
//     if (!isLoggedIn) {
//       alert("Please login to add to cart");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:5000/user/addToCart", { productId }, { withCredentials: true });
//       if (response.status === 200) {
//         const updatedProducts = products.map(product =>
//           product._id === productId ? { ...product, inCart: true } : product
//         );
//         setProducts(updatedProducts);
//         alert("Product added to cart successfully");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         alert("Product already in cart");
//       } else {
//         console.error("Error adding product to cart:", error);
//         alert("Failed to add product to cart");
//       }
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5000/user/cart`, {
//         data: { productId },
//         withCredentials: true,
//       });
//       const updatedProducts = products.map(product =>
//         product._id === productId ? { ...product, inCart: false } : product
//       );
//       setProducts(updatedProducts);
//       alert("Product removed from cart successfully");
//     } catch (err) {
//       console.error("Error removing product from cart:", err);
//       alert("Failed to remove product from cart");
//     }
//   };

//   const addToWishlist = async (productId) => {
//     if (!isLoggedIn) {
//       alert("Please login to add to wishlist");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:5000/user/addToWishlist", { productId }, { withCredentials: true });
//       if (response.status === 200) {
//         const updatedProducts = products.map(product =>
//           product._id === productId ? { ...product, inWishlist: true } : product
//         );
//         setProducts(updatedProducts);
//         setWishlistItems(prev => [...prev, productId]);
//         alert("Product added to wishlist successfully");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         alert("Product already in wishlist");
//       } else {
//         console.error("Error adding product to wishlist:", error);
//         alert("Failed to add product to wishlist");
//       }
//     }
//   };
  
//   const removeFromWishlist = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5000/user/wishlist`, {
//         data: { productId },
//         withCredentials: true,
//       });
//       const updatedProducts = products.map(product =>
//         product._id === productId ? { ...product, inWishlist: false } : product
//       );
//       setProducts(updatedProducts);
//       alert("Product removed from wishlist successfully");
//     } catch (err) {
//       console.error("Error removing product from wishlist:", err);
//       alert("Failed to remove product from wishlist");
//     }
//   };

//   const handleCartAction = async (product) => {
//     if (product.inCart) {
//       await removeFromCart(product._id);
//     } else {
//       await addToCart(product._id);
//     }
//   };

//   const handleWishlistAction = async (product) => {
//     if (product.inWishlist) {
//       await removeFromWishlist(product._id);
//     } else {
//       await addToWishlist(product._id);
//     }
//   };

//   const handleDoubleClick = (id) => {
//     navigate(`/details/${id}`);
//   };
//   // Add your cart and wishlist handling functions here (addToCart, removeFromCart, etc.)

//   return (
//     <main>
//       <Navbar />
//       <header className='main-section'>
//         <div>
//           <SortingOptions />
//           {/* Category buttons */}
//         </div>
//         <div className='card-container'>
//           {products.map((product) => (
//             <div key={product._id} className="pet-card">
//               <div className="pet-card-image-container">
//                 <img src={product.image} className="pet-card-image" alt={product.name} />
//                 <button className="like-button" onClick={() => handleWishlistAction(product)}>
//                   {product.inWishlist ? <FaHeart className="icon.liked" /> : <FaRegHeart className="icon" />}
//                 </button>       
//               </div>
//               <div className="pet-card-details">
//                 <p>{product.gender} {product.category}</p>
//                 <h3>{product.breed}</h3>
//                 <h4>${product.price}</h4>
//                 <div className="pet-card-buttons">
//                   <button className='view-button' onClick={() => handleCartAction(product)}>
//                     {cartItems.includes(product._id) ? "Remove from Cart" : "Add to Cart"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </header>
//       <footer className="footer">
//         <div className="footer-content">
//           {/* Your footer content */}
//         </div>
//       </footer>
//     </main>
//   );
// };

// export default Dog;
