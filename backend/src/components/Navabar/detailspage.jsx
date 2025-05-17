import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { mycontext } from "../Context";
import './details.css';
import { FaShoppingCart, FaMoneyBillWave ,FaPaw} from 'react-icons/fa';
import Navbar from "./navabar";
import { FaInstagram, FaHeart, FaTwitter, FaFacebookF ,FaYoutube } from "react-icons/fa";
import Slider from "react-slick"; // Import react-slick
import PetCareTips from "./pettips";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PetTrainingTips from "./trainingtips";
import { MdOutlinePets } from "react-icons/md";

export default function SpecificProductPage() {
  const { productId } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { cartItems, setCartItems, products,isLoggedIn,setProducts } = useContext(mycontext);
  const [specificProduct, setSpecificProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false); 
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const [fullView, setFullView] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setFullView(true);
  };

  const handleCloseFullView = () => {
    setFullView(false);
  };
  useEffect(() => {
    const fetchSpecificProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/user/products/${productId}`,
          {
            withCredentials: true,
          }
        );
        setSpecificProduct(response.data.specificProduct);
        // Check if the product is in the cart after fetching it
        const isInCart = cartItems.includes(productId);
        setInCart(isInCart);
      } catch (error) {
        console.error("Error fetching specific product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecificProduct();
  }, [productId, cartItems]);

  const addToCart = async (productId) => {
    if (!isLoggedIn) {
      alert("Please login to add to cart");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/user/addToCart",
        { productId },
        { withCredentials: true }
      );
      if (response.status === 200) {
        // Update cartItems and product's inCart state
        setCartItems((prevCart) => [...prevCart, productId]);
        setInCart(true);

        const updatedProducts = products.map(product =>
          product._id === productId ? { ...product, inCart: true } : product
        );
        setProducts(updatedProducts);

        alert("Product added to cart successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409){
        alert("Product already in cart");
      } else {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart");
      }
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(
        "http://localhost:5000/user/cart",
        { data: { productId }, withCredentials: true }
      );
      // Update cartItems and product's inCart state
      setCartItems((prevCart) => prevCart.filter(item => item !== productId));
      setInCart(false);

      const updatedProducts = products.map(product =>
        product._id === productId ? { ...product, inCart: false } : product
      );
      setProducts(updatedProducts);

      alert("Product removed from cart successfully");
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("Failed to remove product from cart");
    }
  };

  const handleCartAction = async () => {
    if (inCart) {
      await removeFromCart(productId);
    } else {
      await addToCart(productId);
    }
  };
  const buyNow = async () => {
    navigate("/buy");
    alert("Proceeding to checkout");
  };

  const getRelatedProducts = () => {
    if (!specificProduct) {
      return [];
    }
    return products.filter(product => product.category === specificProduct.category && product._id !== productId);
  };

  const relatedProducts = getRelatedProducts();

  // Settings for the carousel
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1400,
    cssEase: "ease",
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
  };

  return (
    
    <main>
      <Navbar/>
      <div className="tg">
     
      </div>
      <header>
        <div className="product-page">
          {loading ? (
            <p>Loading...</p>
          ) : specificProduct ? (
          
            
           
            <div className="product-content">
            <div className="product-left">
              <div className="product-container">
               
                {/* <div className="about-section">
                <h1 className="breed">About{specificProduct.breed}</h1>
                  {specificProduct.about}</div>
                 */}
                <div className="carousell-containerr">
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay
                    infiniteLoop
                    emulateTouch
                    useKeyboardArrows
                    showArrows={true}
                    dynamicHeight={false}
                  >
                    <div className="carousell-item" onClick={() => handleImageClick(specificProduct.image)}>
                      
                      <img className="productt-image" src={specificProduct.image} alt="Product" />
                    </div>
                    <div className="carousell-item" onClick={() => handleImageClick(specificProduct.detailImage)}>
                      <img className="productt-image" src={specificProduct.detailImage} alt="Product Detail" />
                    </div>
                    
                  </Carousel>
                 
                
  
</div>
<div className="product-details">
  <h2 className="about-pet-title">About Pet</h2>

 
  <div className="about-pet-details">
    <div className="highlight-card">
      <FaPaw className="highlight-icon" />
      <div className="highlight-text">
        <strong></strong> <span>{specificProduct.breed}</span>
      </div>
    </div>

    {/* Divider line between Breed and Category */}
    <div className="highlight-card divider-line">
      <FaPaw className="highlight-icon" />
      <div className="highlight-text">
        <strong></strong> <span>{specificProduct.category}</span>
      </div>
    </div>

    <div className="highlight-card">
      <FaPaw className="highlight-icon" />
      <div className="highlight-text">
        <strong></strong> <span>{specificProduct.color}</span>
      </div>
    </div>

    <div className="highlight-card">
      <FaPaw className="highlight-icon" />
      <div className="highlight-text">
        <strong>Pet Count:</strong> <span>{specificProduct.petcount}</span>
      </div>
    </div>

    <div className="highlight-card">
      <FaPaw className="highlight-icon" />
      <div className="highlight-text">
        <strong></strong> <span>{specificProduct.gender}</span>
      </div>
    </div>

    <div className="highlight-card">
      <FaPaw className="highlight-icon" />
      <div className="highlight-text">
        <strong>Size:</strong> <span>{specificProduct.size}</span>
      </div>
    </div>
    <div >
   
    </div>
    {/* Centered Availability */}
   
  </div>

  <p className="des">{specificProduct.description}</p>
  <div className="about-section">
                <h3 className>About{specificProduct.breed}Breed</h3>
                  {specificProduct.about}</div>

<div className="price-descriptio-container">

<div className="price-container">
   
   
</div>
 
</div>

   
    <p className="price" style={{ color: specificProduct.isDiscounted ? 'red' : 'green', fontSize: '1.5rem',marginBottom:"10px" }}>
      Price: ₹{specificProduct.price.toFixed(2)}
    </p>
    <div className="underline" style={{ borderBottom: '2px solid', borderColor: specificProduct.isDiscounted ? 'red' : 'green' }} />
    <div>
    <div className="button-group">
           
            <button className='carty-button' onClick={() => handleCartAction(specificProduct)}>
            <FaShoppingCart style={{ marginRight: '8px' }} />
            
                {cartItems.includes(specificProduct._id) ? "Remove from Cart" : "Add to Cart"}
             
            </button>
            <button onClick={() => navigate(`/buy/${specificProduct._id}`)} className="buyy-now-button">
                <FaMoneyBillWave style={{ marginRight: '8px' }} /> {/* Buy Icon */}
                Buy Now
            </button>
        </div>
     


     
    </div>
  </div>
</div>

{fullView && (
  <div className="full-view" onClick={handleCloseFullView}>
    <img src={selectedImage} alt="Full View" />
  </div>
)}
</div>
</div>
         
          ) : (

            <p>Product not found</p>

          )}
                  
               

       
                   <h2 className="rel">Related Products</h2>
<Slider {...settings} className="related-products-slider">
  {relatedProducts.map(product => (
    <div key={product._id} className="related-product-card">
      <img src={product.image} alt={product.breed} className="related-product-image" />
      <h3 className="related-product-title">{product.gender} {product.category}</h3>
      <h3 className="related-product-breed">{product.breed}</h3>
      <p className="related-product-price">Price: ₹{product.price.toFixed(2)}</p>
      <button onClick={() => navigate(`/product/${product._id}`)} className="view-details-button">View Details</button>
    </div>
  ))}
</Slider> 

       
          {/* Interesting content section */}
 

          <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h1>PetSpot</h1>
                    <p>Your trusted source for quality breed puppies.</p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#services">Our Services</a></li>
                        <li><a href="#shop">Shop Puppies</a></li>
                        <li><a href="#adoption">Adopt a Pet</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-details">
                    <h3>Contact Us</h3>
                    <p>Email: <a href="mailto:petspot@gmail.com">petspot@gmail.com</a></p>
                    <p>Phone: 1-800-PETSPOT</p>
                    <p>Help and Support: <a href="#support">Get Help</a></p>
                    <p>Location: 123 Puppy Lane, Pet City, PC 12345</p>
                </div>

                <div className="social-icons">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>

            <p className="footer-bottom">&copy; 2024 PetSpot. All rights reserved.</p>
        </footer>

        </div>
      </header>
    </main>
  );
}
