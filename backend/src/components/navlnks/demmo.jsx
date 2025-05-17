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
// import { FaInstagram, FaHeart, FaTwitter,FaRegHeart, FaFacebookF } from "react-icons/fa";
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
//   const productsPerPage = 8; // Adjust this to change how many products to display per page
//   const fetchCartItems = async () => {
//     if (isLoggedIn) {
//       try {
//         const response = await axios.get("http://localhost:5000/user/getCart", { withCredentials: true });
//         return response.data.cartItems.map(item => item._id);
//       } catch (error) {
//         console.error("Error fetching cart items:", error.response?.data || error.message);
//         return [];
//       }
//     }
//     return [is];
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
  
//   // Fetch products and update their inCart and inWishlist status
//   const fetchProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       const [productsResponse, cartItems, wishlistItems] = await Promise.all([
//         axios.get("http://localhost:5000/user/getProducts", { withCredentials: true }),
//         fetchCartItems(),
//         fetchWishlistItems(),
//       ]);
  
//       const updatedProducts = productsResponse.data.allProducts.map(product => ({
//         ...product,
//         inCart: cartItems.includes(product._id),
//         inWishlist: wishlistItems.includes(product._id),
//       }));
  
//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [setProducts, isLoggedIn]);
  
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//     fetchProducts();
//   }, [fetchProducts, setIsLoggedIn]);
  
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
  
//   const handleCartAction = async (product) => {
//     if (product.inCart) {
//       await removeFromCart(product._id);
//     } else {
//       await addToCart(product._id);
//     }
//   };
  
  

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   const handleDoubleClick = (id) => {
//     navigate(`/product/${id}`);
//   };

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
//                   <button className="like-button " onClick={() => handleWishlistAction(product)}>
//   {wishlistItems.includes(product._id) ? (
//     <FaHeart className="icon -liked" /> // Filled heart for liked
//   ) : (
//     <FaRegHeart className="icon" /> // Outline heart for unliked
//   )}
//   </button> 
             

//                 </div>
               
//                 <div className="pet-card-details">
//                   <h3>{product.gender} {product.category} </h3>
//                   <h3>{product.breed}</h3>
//                   <h4 className="pett-card-price">Price: ₹{product.price.toFixed(2)}</h4>
              
                
//                   <div className="pet-card-buttons">
//                     <button
//                       className='view-button'
//                       onClick={() => handleCartAction(product)}
//                     >
//                       {cartItems.includes(product._id) ? "Remove from Cart" :"Add to Cart"}
//                     </button>
                   
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
//           <div>
//             <li> our Services</li>
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

// export default Card;
