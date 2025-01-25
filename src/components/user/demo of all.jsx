// cart.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { mycontext } from "../Context";
// import "./cart.css";

// const { default: Dog } = require("../navlnks/dog");//ith check cheynm indo ne

// export default function Cart() {
//   const { setCartItems, setIsLoggedIn, isLoggedIn } = useContext(mycontext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [cartItems, setCartItemsState] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const nav = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//       fetchCartItems(); // Fetch cart items if user is logged in
//     }
//   }, [setIsLoggedIn]);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       setCartItemsState([]);
//       setCartItems([]); // Clear context cart items
//       setTotalAmount(0); // Reset total amount
//       localStorage.removeItem("cartItems"); // Clear local storage
//     } else {
//       // Load cart items from local storage if user is logged in
//       const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//       setCartItemsState(savedCart);
//       setCartItems(savedCart); // Update context
//       calculateTotalAmount(savedCart);
//     }
//   }, [isLoggedIn, setCartItems]);

//   const fetchCartItems = async () => {
//     if (!isLoggedIn) return; // Only fetch if logged in
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/user/cart", {
//         withCredentials: true,
//       });
//       const fetchedCart = response.data.cart;
//       setCartItemsState(fetchedCart);
//       setCartItems(fetchedCart); // Update context
//       localStorage.setItem("cartItems", JSON.stringify(fetchedCart)); // Save to local storage
//       calculateTotalAmount(fetchedCart);
//     } catch (err) {
//       setError("Failed to fetch cart items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateTotalAmount = (items) => {
//     const total = items.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
//     setTotalAmount(total);
//   };

//   const updateLocalStorage = (updatedCart) => {
//     localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update local storage
//   };

//   const handleIncrease = (productId) => {
//     const updatedCart = cartItems.map(item =>
//       item._id === productId ? { ...item, qty: (item.qty || 1) + 1 } : item
//     );
//     setCartItemsState(updatedCart);
//     setCartItems(updatedCart); // Update context
//     updateLocalStorage(updatedCart); // Update local storage
//     calculateTotalAmount(updatedCart);
//   };

