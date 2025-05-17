// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { mycontext } from "../Context";
// import './details.css';
// import Navbar from "./navabar";
// import { FaInstagram, FaHeart, FaTwitter, FaFacebookF } from "react-icons/fa";
// import Slider from "react-slick"; // Import react-slick
// import PetCareTips from "./pettips";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import PetTrainingTips from "./trainingtips";

// export default function SpecificProductPage() {
//   const { productId } = useParams();
//   const { cartItems, setCartItems, products } = useContext(mycontext);
//   const [specificProduct, setSpecificProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [inCart, setInCart] = useState(false);
//   const [showAll, setShowAll] = useState(false);
//   const navigate = useNavigate();
//   const [fullView, setFullView] = useState(false);
//   const [selectedImage, setSelectedImage] = useState('');

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//     setFullView(true);
//   };

//   const handleCloseFullView = () => {
//     setFullView(false);
//   };

//   useEffect(() => {
//     const fetchSpecificProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/user/products/${productId}`, { withCredentials: true });
//         setSpecificProduct(response.data.specificProduct);
//         setInCart(cartItems.includes(productId));
//       } catch (error) {
//         console.error("Error fetching specific product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpecificProduct();
//   }, [productId, cartItems]);

//   const addToCart = async () => {
//     // Add to cart logic...
//   };

//   const removeFromCart = async () => {
//     // Remove from cart logic...
//   };

//   const buyNow = async () => {
//     navigate("/buy");
//     alert("Proceeding to checkout");
//   };

//   const getRelatedProducts = () => {
//     if (!specificProduct) {
//       return [];
//     }
//     return products.filter(product => product.category === specificProduct.category && product._id !== productId);
//   };

//   const relatedProducts = getRelatedProducts();

//   // Settings for the carousel
//   const settings = {
//     infinite: true,
//     speed: 900,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 1400,
//     cssEase: "ease",
//     pauseOnHover: false,
//     pauseOnFocus: false,
//     responsive: [
//         {
//             breakpoint: 1024,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 1,
//                 infinite: true,
//             }
//         },
//         {
//             breakpoint: 600,
//             settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 initialSlide: 1,
//             }
//         },
//         {
//             breakpoint: 480,
//             settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//             }
//         }
//     ]
//   };

//   return (
    
//     <main>
//       <div className="tg">
//         <Navbar/>
//       </div>
//       <header>
//         <div className="product-page">
//           {loading ? (
//             <p>Loading...</p>
//           ) : specificProduct ? (
//             <div className="product-content">
//               <div className="product-left">
//               <div className="product-container">
//   <div className="carousell-containerr">
//     <Carousel
//       showThumbs={false}
//       showStatus={false}
//       autoPlay
//       infiniteLoop
//       emulateTouch
//       useKeyboardArrows
//       showArrows={true}
//       dynamicHeight={false}
//     >
//       <div className="carousell-item" onClick={() => handleImageClick(specificProduct.image)}>
//         <img className="productt-image" src={specificProduct.image} alt="Product" />
//       </div>
//       <div className="carousell-item" onClick={() => handleImageClick(specificProduct.detailImage)}>
//         <img className="productt-image" src={specificProduct.detailImage} alt="Product Detail" />
//       </div>
//     </Carousel>
//   </div>

//   <div className="product-details">
//     <h2 style={{ fontSize: '2rem' }}>About Pet</h2>
//     <ul className="highlights">
//       <li><strong>Breed:</strong> <span className="highlight">{specificProduct.breed}</span></li>
//       <li><strong>Category:</strong> <span className="highlight">{specificProduct.category}</span></li>
//       <li><strong>Color:</strong> <span className="highlight">{specificProduct.color}</span></li>
//       <li><strong>Pet Count:</strong> <span className="highlight">{specificProduct.petcount}</span></li>
//       <li><strong>Gender:</strong> <span className="highlight">{specificProduct.gender}</span></li>
//       <li><strong>Size:</strong> <span className="highlight">{specificProduct.size}</span></li>
//     </ul>
//     <p className="price" style={{ color: specificProduct.isDiscounted ? 'red' : 'green', fontSize: '1.5rem' }}>
//       Price: ₹{specificProduct.price.toFixed(2)}
//     </p>
//     <p className="description" style={{ fontSize: '1rem', lineHeight: '1.5' }}>{specificProduct.description}</p>
//     <h1 style={{ fontSize: '2.5rem' }}>{specificProduct.breed} {specificProduct.category}</h1>
//     <p >{specificProduct.about}</p>
//     <div>
//       <button onClick={inCart ? removeFromCart : addToCart} className="carty-button">
//         {inCart ? "Remove from Cart" : "Add to Cart"}
//       </button>
//       <button onClick={() => navigate(`/buy/${specificProduct._id}`)} className="buyy-now-button">Buy Now</button>

//     </div>
//   </div>
// </div>

// {fullView && (
//   <div className="full-view" onClick={handleCloseFullView}>
//     <img src={selectedImage} alt="Full View" />
//   </div>
// )}
// </div>
// </div>
         
//           ) : (

//             <p>Product not found</p>

//           )}
                  
//                   <PetCareTips/>

       

//           <h2 className="rel">Related Products</h2>
//           <Slider {...settings} className="relatedd-productts">
//             {relatedProducts.map(product => (
//               <div key={product._id} className="relatedd-productt-cardd">
//                 <img src={product.image} alt={product.breed} className="relatedd-productt-image" />
//                 <h3 className="relatedd-productt-title">{product.gender} {product.category}</h3>
//                 <h3 className="relatedd-productt-title">{product.breed}</h3>
//                 <p className="relatedd-productt-price">Price: ₹{product.price.toFixed(2)}</p>
//                 <button onClick={() => navigate(`/product/${product._id}`)} className="view-details-button">View Details</button>
//               </div>
//             ))}
//           </Slider>
        
//           <PetTrainingTips/>
//           {/* Interesting content section */}
 

// <section className="interesting-content">
//   <h2>Why Choose PetSpot?</h2>
//   <div className="content-box">
//     <p>
//       At PetSpot, we connect you with your perfect pet companion. Our pets are handpicked for their health and temperament, ensuring you find the right fit for your home. 
//     </p>
//     <p>
//       Join our community of happy pet owners and enjoy exclusive offers, expert tips on pet care, and a supportive network that shares your passion for animals. 
//     </p>
//     <p>
//       Our commitment to quality and customer satisfaction means you can shop with confidence. Every pet comes with a health guarantee and ongoing support to ensure you and your new friend thrive together.
//     </p>
//     <p>
//       Explore our wide range of pets and pet care products today, and discover why we are the go-to choice for pet lovers everywhere!
//     </p>
//   </div>
// </section>
//           <footer className="footer">
//             <div className="footer-content">
//               <div className="footer-logo">
//                 <img src="/path/to/your/logo.png" alt="PetSpot Logo" className="footer-logo-image" />
//               </div>
//               <div className="footer-links">
//                 <ul>
//                   <li><a href="#about">About Us</a></li>
//                   <li><a href="#services">Our Services</a></li>
//                   <li><a href="#contact">Contact</a></li>
//                   <li><a href="#privacy">Privacy Policy</a></li>
//                 </ul>
//               </div>
//               <div className="social-icons">
//                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//                   <FaInstagram />
//                 </a>
//                 <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                   <FaFacebookF />
//                 </a>
//                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//                   <FaTwitter />
//                 </a>
//               </div>
//               <p>&copy; 2024 Your Company Name. All rights reserved.</p>
//             </div>
//           </footer>
//         </div>
//       </header>
//     </main>
//   );
// }
