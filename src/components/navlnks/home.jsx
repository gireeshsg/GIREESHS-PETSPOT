
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mycontext } from '../Context';
import axios from "axios";
import Marquee from '../animations/marquee';
import { useCallback } from 'react';

import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as RegularHeart } from '@fortawesome/free-regular-svg-icons';

import Pagination from '../animations/pagination';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../Navabar/navabar'; 
import SortingOptions from '../animations/sorting';
import { FaInstagram, FaHeart, FaTwitter,FaRegHeart, FaShoppingCart,FaYoutube, FaFacebookF } from "react-icons/fa";
; // Import the Pagination component

const Card = () => {
  const { products, setProducts, sortingOptions,isLoggedIn,setIsLoggedIn ,isAdmin, setIsAdmin} = useContext(mycontext);
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
 
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Hide price after 5 seconds
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Adjust this to change how many products to display per page
  // const fetchCartItems = async () => {
  //   if (isLoggedIn) {
  //     try {
  //       const response = await axios.get("http://localhost:5000/user/getCart", { withCredentials: true });
  //       return response.data.cartItems.map(item => item._id);
  //     } catch (error) {
  //       console.error("Error fetching cart items:", error);
  //       return [];
  //     }
  //   }
  //   return [];
  // };
  // const addToCart = async (productId) => {
  //   if (!isLoggedIn) {
  //     alert("Please login to add to cart");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/user/addToCart",
  //       { productId },
  //       { withCredentials: true }
  //     );
  //     if (response.status === 200) {
  //       const updatedProducts = products.map(product =>
  //         product._id === productId ? { ...product, inCart: true } : product
  //       );
  //       setProducts(updatedProducts);
  //       alert("Product added to cart successfully");
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 409) {
  //       alert("Product already in cart");
  //     } else {
  //       console.error("Error adding product to cart:", error);
  //       alert("Failed to add product to cart");
  //     }
  //   }
  // };
  
  // const removeFromCart = async (productId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/user/cart`, {
  //       data: { productId },
  //       withCredentials: true,
  //     });
  //     const updatedProducts = products.map(product =>
  //       product._id === productId ? { ...product, inCart: false } : product
  //     );
  //     setProducts(updatedProducts);
  //     alert("Product removed from cart successfully");
  //   } catch (err) {
  //     console.error("Error removing product from cart:", err);
  //     alert("Failed to remove product from cart");
  //   }
  // };
  
  // const handleCartAction = (product) => {
  //   if (cartItems.includes(product._id)) {
  //     removeFromCart(product._id);
  //   } else {
  //     addToCart(product._id);
  //   }
  // };
  
  const fetchCartItems = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.get("http://localhost:5000/user/getCart", { withCredentials: true });
        return response.data.cartItems.map(item => item._id);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        return [];
      }
    }
    return [];
  };const handleDoubleClick = (id) => {
    navigate(`/product/${id}`);
  };
  
  // Example button component
  

  // Fetch products and update their inCart status based on the fetched cart items
 const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/user/getProducts", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data.allProducts);
    } catch (error) {
      console.error("Error fetching products:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  const addToWishlist = async (productId) => {
    if (!isLoggedIn) {
      alert("Please login to add to wishlist");
      return;
    }
  
    const productInWishlist = products.find(product => product._id === productId)?.inWishlist;
  
    try {
      const response = await axios.post(
        "http://localhost:5000/user/addToWishlist",
        { productId },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        const updatedProducts = products.map(product =>
          product._id === productId ? { ...product, inWishlist: !productInWishlist } : product
        );
        setProducts(updatedProducts);
        const actionMessage = productInWishlist ? "removed from" : "added to";
        alert(`Product ${actionMessage} wishlist successfully`);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Product already in wishlist");
      } else {
        console.error("Error updating wishlist:", error);
        alert("Failed to update wishlist");
      }
    }
  };
  
  
  const fetchAdminProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/admin/products", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setProducts(response.data.allProducts);
    } catch (error) {
      console.error("Error fetching admin products:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (token) {
      setIsLoggedIn(true);
      fetchProducts();
    } else if (adminToken) {
      setIsAdmin(true);
      fetchAdminProducts();
    }
  }, [fetchProducts, fetchAdminProducts]);

  // Additional effect to handle product fetching on state changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    } else if (isAdmin) {
      fetchAdminProducts();
    }
  }, [isLoggedIn, isAdmin, fetchProducts, fetchAdminProducts]);
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
        // Update the product's inCart status
        const updatedProducts = products.map(product =>
          product._id === productId ? { ...product, inCart: true } : product
        );
        setProducts(updatedProducts);
  
        // Update localStorage with the new cart status
        localStorage.setItem('cart', JSON.stringify(updatedProducts.filter(product => product.inCart)));
  
        alert("Product added to cart successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Product already in cart");
      } else {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart");
      }
    }
  };
  
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/user/cart`, {
        data: { productId },
        withCredentials: true,
      });
  
      // Update the product's inCart status
      const updatedProducts = products.map(product =>
        product._id === productId ? { ...product, inCart: false } : product
      );
      setProducts(updatedProducts);
  
      // Update localStorage with the updated cart status
      localStorage.setItem('cart', JSON.stringify(updatedProducts.filter(product => product.inCart)));
  
      alert("Product removed from cart successfully");
    } catch (err) {
      console.error("Error removing product from cart:", err);
      alert("Failed to remove product from cart");
    }
  };
  
  const handleCartAction = async (product) => {
    if (product.inCart) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id);
    }
  };
  const fetchWishlistItems = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.get("http://localhost:5000/user/getWishlist", { withCredentials: true });
        return response.data.wishlistItems.map(item => item._id);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        return [];
      }
    }
    return [];
  };
  // Fetch products and update their inWishlist status based on the fetched wishlist items
  
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/user/wishlist`, {
        data: { productId },
        withCredentials: true,
      });
      const updatedProducts = products.map(product =>
        product._id === productId ? { ...product, inWishlist: false } : product
      );
      setProducts(updatedProducts);
      alert("Product removed from wishlist successfully");
    } catch (err) {
      console.error("Error removing product from wishlist:", err);
      alert("Failed to remove product from wishlist");
    }
  };
  
  const handleWishlistAction = async (product) => {
    if (product.inWishlist) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  
  


  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    // Filter by category
    if (sortingOptions.category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase() === sortingOptions.category.toLowerCase()
        );
    }

    // Filter by breed
    if (sortingOptions.breed.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            sortingOptions.breed.includes(product.breed)
        );
    }

    // Filter by sizes
    if (sortingOptions.sizes.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            product.size && sortingOptions.sizes.includes(product.size)
        );
    }

    // Filter by gender
    if (sortingOptions.gender.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            sortingOptions.gender.includes(product.gender)
        );
    }

    // Filter by price range
    filteredProducts = filteredProducts.filter(product => 
        product.price >= sortingOptions.priceRange[0] && product.price <= sortingOptions.priceRange[1]
    );

    // Sort products based on selected sorting option
   // Sort products based on selected sorting option


    return filteredProducts;
};