//   const handleDecrease = (productId) => {
//     const updatedCart = cartItems.map(item =>
//       item._id === productId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
//     );
//     setCartItemsState(updatedCart);
//     setCartItems(updatedCart); // Update context
//     updateLocalStorage(updatedCart); // Update local storage
//     calculateTotalAmount(updatedCart);
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       await axios.delete("http://localhost:5000/user/cart", {
//         data: { productId },
//         withCredentials: true,
//       });
//       const updatedCart = cartItems.filter(item => item._id !== productId);
//       setCartItemsState(updatedCart);
//       setCartItems(updatedCart); // Update context
//       updateLocalStorage(updatedCart); // Update local storage
//       calculateTotalAmount(updatedCart);
//     } catch (err) {
//       console.error("Error removing product from cart:", err);
//       setError("Failed to remove product from cart");
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <header className="bod">
//       <div className="container">
//         <h1 className="cart-title">Your Cart</h1>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty</p>
//         ) : (
//           <div>
//             <h2 className="cart-subtitle">Cart Items:</h2>
//             <ul className="cart-items">
//               {cartItems.map((item) => (
//                 <li key={item._id} className="cart-item">
//                   <img src={item.image} alt={item.name} className="product-image" />
//                   <div className="item-details">
//                     <strong>{item.name}</strong>
//                     <p>Category: {item.category}</p>
//                     <p>Breed: {item.breed}</p>
//                     <p>Price: ₹{item.price}</p>
//                     <p>Quantity: {item.qty || 1}</p>
//                     <p>Total: ₹{parseInt(item.price) * (item.qty || 1)}</p>
//                   </div>
//                   <div className="item-actions">
//                     <button className="buttoonn" onClick={() => handleIncrease(item._id)}>+</button>
//                     <button className="buttounn" onClick={() => handleDecrease(item._id)}>-</button>
//                     <button className="buttonn" onClick={() => removeFromCart(item._id)}>Remove</button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <h3 className="total-amount">Total Amount: ₹{totalAmount}</h3>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }


// home.jsx//ithine tazhe home code

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { mycontext } from '../Context';
// import axios from "axios";
// import Marquee from '../animations/marquee';
// import { useCallback } from 'react';

// import './home.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as RegularHeart } from '@fortawesome/free-regular-svg-icons';

// import Pagination from '../animations/pagination';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Navbar from '../Navabar/navabar'; 
// import SortingOptions from '../animations/sorting';
// import { FaInstagram, FaHeart, FaTwitter,FaRegHeart, FaShoppingCart,FaYoutube, FaFacebookF } from "react-icons/fa";
// ; // Import the Pagination component

// const Card = () => {
//   const { products, setProducts, sortingOptions,isLoggedIn,setIsLoggedIn } = useContext(mycontext);
//   const navigate = useNavigate();
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     return storedCartItems ? JSON.parse(storedCartItems) : [];

//   });
 
//   const [isVisible, setIsVisible] = useState(false);

//   const handleMouseEnter = () => {
//     setIsVisible(true);
//     setTimeout(() => {
//       setIsVisible(false);
//     }, 5000); // Hide price after 5 seconds
//   };

//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 12; // Adjust this to change how many products to display per page
//   // const fetchCartItems = async () => {
//   //   if (isLoggedIn) {
//   //     try {
//   //       const response = await axios.get("http://localhost:5000/user/getCart", { withCredentials: true });
//   //       return response.data.cartItems.map(item => item._id);
//   //     } catch (error) {
//   //       console.error("Error fetching cart items:", error);
//   //       return [];
//   //     }
//   //   }
//   //   return [];
//   // };
//   // const addToCart = async (productId) => {
//   //   if (!isLoggedIn) {
//   //     alert("Please login to add to cart");
//   //     return;
//   //   }
//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:5000/user/addToCart",
//   //       { productId },
//   //       { withCredentials: true }
//   //     );
//   //     if (response.status === 200) {
//   //       const updatedProducts = products.map(product =>
//   //         product._id === productId ? { ...product, inCart: true } : product
//   //       );
//   //       setProducts(updatedProducts);
//   //       alert("Product added to cart successfully");
//   //     }
//   //   } catch (error) {
//   //     if (error.response && error.response.status === 409) {
//   //       alert("Product already in cart");
//   //     } else {
//   //       console.error("Error adding product to cart:", error);
//   //       alert("Failed to add product to cart");
//   //     }
//   //   }
//   // };
  
//   // const removeFromCart = async (productId) => {
//   //   try {
//   //     await axios.delete(`http://localhost:5000/user/cart`, {
//   //       data: { productId },
//   //       withCredentials: true,
//   //     });
//   //     const updatedProducts = products.map(product =>
//   //       product._id === productId ? { ...product, inCart: false } : product
//   //     );
//   //     setProducts(updatedProducts);
//   //     alert("Product removed from cart successfully");
//   //   } catch (err) {
//   //     console.error("Error removing product from cart:", err);
//   //     alert("Failed to remove product from cart");
//   //   }
//   // };
  
//   // const handleCartAction = (product) => {
//   //   if (cartItems.includes(product._id)) {
//   //     removeFromCart(product._id);
//   //   } else {
//   //     addToCart(product._id);
//   //   }
//   // };
  
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
//   };const handleDoubleClick = (id) => {
//     navigate(`/product/${id}`);
//   };
  
//   // Example button component
  

//   // Fetch products and update their inCart status based on the fetched cart items
//   const fetchProducts = useCallback(async () => {
//     const token = localStorage.getItem("token");
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/user/getProducts", {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
  
//       const [cartItems, wishlistItems] = await Promise.all([
//         fetchCartItems(),
//         fetchWishlistItems(),
//       ]);
  
//       const updatedProducts = response.data.allProducts.map(product => ({
//         ...product,
//         inCart: cartItems.includes(product._id),       // Check if in cart
//         inWishlist: wishlistItems.includes(product._id) // Check if in wishlist
//       }));
  
//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [setProducts, isLoggedIn]);
  
//   const addToCart = async (productId) => {
//     if (!isLoggedIn) {
//       alert("Please login to add to cart");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/addToCart",
//         { productId },
//         { withCredentials: true }
//       );
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
//   const addToWishlist = async (productId) => {
//     if (!isLoggedIn) {
//       alert("Please login to add to wishlist");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/addToWishlist",
//         { productId },
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         const updatedProducts = products.map(product =>
//           product._id === productId ? { ...product, inWishlist: true } : product
//         );
//         setProducts(updatedProducts);
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
  

//   const handleCartAction = async (product) => {
//     if (product.inCart) {
//       await removeFromCart(product._id);
//     } else {
//       await addToCart(product._id);
//     }
//   };
//   const fetchWishlistItems = async () => {
//     if (isLoggedIn) {
//       try {
//         const response = await axios.get("http://localhost:5000/user/getWishlist", { withCredentials: true });
//         return response.data.wishlistItems.map(item => item._id);
//       } catch (error) {
//         console.error("Error fetching wishlist items:", error);
//         return [];
//       }
//     }
//     return [];
//   };
//   // Fetch products and update their inWishlist status based on the fetched wishlist items
  
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
  
//   const handleWishlistAction = async (product) => {
//     if (product.inWishlist) {
//       await removeFromWishlist(product._id);
//     } else {
//       await addToWishlist(product._id);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }
  
  


//   const getFilteredProducts = () => {
//     let filteredProducts = [...products];

//     // Filter by category
//     if (sortingOptions.category !== 'all') {
//         filteredProducts = filteredProducts.filter(product => 
//             product.category.toLowerCase() === sortingOptions.category.toLowerCase()
//         );
//     }

//     // Filter by breed
//     if (sortingOptions.breed.length > 0) {
//         filteredProducts = filteredProducts.filter(product => 
//             sortingOptions.breed.includes(product.breed)
//         );
//     }

//     // Filter by sizes
//     if (sortingOptions.sizes.length > 0) {
//         filteredProducts = filteredProducts.filter(product => 
//             product.size && sortingOptions.sizes.includes(product.size)
//         );
//     }

//     // Filter by gender
//     if (sortingOptions.gender.length > 0) {
//         filteredProducts = filteredProducts.filter(product => 
//             sortingOptions.gender.includes(product.gender)
//         );
//     }

//     // Filter by price range
//     filteredProducts = filteredProducts.filter(product => 
//         product.price >= sortingOptions.priceRange[0] && product.price <= sortingOptions.priceRange[1]
//     );

//     // Sort products based on selected sorting option
//    // Sort products based on selected sorting option
// if (sortingOptions.priceSort) {
//   filteredProducts.sort((a, b) => {
//       if (sortingOptions.priceSort === 'lowToHigh') {
//           return a.price - b.price; // Ascending order
//       } else if (sortingOptions.priceSort === 'highToLow') {
//           return b.price - a.price; // Descending order
//       }
//       return 0;
//   });
// }


//     return filteredProducts;
// };

// // Pagination logic
// const filteredProducts = getFilteredProducts();
// const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
// const indexOfLastProduct = currentPage * productsPerPage;
// const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
// const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <main className='bf'>
//       <Marquee />
//       <div className="carousel-container">
//         <Carousel
//           showThumbs={false}
//           showStatus={false}
//           autoPlay
//           infiniteLoop
//           emulateTouch
//           useKeyboardArrows
//           showArrows={true}
//           dynamicHeight={false}
//         >
//                 <div className="carousel-item">
//         <img src="https://cdn.pixabay.com/photo/2017/08/07/18/57/dog-2606759_640.jpg" alt="Book 1" />
//         <img src="https://t3.ftcdn.net/jpg/02/27/76/44/240_F_227764486_nAcFB4FnDTiyk0WLgKBXArOsqaUCuk7X.jpg" alt="Book 2" />
//         <img src="https://cdn.pixabay.com/photo/2013/07/18/01/37/kat-163341_960_720.jpg" alt="Book 3" />
//       </div>
//       <div className="carousel-item">
//         <img src="https://cdn.pixabay.com/photo/2023/10/01/12/56/shih-tzu-8287355_960_720.jpg" alt="Book 2" />
//         <img src="https://cdn.pixabay.com/photo/2024/04/10/14/29/dog-8688183_640.jpg" alt="Book 2" />
//         <img src="https://cdn.pixabay.com/photo/2022/10/31/19/04/dog-7560602_1280.jpg" alt="Book 2" />
//       </div>
//       <div className="carousel-item">
//         <img src="https://img.freepik.com/premium-photo/closeup-shot-cat-licking-ear-rabbit-isolated-white_926199-4090218.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 3" />
//         <img src="https://img.freepik.com/premium-photo/group-rabbits-are-laying-couch-one-is-holding-rabbit_1293074-193269.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 3" />
//         <img src="https://img.freepik.com/premium-photo/checkered-giant-rabbit-parakeet_87557-4781.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 3" />
//       </div>
//       <div className="carousel-item">
//         <img src="https://img.freepik.com/premium-photo/close-up-shot-cute-pet-animals-generative-ai_658559-3543.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 4" />
//         <img src="https://img.freepik.com/premium-photo/dog-rabbit-are-rabbit-rabbit_1293074-193301.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 4" />
//         <img src="https://img.freepik.com/premium-photo/dog-is-looking-rabbit-rabbit-is-rabbit_1276068-24072.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 4" />
//       </div>
//       <div className="carousel-item">
//         <img src="https://cdn.pixabay.com/photo/2022/02/01/11/48/woman-6986050_640.jpg" alt="Book 5" />
//         <img src="https://cdn.pixabay.com/photo/2019/12/22/17/13/french-bulldog-4713013_640.jpg" alt="Book 5" />
//         <img src="https://cdn.pixabay.com/photo/2022/04/18/16/20/animal-7140980_640.jpg" alt="Book 5" />
//       </div>
//           {/* Carousel items here... */}
//         </Carousel>
//       </div>
//       <Navbar />
     

     
      
//       <header className='main-section'>

//         <div className='card-container'>
//           {currentProducts.length > 0 ? (
//             currentProducts.map((product) => (
//               <div 
//                 key={product._id}
//                 className="pet-card" 
//                 onDoubleClick={() => handleDoubleClick(product._id)}
//               >
//                 <div className="pet-card-image-container"onMouseEnter={handleMouseEnter} 
//       onMouseLeave={() => setIsVisible(false)}
//       >
//                   <img src={product.image} className="pet-card-image"  />
//                   <button className="like-button" onClick={() => handleWishlistAction(product)}>
//   {wishlistItems.includes(product._id) ? (
//     <FaHeart className="icon -liked" /> // Filled heart for liked
//   ) : (
//     <FaRegHeart className="icon" /> // Outline heart for unliked
//   )}
// </button>
             

//                 </div>
               
//                 <div className="pet-card-details">
//                 <h3 className="pet-info">
//         <span className="pet-gender">{product.gender}</span> <span className="pet-category">{product.category}</span>
//     </h3>
//     <h3 className="pet-breed">{product.breed}</h3>
//                   <h4 className="pet-card-price">Price: ₹{product.price}</h4>
              
                
// <div className="pet-cardg-buttons">
//     <button className='cartg-button' onClick={() => handleCartAction(product)}>
//         <FaShoppingCart className="cart-icon" />
//         {cartItems.includes(product._id) ? "Remove from Cart" : "Add to Cart"}
//     </button>


  
//                     {/* <button className='view-buttonn'>view</button> */}
//                   </div>
//                 </div>
//               </div>
              
//             ))
//           ) : (
//             <div>No products found matching your criteria.</div>
            
//           )}
//            <Pagination 
//           currentPage={currentPage} 
//           totalPages={totalPages} 
//           onPageChange={handlePageChange} 
//         />    
//         </div>
       
//         {/* Pagination */}
        
//       </header>
    
//       {/* Footer Section */}
//       <footer className="footer">
//   <div className="footer-content">
//     <div className="footer-logo">
//       <h1>PetSpot</h1>
//       <p>Your trusted source for quality breed puppies.</p>
//     </div>

//     <div className="footer-links">
//       <h3>Quick Links</h3>
//       <ul>
//         <li><a href="#about">About Us</a></li>
//         <li><a href="#services">Our Services</a></li>
//         <li><a href="#shop">Shop Puppies</a></li>
//         <li><a href="#adoption">Adopt a Pet</a></li>
//         <li><a href="#contact">Contact Us</a></li>
//         <li><a href="#privacy">Privacy Policy</a></li>
//       </ul>
//     </div>

//     <div className="footer-details">
//       <h3>Contact Us</h3>
//       <p>Email: <a href="mailto:petspot@gmail.com">petspot@gmail.com</a></p>
//       <p>Phone: 1-800-PETSPOT</p>
//       <p>Help and Support: <a href="#support">Get Help</a></p>
//       <p>Location: 123 Puppy Lane, Pet City, PC 12345</p>
//     </div>

//     <div className="social-icons">
//       <h3>Follow Us</h3>
//       <div className="social-links">
//         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//           <FaInstagram />
//         </a>
//         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//           <FaFacebookF />
//         </a>
//         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//           <FaTwitter />
//         </a>
//         <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
//           <FaYoutube />
//         </a>
//       </div>
//     </div>
//   </div>

 
//   <p>&copy; 2024 PetSpot. All rights reserved.</p>
// </footer>


      
//     </main>
//   );
// };

// export default Card;

// Dog//itinu tazhe dog code//

// import React, { useContext, useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { mycontext } from '../Context';
// import axios from "axios";
// import './home.css';
// import Navbar from '../Navabar/navabar'; 
// import SortingOptions from '../animations/sorting';
// import { FaInstagram, FaHeart, FaTwitter, FaRegHeart,FaShoppingCart, FaFacebookF } from "react-icons/fa";

// const Dog = () => {
//   const { products, setProducts,isLoggedIn, setIsLoggedIn } = useContext(mycontext);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart = localStorage.getItem("cartItems");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });
//   // Assume you have a way to check this

//   useEffect(() => {
//     fetchDogProducts();
//   }, []);

//   const fetchDogProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/user/products/category/Dog",
//         { withCredentials: true }
//       );

//       const updatedProducts = response.data.map(product => ({
//         ...product,
//         inCart: cartItems.includes(product._id), // Check if product is in cart
//       }));

//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error("Error fetching dog products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCartAction = async (product) => {
//     if (!isLoggedIn) {
//       alert("You need to log in to add items to the cart.");
//       return;
//     }

//     if (product.inCart) {
//       await removeFromCart(product._id);
//     } else {
//       await addToCart(product._id);
//     }
//   };
  
//   const addToCart = async (productId) => {
//     if (!isLoggedIn) {
//       alert("You need to log in to add items to the cart.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/addToCart",
//         { productId },
//         { withCredentials: true }
//       );

//       if (response.status === 200) {
//         const updatedCartItems = [...cartItems, productId];
//         setCartItems(updatedCartItems);
//         localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Persist cart items

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
//   }

//   const removeFromCart = async (productId) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/user/cart`, {
//         data: { productId },
//         withCredentials: true,
//       });

//       const updatedCartItems = cartItems.filter(item => item !== productId);
//       setCartItems(updatedCartItems);
//       localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Persist cart items

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


//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);
//   const handleLogin = () => {
//     // Logic for logging in
//     setIsLoggedIn(true);
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(storedCartItems); // Update context state
//     fetchDogProducts(); // Refetch products to update cart state
//   };
  
  
//   const handleLogout = () => {
//     setCartItems([]);
//     localStorage.removeItem("cartItems");
//     setIsLoggedIn(false);
//     alert("You have been logged out.");
//   };
//   ;const handleDoubleClick = (id) => {
//     navigate(`/product/${id}`);
//   };
//   return (
//     <div>
      
//       <Navbar />
//       <div className='main-section'>
//         <div>
//           <SortingOptions />
//           {/* Category buttons */}
//         </div>
//         <div className='card-container'>
//           {products.map((product) => (
//            <div 
//            key={product._id}
//            className="pet-card" 
//            onDoubleClick={() => handleDoubleClick(product._id)}
//          >
//            <div className="pet-card-image-container">
 
//              <img src={product.image} className="pet-card-image"  />
//              <button className="like-button" onClick={() => (product)}>
// {wishlistItems.includes(product._id) ? (
// <FaHeart className="icon -liked" /> // Filled heart for liked
// ) : (
// <FaRegHeart className="icon" /> // Outline heart for unliked
// )}
// </button>
        

//            </div>
          
//            <div className="pet-card-details">
//            <h3 className="pet-info">
//    <span className="pet-gender">{product.gender}</span> <span className="pet-category">{product.category}</span>
// </h3>
// <h3 className="pet-breed">{product.breed}</h3>
//              <h4 className="pet-card-price">Price: ₹{product.price}</h4>
         
           
// <div className="pet-cardg-buttons">
// <button className='cartg-button' onClick={() => handleCartAction(product)}>
//    <FaShoppingCart className="cart-icon" />
//    {cartItems.includes(product._id) ? "Remove from Cart" : "Add to Cart"}
// </button>
//                 </div>
//               </div>
//             </div>
//           ))}
          
//         </div>
//       </div>
//       <footer className="footer">
//         <div className="footer-content">
//           {/* Your footer content */}
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dog;


// cat.jsx// catnte code

// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const AddressForm = ({ address, onSubmit }) => {
// //   const [formData, setFormData] = useState(address || {
// //     label: '',
// //     addressLine1: '',
// //     addressLine2: '',
// //     city: '',
// //     state: '',
// //     zip: '',
// //     country: '',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await onSubmit(formData);
// //     setFormData({ label: '', addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: '' });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input name="label" value={formData.label} onChange={handleChange} placeholder="Address Label" required />
// //       <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" required />
// //       <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
// //       <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
// //       <input name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
// //       <input name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP Code" required />
// //       <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
// //       <button  type="submit">Submit</button>
// //     </form>
// //   );
// // };

// // export default AddressForm;
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { mycontext } from '../Context';
// import axios from "axios";
// import './home.css';
// import Navbar from '../Navabar/navabar'; 
// import SortingOptions from '../animations/sorting';
// import { FaInstagram, FaHeart, FaTwitter, FaFacebookF } from "react-icons/fa";

// const Cat = () => {
//   const { products, setProducts } = useContext(mycontext);
//   const [loading, setLoading] = useState(false);
//   const navigate=useNavigate()
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   useEffect(() => {
//     fetchDogProducts();
//   }, []);

//   const fetchDogProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:5000/user/products/category/Cat",
//         {
//           withCredentials: true,
//         }
//       );

//       const updatedProducts = response.data.map(product => ({
//         ...product,
//         inCart: cartItems.includes(product._id),
//       }));
//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error("Error fetching dog products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCartAction = async (product) => {
//     if (product.inCart) {
//       await removeFromCart(product._id);
//     } else {
//       await addToCart(product._id);
//     }
//   };

//   const addToCart = async (productId) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/addToCart",
//         { productId },
//         {
//           withCredentials: true,
//         }
//       );
//       if (response.status === 200) {
//         const updatedCartItems = [...cartItems, productId];
//         setCartItems(updatedCartItems);

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
//       const response = await axios.delete(`http://localhost:5000/user/cart`, {
//         data: { productId },
//         withCredentials: true,
//       });

//       const updatedCartItems = cartItems.filter(item => item !== productId);
//       setCartItems(updatedCartItems);

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

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

  
//   const handleDoubleClick = (id) => {
//     navigate(`/details/${id}`);
//   };

//   return (
//     <main>
//       <Navbar />
//       <header className='main-section'>
//         <div>
//         <SortingOptions />
//         </div>
//         <div className='card-container'>
//           {products.map((product) => (
//             <div 
//               key={product._id}
//               className="pet-card" 
//               onDoubleClick={() => handleDoubleClick(product._id)}
//             >
//               <div className="pet-card-image-container">
//                 <img src={product.image} className="pet-card-image" alt={product.name} />
//               </div>
//               <div className="pet-card-details">
//                 {/* <p>{product.category}</p> */}
//                 <h3>{product.gender} {product.category}</h3>
//                 <h3>{product.breed}</h3>
               
//                 <h4>${product.price}</h4>
//                 <div className="pet-card-buttons">
//                   <button
//                     className='view-button'
//                     onClick={() => handleCartAction(product)}
//                   >
//                     {product.inCart ? "Remove from Cart" : "Add to Cart"}
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
// };

// export default Cat;

//navbar.jsx// navbar

// // src/Navbar.js
// import React, { useState, useRef, useEffect, useContext } from 'react';
// import { useNavigate, Link, Navigate } from 'react-router-dom';
// import { FaHome, FaSearch, FaHeart, FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
// import { BsCart4 } from 'react-icons/bs';
// import { GiLabradorHead } from 'react-icons/gi';
// import OffcanvasSorting from '../animations/offcanvas';
// import { mycontext } from '../Context';
// import axios from 'axios';
// import CartIcon from './cartbubble';
// import { AiOutlineHome } from "react-icons/ai";
// import SortingOptions from '../animations/sorting';

// import Footer from './footer';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// // import Marquee from '../animations/marquee';
// import './navbar.css'; // Updated CSS import



// const Navbar = () => {
//   const navigate = useNavigate();
//   const { products, setProducts,isLoggedIn, setIsLoggedIn, setCartItems } = useContext(mycontext);
//   const [query, setQuery] = useState('');
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const searchRef = useRef(null);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // State for offcanvas
//   const [userRole, setUserRole] = useState(''); // State for user role (admin/user)
//   const [sorting, setSorting] = useState('default'); // Example sorting state

//   const history = useNavigate();
//   const handleLogin = () => {
//       // Logic to log in (this can be replaced with actual authentication logic)
//       const role = prompt("Enter role (admin/user):"); // Simplified for example
//       if (role === 'admin') {
//           setUserRole('admin');
//           setIsLoggedIn(true);
//           // Redirect to admin page (replace with your actual redirect logic)
//           window.location.href = 'adminLogin';
//       } else if (role === 'user') {
//           setUserRole('user');
//           setIsLoggedIn(true);
//           // Redirect to main page
//           window.location.href = '/login';
         
//       }
//   };

 
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("cartItems"); // Clear cart items if needed
//     setIsLoggedIn(false);
//     setCartItems([]); // Clear the cart items in context
//     setSorting('default'); // Reset sorting state
//     navigate("/"); // Redirect to homepage
//   };
//   const toggleOffcanvas = () => {
//     setIsOffcanvasOpen(prev => !prev);
//   };
//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/admin/products", {
//         withCredentials: true,
//       });
//       setProducts(response.data.allProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [setProducts]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsSearchOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);


//   const handleGetProductsByCategory = async (category) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:5000/user/products/category/${category}`, { withCredentials: true });
//       // const cartItems = await fetchCartItems();

//       const updatedProducts = response.data.map(product => ({
//         ...product,
//         // inCart: cartItems.includes(product._id),
//       }));

//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error(`Error fetching ${category} products:`, error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGetdDogProducts = () => {
//     handleGetProductsByCategory("Dog");
//     navigate(`/dog`);
//   };

//   const handleGetcatProducts = () => {
//     handleGetProductsByCategory("Cat");
//     navigate(`/cat`);
//   };
  

//   // const handleLogout = () => {
//   //   localStorage.removeItem("token");
//   //   setIsLoggedIn(false);
//   //   navigate("/");
//   // };

//   return (
//     <footer>
//   <div>
    
//   </div>

//     <header className='hf'>
  
  
  
//     {/* <div className="carousel-container">
//     <Carousel
//       showThumbs={false}
//       showStatus={false}
//       autoPlay
//       infiniteLoop
//       emulateTouch
//       useKeyboardArrows
//       showArrows={true}
//       dynamicHeight={false}
//       items={3} // Specify the number of items to show
//     >
//       <div className="carousel-item">
//         <img src="https://cdn.pixabay.com/photo/2017/08/07/18/57/dog-2606759_640.jpg" alt="Book 1" />
//         <img src="https://cdn.pixabay.com/photo/2021/01/02/23/55/dog-5883275_1280.jpg" alt="Book 2" />
//         <img src="https://cdn.pixabay.com/photo/2013/07/18/01/37/kat-163341_960_720.jpg" alt="Book 3" />
//       </div>
//       <div className="carousel-item">
//         <img src="https://cdn.pixabay.com/photo/2023/10/01/12/56/shih-tzu-8287355_960_720.jpg" alt="Book 2" />
//         <img src="https://cdn.pixabay.com/photo/2024/04/10/14/29/dog-8688183_640.jpg" alt="Book 2" />
//         <img src="https://cdn.pixabay.com/photo/2022/10/31/19/04/dog-7560602_1280.jpg" alt="Book 2" />
//       </div>
//       <div className="carousel-item">
//         <img src="https://img.freepik.com/premium-photo/closeup-shot-cat-licking-ear-rabbit-isolated-white_926199-4090218.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 3" />
//         <img src="https://img.freepik.com/premium-photo/group-rabbits-are-laying-couch-one-is-holding-rabbit_1293074-193269.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 3" />
//         <img src="https://img.freepik.com/premium-photo/checkered-giant-rabbit-parakeet_87557-4781.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 3" />
//       </div>
//       <div className="carousel-item">
//         <img src="https://img.freepik.com/premium-photo/close-up-shot-cute-pet-animals-generative-ai_658559-3543.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 4" />
//         <img src="https://img.freepik.com/premium-photo/dog-rabbit-are-rabbit-rabbit_1293074-193301.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 4" />
//         <img src="https://img.freepik.com/premium-photo/dog-is-looking-rabbit-rabbit-is-rabbit_1276068-24072.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 4" />
//       </div>
//       <div className="carousel-item">
//         <img src="https://cdn.pixabay.com/photo/2022/02/01/11/48/woman-6986050_640.jpg" alt="Book 5" />
//         <img src="https://cdn.pixabay.com/photo/2019/12/22/17/13/french-bulldog-4713013_640.jpg" alt="Book 5" />
//         <img src="https://cdn.pixabay.com/photo/2022/04/18/16/20/animal-7140980_640.jpg" alt="Book 5" />
//       </div>
//     </Carousel>
//   </div> */}
 
   
//     <nav className="navbar">
      
    
//     <div className="navbar-container">
      
//   <div className="logo-toggle">

//     <OffcanvasSorting isOpen={isOffcanvasOpen} onClose={toggleOffcanvas}className="togglee-sorting-btnn" />
  
//     <div className="bounce-logo">
//       <h1 className="logoo-text">PetSpot</h1>
//       <img src='https://cdn-icons-png.freepik.com/256/6530/6530499.png?uid=R161672310&ga=GA1.1.664586321.1718601121&semt=ais_hybrid' className='bounce-logo' height={40} width={40} />
//     </div>
    
//   </div>



//         <ul className="nav-links">
//           <li className="nav-item">
//             <Link to="/">Home</Link>
            
//           </li>
//           <li className="nav-item">
//             <Link to={"/"}>category</Link>

//             <div className="dropdown-menu">
//             <button className="dropdown-item" onClick={handleGetdDogProducts}>
//       <img
//         src="https://img.freepik.com/premium-photo/golden-retriever-dog-white-background_723055-2338.jpg?ga=GA1.1.664586321.1718601121&semt=ais_hybrid"
//         alt="Dog"
//       />
//       Dog
//     </button>
//     <button className="dropdown-item" onClick={handleGetcatProducts} >
//       <img
//         src="https://img.freepik.com/free-psd/beautiful-cat-portrait-isolated_23-2150186143.jpg?ga=GA1.1.664586321.1718601121&semt=ais_hybrid"
//         alt="Cat"
//       />
//       Cat
//     </button>
//     <button className="dropdown-item" >
//       <img
//         src="https://img.freepik.com/free-vector/psittacus-eximius-illustrated_53876-34993.jpg?ga=GA1.1.664586321.1718601121&semt=ais_hybrid"
//         alt="Bird"
//       />
//       Birds
//     </button>
//     <button className="dropdown-item" >
//       <img
//         src="https://img.freepik.com/free-vector/cute-brown-rabbit-cartoon-character_1308-122042.jpg?ga=GA1.1.664586321.1718601121&semt=ais_hybrid"
//         alt="Rabbit"
//       />
//       Rabbit
//     </button>
//   </div>
//           </li>
//           <li className="nav-item">
//             <Link to="/food">Food</Link>
//             <div className="dropdown-menu">
//             <Link to="/dog"><img src='https://rukminim2.flixcart.com/image/312/312/jy65j0w0/pet-food/2/g/m/3-dog-him02-himalaya-original-imafgfxrbs2swwgv.jpeg?q=70' height={40} width={40} /> Dogfood</Link>
//                 <Link to="/best-sellers"><img src='https://rukminim2.flixcart.com/image/612/612/xif0q/pet-food/u/v/p/1-cat-1-9950658-purepet-original-imagjsd9t2ajrz5g.jpeg?q=70' height={40} width={40}/>Catfood</Link>
//                 <Link to="/main"><img src='https://rukminim2.flixcart.com/image/312/312/xif0q/pet-food/b/2/u/0-25-fish-1-tropical-fish-food-tunai-original-imah2wzmne5t5sty.jpeg?q=70' height={40} width={40} /> Fishfood</Link>
//                 <Link to="/best-sellers"><img src='https://rukminim2.flixcart.com/image/312/312/kuvkcy80/pet-food/4/o/a/0-500-bird-1-food-art-21060-rio-original-imag7w8fgx9mdwhx.jpeg?q=70'  height={40} width={40}/> Birdsfood</Link>
//                 <Link to="/best-sellers"><img src='https://rukminim2.flixcart.com/image/312/312/xif0q/pet-food/o/v/t/1-rabbit-1-rabbit-1kg-petslife-original-imagnsgzu6vxwtnc.jpeg?q=70'height={40} width={40} /> Rabitfood</Link>
              
//             </div>
//           </li>
//           <li className="nav-item">
//             <Link to="/blog">Sellnow</Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/user">profile</Link>
//           </li>
//         </ul>

//         <div className="navbar-icons">
//           <div className={`search-bar-wrapper ${isSearchOpen ? 'open' : ''}`} ref={searchRef}>
//             <FaSearch
//               className={`search-icon ${isSearchOpen ? 'open' : ''}`}
//               onClick={() =>(!isSearchOpen)}
//             />
//             {isSearchOpen && (
//               <div className="search-bar">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={query}
                  
//                 />
               
//               </div>
//             )}
//           </div>

          
//         <Link to={"/userr"}>user</Link> 
         
//          <div className="wishlist-container">
//           <Link to={"/wishlist"}><FaHeart  className="wishlist-iconn"/></Link>  
//           </div>
//           <Link to="/cart" className="cart-link">
//         <CartIcon/>
         
//         </Link>
          
//         {isLoggedIn ? (
//     <>
//         <button className='login-btn logout-btn' onClick={handleLogout}>
//             <FaSignInAlt className="login-icon" />
//             <span className='login-text'>Logout</span>
//         </button>
//         <button className="profile-btn" onClick={() => window.location.href = '/profile'}>
//             Profile
//         </button>
//     </>
// ) : (
//     <button className="login-btn" onClick={handleLogin}>
//         <FaSignInAlt className="login-icon" />
//         <span className="login-text">Login</span>
//     </button>
// )}

//         </div>
//       </div>
      
//     </nav>
    

//   </header>
//   <div> </div>
 
//   </footer>
//   );
// };

// export default Navbar;


//adminadd//


// import { useContext } from "react";
// import { mycontext } from "../Context";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import"./AdminAddProduct.css"

// export default function AdminAddProduct() {
//   const nav = useNavigate();
//   const { product, setProduct } = useContext(mycontext);

//   const token=localStorage.getItem("adminToken")

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({
//       ...product,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) {
//       console.error("Token not available. Please log in as an admin.");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/admin/products",
//         product,
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       alert("Product added successfully");
//       nav('/adminProducts');
//       console.log("Product created successfully", response.data);
//     } catch (error) {
//       console.error("Failed to create product", error.response);
//       alert("Failed to create product");
//     }
//   };

//   return (
//     <div className="add-product-main">
//       <h1 className="add-product-head">Add Product</h1>

//       <form onSubmit={handleSubmit}>
//         <label className="labell">category:</label>
//         <input
//         className="inputt"
//           type="text"
//           name="category"
//           value={product.category}
//           onChange={handleChange}
//         />

//         <label className="labell">Breed:</label>
//         <input
//          className="inputt"
//           type="text"
//           name="breed"
//           value={product.breed}
//           onChange={handleChange}
//         />

//         <label className="labell">Color:</label>
//         <input
//          className="inputt"
//           type="text"
//           name="color"
//           value={product.color}
//           onChange={handleChange}
//         />

//         <label className="labell">Gender:</label>
//         <input
//          className="inputt"
//           type="text"
//           name="gender"
//           value={product.gender}
//           onChange={handleChange}
//         />

//         <label className="labell">Description:</label>
//         <textarea
//          className="textareaa"
//           name="description"
//           value={product.description}
//           onChange={handleChange}
//         />

//         <label className="labell">Price:</label>
//         <input
//          className="inputt"
//           type="text"
//           name="price"
//           value={product.price}
//           onChange={handleChange}
//         />

//         <label className="labell">Image URL:</label>
//         <input
//          className="inputt"
//           type="text"
//           name="image"
//           value={product.image}
//           onChange={handleChange}
//         />

// <label className="labell">Detail Image URL:</label>
// <input
//     className="inputt"
//     type="text"
//     name="detailImage"
//     value={product.detailImage}
//     onChange={handleChange}
// />
//         <label className="labell">About:</label>
//         <textarea
//          className="inputt"
//           type="text"
//           name="about"
//           value={product.about}
//           onChange={handleChange}
//         />
//         <label className="labell">Size:</label>
//         <input
//          className="inputt"
//           type="text"
//           name="size"
//           value={product.size}
//           onChange={handleChange}
//         />
//          <label className="labell">petcount:</label>
//         <input
//          className="inputt"
//           type="text"
//           name="petcount"
//           value={product.petcount}
//           onChange={handleChange}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }


//adminedit//


// import { useContext, useEffect } from "react";
// import { mycontext } from "../Context";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// export default function AdminEditProduct() {
//   const { productId } = useParams();
//   const nav = useNavigate();
//   const { product, setProduct, token } = useContext(mycontext);

//   useEffect(() => {
//     if (productId) {
//       axios
//         .get(`http://localhost:5000/admin/products/${productId}`, {
//           withCredentials: true,
//         })
//         .then((response) => {
//           setProduct(response.data.updatedProduct);
//         })
//         .catch((error) => {
//           console.error("Error fetching product details:", error);
//         });
//     }
//   }, [productId, setProduct]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       console.error("Token not available. Please log in as an admin.");
//       alert("You need to be logged in as an admin to update a product.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/admin/products/${productId}`,
//         product,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       console.log("Product updated successfully", response.data);
//       alert("Product edit success");
//       nav("/adminProducts");
//     } catch (error) {
//       console.error("Failed to update product", error.response?.data || error);
//       alert("Failed to update product. Please try again.");
//     }
//   };
//   return (
//     <div>
//       <h1>Edit Product</h1>
//       <form onSubmit={handleUpdateProduct}>
//         <label>Category:</label>
//         <input
//           type="text"
//           name="category"
//           value={product.category || ""}
//           onChange={handleChange}
//         />
//         <label>Breed:</label>
//         <input
//           type="text"
//           name="breed"
//           value={product.breed || ""}
//           onChange={handleChange}
//         />
//         <label>Color:</label>
//         <input
//           type="text"
//           name="color"
//           value={product.color || ""}
//           onChange={handleChange}
//         />
//         <label>Gender:</label>
//         <input
//           type="text"
//           name="gender"
//           value={product.gender || ""}
//           onChange={handleChange}
//         />
//         <label>Description:</label>
//         <textarea
//           name="description"
//           value={product.description || ""}
//           onChange={handleChange}
//         />
//         <label>Price:</label>
//         <input
//           type="text"
//           name="price"
//           value={product.price || ""}
//           onChange={handleChange}
//         />
//         <label>Image URL:</label>
//         <input
//           type="text"
//           name="image"
//           value={product.image || ""}
//           onChange={handleChange}
//         />
//         <label>Detail Image URL:</label>
//         <input
//           type="text"
//           name="detailImage"
//           value={product.detailImage || ""}
//           onChange={handleChange}
//         />
//         <label>About:</label>
//         <input
//           type="text"
//           name="about"
//           value={product.about || ""}
//           onChange={handleChange}
//         />
//         <label>Size:</label>
//         <input
//           type="text"
//           name="size"
//           value={product.size || ""}
//           onChange={handleChange}
//         />
//         <label>Pet Count:</label>
//         <input
//           type="text"
//           name="petcount"
//           value={product.petcount || ""}
//           onChange={handleChange}
//         />

//         <button type="submit">Update Product</button>
//       </form>
//     </div>
//   );
// }


//adminpage products .js//


// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { mycontext } from "../Context";
// import axios from "axios";
// import "./Adminproduct.css";

// export default function AdminProducts() {
//   const { products, setProducts } = useContext(mycontext);

//   const nav = useNavigate();

//   function EditPage(productId) {
//     nav(`/adminEditProduct/${productId}`);
//     console.log("edit button :", productId);
//   }

//   const DeleteBtn = async (productId) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/admin/products/${productId}`,
//         {
//           withCredentials: true,
//         }
//       );
//       if (response.status === 200) {
//         setProducts((prevProducts) =>
//           prevProducts.filter((product) => product._id !== productId)
//         );
//       }
//     } catch (error) {
//       console.error("Erro deleting product", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch products when the component mounts
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/admin/products",
//           {
//             withCredentials: true,
//           }
//         ); // Replace with your actual API endpoint
//         setProducts(response.data.allProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);
//   console.log("fetch products", products);

//   function AddProduct() {
//     nav("/addProduct");
//   }

//   return (
//     <div className="admin-mainn">
//       <div className="admin-sub">
//         <h1 className="admin-head">Products Management</h1>
//         <button className="admin-button back-button" >Back</button>
//         <button className="admin-button add-button" onClick={AddProduct}>Add Product</button>
//       </div>
//       <div className="admin-body">
//         <h2 className="admin-bodyHead">Product List</h2>
//         <div className='cardd-container'>
//           {products.map((product) => (
//             <div key={product._id} className="product-card">
//               <div className="product-image-container">
//                 <img src={product.image} className="product-image" alt={product.name} />
//               </div>
//               <div className="product-details">
//               <h4 className="product-title">{product.category}</h4>

//                 <h5 className="product-breed">{product.breed}</h5>
//                 <p className="product-description">{product.description}</p>
//                 <p className="product-color"><strong>Color:</strong> {product.color}</p>
//                 <h3 className="product-price">${product.price}</h3>
//                 <div className="product-actions">
//                   <button className="action-button edit-button" onClick={() => EditPage(product._id)}>Edit</button>
//                   <button className="action-button delete-button" onClick={() => DeleteBtn(product._id)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }















//admin side create,delte,update products// Backend//




// const Product = require('../model/productmodel');
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcryptjs') 
// const schema = require("../model/usermodel"); 
// const PetFood =require("../model/petfoodmodel");
// const { all } = require('../route/userroutes');


// const adminLogin = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;
//     if (email !== "admin@gmail.com" || password !== "admin123") {
//       throw new Error("Invalid Email or Password");
//     }
//     const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//       expiresIn: "10h",
//     });
//     res.cookie("token", token, { httpOnly: true, secure: false });
//     res.setHeader("Authorization", token);

//     res.json({ message: "welcome, Admin", token });
//   } catch (err) {
//     res.status(401).json({ message: err.message });
//   }
// };

// const createPetfood = async (req, res) => {
//   try {
//     await PetFood.insertMany([
//       {
//       category: req.body.category,
//       brand: req.body.brand,
//       flavor: req.body.flavor,
//       quantity: req.body.quantity,
//       nutritionalInfo: req.body.nutritionalInfo,
//       pfooddescription: req.body.pfooddescription,
//       foodprice: req.body.foodprice,
//       image: req.body.image,
//       detailfoodImage:req.body.detailfoodImage,
//       units: req.body.units,
//     },
//   ]);

//     res.status(200).json({ message: "Product Create Successfully" });
//     console.log("product create successfully");
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to create Product", error: error.message });
//   }
// };

// const getPetfood = async (req, res) => {
//   try {
//     const allProducts = await PetFood.find();
//     res.status(200).json({ message: "All Product List", allProducts});
//   } catch (error) {
//     res
//       .status(404)
//       .json({ message: "All Product List Not Found: ", error: error.message });
//     console.log(error);
//   }
// };


// const updatePetfood = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const updatedProduct = await PetFood.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product updated", updatedProduct });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product", error: error.message });
//   }
// };

// const deletePetfood = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await PetFood.deleteOne({ _id: id });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     await Product.insertMany([
//       {
//       category: req.body.category,
//       breed: req.body.breed,
//       color: req.body.color,
//       gender: req.body.gender,
//       about: req.body.about,
//       description: req.body.description,
//       price: req.body.price,
//       image: req.body.image,
//       detailImage:req.body.detailImage,
//       size: req.body.size,
//       petcount: req.body.petcount,
      
//     },
//   ]);

//     res.status(200).json({ message: "Product Create Successfully" });
//     console.log("product create successfully");
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to create Product", error: error.message });
//   }
// };

// const getProducts = async (req, res) => {
//   try {
//     const allProducts = await Product.find();
//     res.status(200).json({ message: "All petfood List", allProducts });
//   } catch (error) {
//     res
//       .status(404)
//       .json({ message: "All Product List Not Found: ", error: error.message });
//     console.log(error);
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const {category,breed,color,gender,about,description,price,image,detailImage,size,petcount} = req.body;

//     const updatedProduct = await Product.findOneAndUpdate(
//       { _id: id },
//       {category,breed,color,gender,about,description,price,image,detailImage,size,petcount},
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json({ message: "Product updated", updatedProduct });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating product" });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Product.deleteOne({ _id: id });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };
// const handleSearch = async (req, res) => {
//   try {
//       const searchTerm = req.query.q;
      
//       const products = await Product.find({
//           $or: [
//               { name: { $regex: searchTerm, $options: 'i' } },
//               // { category: { $regex: searchTerm, $options: 'i' } },
//               // { anime: { $regex: searchTerm, $options: 'i' } }
//           ]
//       });
      
//       res.json(products);
//       console.log(products);
//   } catch (err) {
//       console.log(err);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = {
//   handleSearch,
//   adminLogin,
//   createProduct,
//   getProducts,
//   updateProduct,
//   deleteProduct,
//   createPetfood,
//   deletePetfood,
//   updatePetfood,
//   getPetfood,
// };

//Backend//user side get product,add produt,delete,cart//




// const bcrypt =require("bcryptjs")
// const jwt = require("jsonwebtoken");
// const User = require("../model/usermodel");
// const Product = require("../model/productmodel");
// const PetFood = require("../model/petfoodmodel")



// // User Registration
// const userRegister = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;

//     // Validate required fields
//     if (!name || !email || !password || !confirmPassword) {
//       return res.status(400).send("Please fill in all fields");
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).send("Passwords do not match");
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).send("User already exists");
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();
    
//     res.status(201).send("User registered successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Registration failed");
//   }
// };

// // User Login
// const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
    

//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
//         expiresIn: "1hr",
//       });

//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: true,
//         maxAge: 1000 * 60 * 60,
//       });
//       res.setHeader("Authorization", token);

//       res.status(200).json({ message: "Welcome user", token, user: { email: user.email, name: user.name } });
//     } else {
//       res.status(401).send("Invalid email or password");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Login failed");
//   }
// };
// const userGetProducts = async (req, res) => {
//   try {
//     // Fetch all products
//     const allProducts = await Product.find();
//     console.log("All Products:", allProducts); // Log all products fetched from the database

//     // Fetch user's cart items
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Filter out null or undefined values from user's cart
//     const userCart = user.cart.filter(id => id !== null && id !== undefined).map(id => id.toString());
//     console.log("User Cart:", userCart); // Log user's cart items

//     // Check if each product is in the user's cart
//     const productsWithCartStatus = allProducts.map(product => ({
//       ...product.toObject(),
//       inCart: userCart.includes(product._id.toString())
//     }));

//     console.log("Products with Cart Status:", productsWithCartStatus); // Log final products with cart status
//     res.status(200).json({ allProducts: productsWithCartStatus });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error", errorMessage: err.message });
//   }
// };


// // Get Products by Category
// const getCategoryWise = async (req, res) => {
//   const categoryList = req.params.category;
//   try {
//     const categoryProducts = await Product.find({ category: categoryList });
//     res.json(categoryProducts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// Get Specific Product
// const specificProduct = async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ message: 'Product ID is required' });
//   }

//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ specificProduct: product });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error });
//   }
// };

// // Add to Cart
// const addToCart = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Check if the product is already in the user's cart
//     if (user.cart.includes(productId)) {
//       return res.status(200).json({ message: "Product is already in the cart" });
//     }

//     // Add product to user's cart if it's not already there
//     user.cart.push(productId);
//     await user.save();

//     res.status(200).json({ message: "Product added to cart", cart: user.cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };



// Get Cart
// const getCart = async (req, res) => {
//   try {
//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email }).populate('cart');

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ cart: user.cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };

// // Remove from Cart
// const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if product exists in the user's cart
//     const index = user.cart.indexOf(productId);
//     if (index === -1) {
//       return res.status(404).json({ error: "Product not found in cart" });
//     }

//     // Remove the product from the user's cart
//     user.cart.splice(index, 1);
//     await user.save();

//     res.status(200).json({ message: "Product removed from cart", cart: user.cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };

// const userDetails = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).json({ error: "Unauthorized access: No token provided." });
//     }

//     const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access: Invalid token format." });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email }).populate('cart');

//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching user details:", error.message);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };

// Add Address
// const userGetPetFood = async (req, res) => {
//   try {
//     const allProducts = await PetFood.find();
//     console.log("All Pet Foods:", allProducts);

//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       return res.status(401).json({ error: "Invalid token" });
//     }

//     const user = await User.findOne({ email: decoded.email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const userCart = user.cart.filter(id => id !== null && id !== undefined).map(id => id.toString());
//     console.log("User Cart:", userCart);

//     const petFoodsWithCartStatus = allProducts.map(petFood => ({
//       ...petFood.toObject(),
//       inCart: userCart.includes(petFood._id.toString())
//     }));

//     console.log("Pet Foods with Cart Status:", petFoodsWithCartStatus);
//     res.status(200).json({ allProducts: petFoodsWithCartStatus });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error", errorMessage: err.message });
//   }
// };

// const userGetPetFood = async (req, res) => {
//   try {
//     const {email}=req.body
//     // Fetch all pet foods
//     const allProducts = await PetFood.find();
//     console.log("All Pet Foods:", allProducts);

    // Accessing the token from headers
    // const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    // console.log("Token:", token);

    // if (!token) {
    //   return res.status(401).json({ error: "Unauthorized access: No token provided" });
    // }

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (error) {
    //   return res.status(401).json({ error: "Invalid token" });
    // }

    // Use the email from the request body (if it's sent that way)
    // const user = await User.findOne({email:email});

    // console.log("User logged:", req.body);

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // Get user's cart
//     const userCart = user.cart.filter(id => id !== null && id !== undefined).map(id => id.toString());
//     console.log("User Cart:", userCart);

//     // Map pet foods to include cart status
//     const petFoodsWithCartStatus = allProducts.map(petFood => ({
//       ...petFood.toObject(),
//       inCart: userCart.includes(petFood._id.toString())
//     }));

//     console.log("Pet Foods with Cart Status:", petFoodsWithCartStatus);
//     res.status(200).json({ allPetFoods: petFoodsWithCartStatus });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error", errorMessage: err.message });
//   }
// };




// // Get Products by Category
// const getCategoryWisepetfood = async (req, res) => {
//   const categoryList = req.params.category;
//   try {
//     const categoryProducts = await PetFood.find({ category: categoryList });
//     res.json(categoryProducts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // Get Specific Product
// const specificProductpetfood = async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ message: 'Product ID is required' });
//   }

//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ specificProduct: product });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error });
//   }
// };
// const addToCartPetFood = async (req, res) => {
//   try {
//     const { petFoodId } = req.body;

//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const petFood = await PetFood.findById(petFoodId);
//     if (!petFood) {
//       return res.status(404).json({ error: "Pet food not found" });
//     }

//     if (user.cart.includes(petFoodId)) {
//       return res.status(200).json({ message: "Pet food is already in the cart" });
//     }

//     user.cart.push(petFoodId);
//     await user.save();

//     res.status(200).json({ message: "Pet food added to cart", cart: user.cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };



// Get Cart
// const getCartfood = async (req, res) => {
//   try {
//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email }).populate('cart');

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ cart: user.cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };

// Remove from Cart
// const removeFromCartPetFood = async (req, res) => {
//   try {
//     const { petFoodId } = req.body;

//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const index = user.cart.indexOf(petFoodId);
//     if (index === -1) {
//       return res.status(404).json({ error: "Pet food not found in cart" });
//     }

//     user.cart.splice(index, 1);
//     await user.save();

//     res.status(200).json({ message: "Pet food removed from cart", cart: user.cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };


// const userDetailsfood = async (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email }).populate('cart');

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };

// // Add to Cart
// Add to Wishlist
// const addToWishlist = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Initialize wishlist if it doesn't exist
//     if (!user.wishlist) {
//       user.wishlist = [];
//     }

//     // Check if the product is already in the wishlist
//     if (user.wishlist.includes(productId)) {
//       return res.status(409).json({ error: "Product already in wishlist" });
//     }

//     // Add product to user's wishlist
//     user.wishlist.push(productId);
//     await user.save();

//     res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };


// // Get Wishlist
// const getWishlist = async (req, res) => {
//   try {
//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email }).populate('wishlist');

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ wishlist: user.wishlist });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };

// // Remove from Wishlist
// const removeFromWishlist = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if product exists in the user's wishlist
//     const index = user.wishlist.indexOf(productId);
//     if (index === -1) {
//       return res.status(404).json({ error: "Product not found in wishlist" });
//     }

//     // Remove the product from the user's wishlist
//     user.wishlist.splice(index, 1);
//     await user.save();

//     res.status(200).json({ message: "Product removed from wishlist", wishlist: user.wishlist });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };




// module.exports = {
//   userRegister,
//   userLogin,
//   userGetProducts,
//   specificProduct,
//   addToCart,
//   getCategoryWise,
//   getCart,
//   removeFromCart,
//   userDetails,
//   getCategoryWisepetfood,
//   userGetPetFood,
//   specificProductpetfood,
//   addToCartPetFood,
//   addToWishlist,
//   removeFromWishlist,
//   getWishlist
// };



//backend admin middleware//


// const jwt = require("jsonwebtoken");

// const checkAdminToken = (req, res, next) => {
//   const token = req.cookies.token;

//   console.log("Token in middleware:", token);

//   if (!token) {
//     return res.status(401).json({ message: "Authorization token missing" });
//   }
//   // const token = req.headers.authorization?.split(' ')[1];
//   // if (!token) {
//   //   return res.status(401).json({ message: "Unauthorized" });
//   // }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.token = token;
//     next();