// Pagination logic
const filteredProducts = getFilteredProducts();
const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
    <main className='bf'>
      <Marquee />
      <div className="carousel-container">
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
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book 1" />
            <img src="https://images.unsplash.com/photo-1526526431900-88eb525f1e4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGV0c3xlbnwwfHwwfHx8MA%3D%3D" alt="Book 2" />
            <img src="https://images.unsplash.com/photo-1518815068914-038920b6f0c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBldHN8ZW58MHx8MHx8fDA%3D" alt="Book 3" />
           </div>
          <div className="carousel-item">
            <img src="https://cdn.pixabay.com/photo/2023/10/01/12/56/shih-tzu-8287355_960_720.jpg" alt="Book 2"/>
            <img src="https://cdn.pixabay.com/photo/2024/04/10/14/29/dog-8688183_640.jpg"alt="Book 2" />
            <img src="https://cdn.pixabay.com/photo/2022/10/31/19/04/dog-7560602_1280.jpg"alt="Book 2" />
          </div>
          
          {/* Carousel items here... */}
        </Carousel>
      </div>
      <Navbar setSearchTerm={setSearchTerm}/>
    <header className='main-section'>
    <div className='card-container'>
     {currentProducts.length > 0 ? (
    currentProducts.map((product) => (
      <div
        key={product._id}
       
        className={`pet-card ${product.stock <= 0 ? 'out-of-stock' : ''}`}
        onDoubleClick={() => handleDoubleClick(product._id)}
      >
        <div className="pet-card-image-container"
             onMouseEnter={handleMouseEnter}
             onMouseLeave={() => setIsVisible(false)}
        >
          <img src={product.image} className="pet-card-image" alt={`${product.breed}`} />
<button className="like-button" onClick={() => handleWishlistAction(product)}>
      {wishlistItems.includes(product._id) ? (
        <FaHeart className="icon liked" style={{ color: 'red' }} />
      ) : (
        <FaRegHeart className="icon" />
      )}
    </button>
  
          {product.stock <= 0 && (
          <div className="out-of-stock-overlay">
            <div className="out-of-stock-badge">Out of Stock</div>
          </div>)}
        </div>

        <div className="pet-card-details">
         <p className="pet-info"> {product.gender}{product.category}</p>
    
       
          <h3 className="pet-breed">{product.breed}</h3>
          <p className="pet-stock">Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}</p>
          
          <h4 className="peut-card-price">Price:₹{product.price}</h4>

       
          <div className="pet-card-buttons">
           
            <button className='crart-button' onClick={() => handleCartAction(product)}>
            <FaShoppingCart className="cartt-icon" />
            {product.inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>No products found matching your criteria.</div>



          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Pagination */}

      </header>

      {/* Footer Section */}
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


    </main>
  );
};

export default Card;