//     // req.user = decoded;
//     // next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };



// module.exports = checkAdminToken;



//user middle ware//
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

// const userMiddleware = (req, res, next) => {
//   // Check for token in Authorization header or cookies
//   const authHeader = req.headers.authorization;
//   const token = authHeader ? authHeader.split(" ")[1] : req.cookies.token;

//   console.log("Token in UserMiddleware:", token);

//   // Check if token exists
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized - No token provided" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded);

//     // Attach user information to the request object
//     req.user = decoded;

//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.error("Error in userMiddleware:", error);
//     res.status(401).json({ message: "Unauthorized - Invalid token" });
//   }
// };

// module.exports = userMiddleware;




//product routes//


// const express = require('express');
// const bodyparser = require("body-parser");
// const admin = require('../controller/admin');
// const checkAdminToken = require('../middleware/adminmiddleware'); 

// const app = express();

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));

// // Routes
// app.post("/login", admin.adminLogin);
// app.post("/products", checkAdminToken, admin.createProduct);
// app.get("/products", admin.getProducts);
// app.put("/products/:id", checkAdminToken, admin.updateProduct);
// app.delete("/products/:id", checkAdminToken, admin.deleteProduct);

// app.post('/petfoods', admin.createPetfood);
// app.get('/petfoods', admin.getPetfood);
// app.delete('/petfoods/:id', admin.deletePetfood);

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error', error: err.message });
// });

// module.exports = app;




//user routes//


// const express = require("express");
// const cookieParser = require("cookie-parser");
// const app = express();

// const user = require("../controller/user");
// const bodyParser = require("body-parser");

// const userMiddleware = require("../middleware/usermiddleware");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser()); // Use cookie-parser middleware

// app.post("/register", user.userRegister);
// app.post("/login", user.userLogin, userMiddleware); // No userMiddleware here

// // Middleware applied only to routes after successful login

// app.get("/getProducts",  user.userGetProducts);
// app.get("/products/:id", user.specificProduct);
// app.get("/products/category/:category", user.getCategoryWise);
// app.post("/addToCart", user.addToCart); 
// app.get("/cart", user.getCart);

// app.delete("/cart",user.removeFromCart)

// app.post("/getPetfood", user.userGetPetFood);
// app.get("/petfoods/:id", user.specificProductpetfood);
// app.get("/petfoods/category/:category", user.getCategoryWisepetfood);
// app.post("/addToCartfood", user.addToCartPetFood); 
// app.get("/cartfood", user.getCart);
// app.post("/addToWishlist", user.addToWishlist); 
// app.get("/wishlist", user.getWishlist);

// app.delete("/wishlist", userMiddleware, user.removeFromWishlist);

// // app.delete("/cartfood",userMiddleware,user.removeFromCartPetFood)
// app.get("/details", userMiddleware,user.userDetails);
// module.exports = app;




//server .js//




// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/data');
// const cookieParser = require('cookie-parser');
// require("dotenv").config()
// // const checkAdminToken = require('./middileware/adminMiddileware'); // Fixed spelling

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true
// }));
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static("./public"));

// // Connect to the database
// connectDB();

// // Route setup
// const adminRoute = require('./route/productroutes');

// // Apply checkAdminToken middleware only to admin routes
// app.use("/admin",  adminRoute);

// const userRoute = require("./route/userroutes");

// app.use("/user", userRoute);

// // app.use("/getfoo", userRoute);
// // app.use((req, res, next) => {
// //   res.status(404).json({ message: "Route not found" });
// // });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


//buynow//

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { mycontext } from "../Context";
// import './buy.css';

// export default function BuyNowPage() {
//   const { productId } = useParams();
//   const { products } = useContext(mycontext);
//   const [specificProduct, setSpecificProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [address, setAddress] = useState("");
//   const [userDetails, setUserDetails] = useState({ name: "", email: "" }); // User details
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSpecificProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/user/products/${productId}`, { withCredentials: true });
//         setSpecificProduct(response.data.specificProduct);
//       } catch (error) {
//         console.error("Error fetching specific product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/user/details`, { withCredentials: true });
//         setUserDetails(response.data); // Assuming the response contains user details
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchSpecificProduct();
//     fetchUserDetails();
//   }, [productId]);

//   const handleBuyNow = async () => {
//     if (!address || quantity <= 0) {
//       alert("Please provide a valid address and quantity.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/user/buy", {
//         productId,
//         quantity,
//         address
//       }, { withCredentials: true });

//       alert(response.data.message || "Purchase successful!");
//       navigate("/"); // Redirect after purchase
//     } catch (error) {
//       console.error("Error during purchase:", error);
//       alert("There was an issue completing your purchase.");
//     }
//   };

//   return (
//     <main className="buy-now-main">
//       <div className="buy-now-container">
//         {loading ? (
//           <p>Loading...</p>
//         ) : specificProduct ? (
//           <div className="buy-now-content">
//             <h1 className="product-title">{specificProduct.breed} {specificProduct.category}</h1>
//             <img src={specificProduct.image} alt={specificProduct.breed} className="product-image" />
//             <p className="product-price">Price: ₹{specificProduct.price.toFixed(2)}</p>
//             <p className="product-description">{specificProduct.description}</p>
            
//             <div className="user-details">
//               <h3>User Details</h3>
//               <p>Name: {userDetails.name}</p>
//               <p>Email: {userDetails.email}</p>
//             </div>

//             <div className="purchase-details">
//               <label>Quantity:</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 className="quantity-input"
//               />
//               <label>Shipping Address:</label>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Enter your address"
//                 className="address-input"
//               />
//             </div>

//             <button onClick={handleBuyNow} className="buy-now-button">Confirm Purchase</button>
//           </div>
//         ) : (
//           <p>Product not found</p>
//         )}
//       </div>
//     </main>
//   );
// }


//app.js//


// import React, { useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { mycontext } from './components/Context';
// import Navbar from './components/Navabar/navabar';
// import AdminAddProduct from './components/admin/AdminAddProduct';
// import AdminEditProduct from './components/admin/AdminEditProduct';
// import AdminPage from './components/admin/AdminPage';
// import Food from './components/navlnks/food';
// import { useReducer } from 'react';
// import { useEffect } from 'react';
// import MyOrderPage from './components/navlnks/demo2';
// import UserProfile from './components/user/account';
// import Wishlist from './components/user/wishlist';
// import BuyNowPage from './components/user/buynowpage';
// import AdminProducts from './components/admin/AdminProduct';
// import AdminLogin from './components/admin/AdminLogin';
// import Card from './components/navlnks/home';
// import SpecificProductPage from './components/Navabar/detailspage';
// import Cart from './components/user/cart';
// import AdminAddPetfood from './components/admin/AdminAddpetfood';
// import AdminEditpetfood from './components/admin/AdminEditpetfood';
// import Adminpetfoods from './components/admin/Adminpetfood';
// import Register from './components/user/register';
// import UserDetails from './components/user/userdetails';
// import Dog from './components/navlnks/dog';
// import AddressForm from './components/navlnks/cat,';
// import AddressManager from './components/navlnks/birds';
// import Login from './components/user/login';

// import Banner from './components/navlnks/rabbit';
// import Cat from './components/navlnks/cat,';
// import Main from './components/animations/main';
// function App() {
//   const [User, setUser] = useState([]);
//   const [userlog, setuserlog] = useState([]);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [adminEmail, setAdminEmail] = useState("");
//   const [product, setProduct] = useState({
//     category: "",
//     breed: "",
//     color: "",
//     gender: "",
//     description: "",
//     detailImage: "",
//     price: "",
//     image: "",
//     country: "",
//     size: "",
//     petcount:"",
//   });
//   const [petFood, setPetFood] = useState({
//     category: "",
//     brand: "",
//     flavor: "",
//     quantity: "",
//     pfooddescription: "",
//     foodprice: "",
//     image: "",
//     nutritionalInfo : "",
//     detailfoodImage : "",
//     units: "",
    
//   });
//   const [sortingOptions, setSortingOptions] = useState({
//     category: 'all', // Ensure a default category is set
//     breed: [],
//     sizes: [],
//     gender: [],
//     priceRange: [0, 40000],
// });
// useEffect(() => {
//   const savedToken = localStorage.getItem("adminToken"); // adjust this according to your setup
//   if (savedToken) {
//     setToken(savedToken);
//   }
// }, []);
// useEffect(() => {
//   const savedToken = localStorage.getItem("userToken"); // adjust this according to your setup
//   if (savedToken) {
//     setToken(savedToken);
//   }
// }, []);

// const [userRole,setuserRole]=useState(null)
// // const [cart, dispatch] = useReducer( []);
//   const [token, setToken] = useState(null);
//   const [userToken, setUserToken] = useState(null);
//   const [products, setProducts] = useState([]);
  
//   const [petFoods,setPetFoods] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const [specificProduct, setSpecificProduct] = useState({});
//   const [inCart, setInCart] = useState(false);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const[userDetails, setUserDetails]=useState([])
//   const values = {
//     isLoggedIn,setIsLoggedIn,
//     name,setName,
//     userDetails,setUserDetails,
//     petFoods,setPetFoods,
//     password,setPassword,
//     wishlistItems,setWishlistItems,
//     confirmPassword,setConfirmPassword,
//     email,setEmail,
//     specificProduct,setSpecificProduct,
//     adminEmail, setAdminEmail,
//     product, setProduct,
    
//     token, setToken,
//     userToken,setUserToken,
//     products, setProducts,
//     petFood,setPetFood,
//     User, setUser,
//     userlog, setuserlog,
//     cartItems,setCartItems,
//     inCart,setInCart,
//     // cart, dispatch,
//     sortingOptions,setSortingOptions,
//     userRole,setuserRole,
//   }
  
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <mycontext.Provider value={values} >
//           <Routes>   
//             <Route path="/product/:productId" element={<SpecificProductPage />} />

//           <Route path="/" element={<Card />} />
//             <Route path="/navbar" element={<Navbar />} />
//             <Route path="/adminLogin" element={<AdminLogin />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/admin" element={<AdminPage />} />
//             <Route path="/adminProducts" element={<AdminProducts />} />
//             <Route path="/adminpetfood" element={<Adminpetfoods />} />
//             <Route path="/addadminpetfood" element={<AdminAddPetfood />} />
//             <Route path="/addProduct" element={<AdminAddProduct />} />
//             <Route path="/adminEditProduct/:productId" element={<AdminEditProduct />} />
//             <Route path="/adminEditPetfood/:petFoodId" element={<AdminEditpetfood />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/dog" element={<Dog />} />
//             <Route path="/buy/:productId" element={<BuyNowPage />} />
//             {/* <Route path="" element={< OrderPage/>} /> */}
//             {/* <Route path="/addres" element={<AddressManager />} /> */}
//             {/* <Route path="/form" element={< AddressForm/>} /> */}
//             <Route path="/userr" element={< UserDetails/>} />
//             <Route path="/cat" element={< Cat/>} />
//             <Route path="/food" element={< Food/>} />
//             <Route path="/main" element={< Main/>} />
//             <Route path="/wishlist" element={< Wishlist/>} />
//             <Route path="/user" element={< UserProfile/>} />
//              {/* <Route path="/ban" element={<Banner />} /> */}
//              <Route path="/order" element={< MyOrderPage/>} />
//           </Routes>


//         </mycontext.Provider>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;



// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { mycontext } from "../Context";
// import './buy.css';

// export default function BuyNowPage() {
//   const { productId } = useParams();
//   const { addressDetails, setAddressDetails } = useContext(mycontext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [specificProduct, setSpecificProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   // Retrieve token from local storage or context
//   const token = localStorage.getItem("token"); // or use your context if applicable

//   useEffect(() => {
//     const fetchSpecificProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/user/products/${productId}`, { withCredentials: true });
//         setSpecificProduct(response.data.specificProduct);
//       } catch (error) {
//         console.error("Error fetching specific product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpecificProduct();
//   }, [productId]);

//   const validateAddress = () => {
//     return Object.values(addressDetails).every(field => field.trim() !== "");
//   };

//   const handleBuyNow = async () => {
//   if (!validateAddress() || quantity <= 0) {
//     alert("Please provide valid address details and quantity.");
//     return;
//   }

//   setIsLoading(true); // Start loading state

//   const payload = {
//     productId,
//     quantity,
//     addressDetails,
//   };

//   console.log("Token being sent:", token); // Log the token

//   try {
//     const response = await axios.post("http://localhost:5000/user/buy", payload, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Use the token here
//       },
//       withCredentials: true,
//     });
//     alert(response.data.message || "Purchase successful!");
//     navigate("/payment");
//   } catch (error) {
//     console.error("Error during purchase:", error.response?.data || error);
//     alert(error.response?.data?.error || "There was an issue completing your purchase.");
//   } finally {
//     setIsLoading(false); // Stop loading state
//   }
// };


//   return (
//     <main className="buy-now-main">
//       <div className="buy-now-container">
//         {loading ? (
//           <p>Loading...</p>
//         ) : specificProduct ? (
//           <div className="buy-now-content">
//             <h1 className="product-title">{specificProduct.breed} {specificProduct.category}</h1>
//             <img src={specificProduct.image} alt={specificProduct.breed} className="product-image" />
//             <p className="product-price">Price: ₹{specificProduct.price.toFixed(2)}</p>
//             <p className="product-description">{specificProduct.description}</p>

//             <div className="purchase-details">
//               <label>Quantity:</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 className="quantity-input"
//               />
//               <h3>Shipping Address:</h3>
//               {Object.keys(addressDetails).map((key) => (
//                 <div key={key}>
//                   <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
//                   <input
//                     type={key === 'phone' ? 'tel' : 'text'}
//                     value={addressDetails[key]}
//                     onChange={(e) => setAddressDetails({ ...addressDetails, [key]: e.target.value })}
//                     placeholder={`Enter your ${key}`}
//                     className="address-input"
//                   />
//                 </div>
//               ))}
//             </div>

//             <button onClick={handleBuyNow} className="buy-now-button">Confirm Purchase</button>
//           </div>
//         ) : (
//           <p>Product not found</p>
//         )}
//       </div>
//     </main>
//   );
// }
//   admin middle new 


//   const jwt = require("jsonwebtoken");
// const User = require('../model/usermodel');

// const checkAdminToken = async (req, res, next) => {
//   const token = req.cookies.token; // Adjust based on where you're storing the token

//   if (!token) {
//     return res.status(401).json({ message: "Authorization token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id); // Adjust based on your user schema

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user; // Attach user to the request object
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = checkAdminToken;



// user order


// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { mycontext } from '../Context';
// import './order.css';

// const Order = () => {
//   const { orders, setOrders } = useContext(mycontext);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editOrderId, setEditOrderId] = useState(null);
//   const [updatedAddress, setUpdatedAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     zip: '',
//     pincode: '',
//     locality: '',
//     landmark: '',
//     addressType: '',
//     phone: '',
//   });
//   const [loadingAction, setLoadingAction] = useState(false);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/user/getorders", { withCredentials: true });
//         if (response.data && response.data.orders) {
//           setOrders(response.data.orders);
//         } else {
//           throw new Error("No orders found.");
//         }
//       } catch (error) {
//         setError(error.response?.data?.error || error.message || "Failed to fetch orders.");
//         console.error("Fetch Orders Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchOrders();
//   }, [setOrders]);

//   const handleCancelOrder = async (orderId) => {
//     if (!orderId) return;

//     setLoadingAction(true);
//     setError(null);
//     try {
//       const response = await axios.delete(http://localhost:5000/user/cancelorder/${orderId}, { withCredentials: true });

//       if (response.status === 200) {
//         setOrders(prevOrders =>
//           prevOrders.map(order =>
//             order._id === orderId ? { ...order, status: 'Canceled! 📦' } : order
//           )
//         );
//       } else {
//         setError('Failed to cancel order. Please try again.');
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'An error occurred while canceling the order.');
//     } finally {
//       setLoadingAction(false);
//     }
//   };

//   const handleEditClick = (order) => {
//     setEditOrderId(order._id);
//     setUpdatedAddress({ ...order.address });
//   };

//   const handleUpdateAddress = async (orderId) => {
//     setLoadingAction(true);
//     setError(null);
//     try {
//       const response = await axios.post(http://localhost:5000/user/updateAddress, {
//         orderId,
//         addressDetails: updatedAddress,
//       }, { withCredentials: true });

//       if (response.status === 200) {
//         setOrders(prevOrders =>
//           prevOrders.map(order =>
//             order._id === orderId ? { ...order, address: updatedAddress } : order
//           )
//         );
//         setEditOrderId(null);
//         setUpdatedAddress({
//           street: '',
//           city: '',
//           state: '',
//           zip: '',
//           pincode: '',
//           locality: '',
//           landmark: '',
//           addressType: '',
//           phone: '',
//         });
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'An error occurred while updating the address.');
//     } finally {
//       setLoadingAction(false);
//     }
//   };

//   return (
//     <div className="order-container">
//       <h2>Your Orders</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <ul className="order-list">
//         {Array.isArray(orders) && orders.length > 0 ? (
//           orders.map(order => (
//             <li key={order._id} className="order-item">
//               <div className="order-details">
//                 <h3>{order.product?.name || 'Product name not available'} (x{order.quantity})</h3>
//                 <p>Status: <strong>{order.status}</strong></p>
//                 <div className="address-section">
//                   <h4>Address:</h4>
//                   <p>
//                     {order.address?.street || 'Street not available'},<br />
//                     {order.address?.city || 'City not available'},<br />
//                     {order.address?.state || 'State not available'} - {order.address?.zip || 'ZIP not available'}<br />
//                     {order.address?.landmark && Landmark: ${order.address.landmark}}<br />
//                     {order.address?.addressType && Address Type: ${order.address.addressType}}<br />
//                     {order.address?.phone && Phone: ${order.address.phone}}
//                   </p>
//                 </div>
//                 <p>User Email: {order.userEmail || 'Email not available'}</p>
//                 <p>Category: {order.productCategory || 'Category not available'}</p>
//                 <p>Price: <strong>${order.productPrice || 'Price not available'}</strong></p>
//                 {order.productImage && (
//                   <img src={order.productImage} alt={order.product?.name} className="product-image" />
//                 )}
//               </div>
//               <div className="order-actions">
//                 <button 
//                   className={delete-button ${loadingAction ? 'loading' : ''} ${order.status === 'Canceled! 📦' ? 'disabled' : ''}} 
//                   onClick={() => handleCancelOrder(order._id)} 
//                   disabled={loadingAction || order.status === 'Canceled! 📦'}
//                 >
//                   {loadingAction ? <span className="spinner"></span> : 'Cancel Order'}
//                 </button>

//                 {editOrderId === order._id && order.status !== 'Canceled! 📦' ? (
//                   <div className="edit-address">
//                     <h4>Edit Address</h4>
//                     {Object.keys(updatedAddress).map((key) => (
//                       <input
//                         key={key}
//                         type="text"
//                         placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                         value={updatedAddress[key]}
//                         onChange={e => setUpdatedAddress({ ...updatedAddress, [key]: e.target.value })}
//                       />
//                     ))}
//                     <button className="save-button" onClick={() => handleUpdateAddress(order._id)} disabled={loadingAction}>
//                       {loadingAction ? 'Saving...' : 'Save Address'}
//                     </button>
//                   </div>
//                 ) : (
//                   order.status !== 'Canceled! 📦' && (
//                     <button className="edit-button" onClick={() => handleEditClick(order)}>Edit Address</button>
//                   )
//                 )}
//               </div>
//             </li>
//           ))
//         ) : (
//           <p>No orders found.</p>
//         )}
//       </ul>
//     </div>
//   );
// };
// import React, { useContext, useState } from "react";
// import { mycontext } from "../Context";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./login.css"; // Ensure this file is updated

// export default function Login() {
//   const notify = () => toast("Login successful!");
//   const nav = useNavigate();
//   const { setUserToken, setAdminToken, isLoggedIn, setIsLoggedIn } = useContext(mycontext);

//   // Local state for login
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async () => {
//     console.log("Attempting to log in with:", { email, password });
//     try {
//       if (!email || !password) {
//         alert("Please fill in all fields");
//         return;
//       }
  
//       const response = await axios.post(
//         "http://localhost:5000/user/login",
//         { email, password },
//         { withCredentials: true }
//       );
  
//       const data = response.data;
//       console.log("Login response:", data);
  
//       // Store token based on user role
//       if (data.role === "admin") {
//         localStorage.setItem("adminToken", data.token); // Store admin token
//         setAdminToken(data.token); // Set admin token in context
//       } else {
//         localStorage.setItem("userToken", data.token); // Store user token
//         setUserToken(data.token); // Set user token in context
//       }
  
//       setIsLoggedIn(true);
//       notify();
//       nav(data.role === "admin" ? "/admin" : "/main");
  
//     } catch (error) {
//       // Check if the error response is defined
//       if (error.response) {
//         console.error("Login error:", error.response.data);
//         toast.error("Login failed: " + (error.response.data.message || "Invalid credentials"));
//       } else {
//         // Handle the case where error.response is undefined
//         console.error("Unexpected error during login:", error);
//         toast.error("Login failed: An unexpected error occurred. Please try again.");
//       }
//     }
//   };


//   return (
//     <div className="bodyp">
//       <div className="login-container">
//         <h1 className="login-head">Login</h1>

//         <input
//           className="login-input"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br />
//         <div className="password-container">
//           <input
//             className="login-input"
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             className="show-password-btn"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>
//         <br />
//         <button className="loginn-btn" onClick={handleLogin}>
//           Login
//         </button>
//         <ToastContainer />
//         <p className="register-prompt">Don't have an account? <Link to="/register">Sign Up</Link></p>
//         {isLoggedIn && <p className="status-message">You are logged in!</p>}

//         {/* Change Email Section */}
//         {/* ... unchanged ... */}

//         {/* Reset Password Section */}
//         {/* ... unchanged ... */}
//       </div>
//     </div>
//   );
// }




// backendgetsellingnew


// const getUserPets = async (req, res) => {

//     try {
//         // Access token from cookies
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({ error: "Unauthorized access" });
//         }
//         console.log("Reached fetchUserPets handler");
//         // Verify the token
//         let decoded;
//         try {
//             decoded = jwt.verify(token, process.env.JWT_SECRET);
//         } catch (error) {
//             return res.status(401).json({ error: "Invalid token" });
//         }

//         // Find the user by email from the decoded token
//         const user = await User.findOne({ email: decoded.email });
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Fetch all pets associated with the user's ID
//         const userPets = await Pet.find({ userId: user._id });

//         // Check if user has any pets listed for sale
//         if (!userPets.length) {
//             return res.status(404).json({ message: "No pets found for this user." });
//         }

//         // Respond with the user's pets
//         res.status(200).json({ message: "Fetched user pets successfully", pets: userPets });
//     } catch (error) {
//         console.error("Error fetching user pets:", error);
//         res.status(500).json({ error: "Failed to fetch pets", details: error.message });
//     }