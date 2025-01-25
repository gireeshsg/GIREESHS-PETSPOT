import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mycontext } from '../Context';
import axios from "axios";
import Marquee from '../animations/marquee';
import './home.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../Navabar/navabar'; 
import SortingOptions from '../animations/sorting';
import { FaInstagram, FaHeart, FaTwitter, FaFacebookF } from "react-icons/fa";

const Card = () => {
  const { products, setProducts, sortingOptions } = useContext(mycontext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/getCart", { withCredentials: true });
      return response.data.cartItems.map(item => item._id);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/user/getProducts");
        setProducts(response.data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);
  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/addToCart",
        { productId },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        const updatedCartItems = [...cartItems, productId];
        setCartItems(updatedCartItems);
  
        const updatedProducts = products.map(product =>
          product._id === productId ? { ...product, inCart: true } : product
        );
        setProducts(updatedProducts);
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
      const response = await axios.delete(`http://localhost:5000/user/cart`, {
        data: { productId },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        const updatedCartItems = cartItems.filter(item => item !== productId);
        setCartItems(updatedCartItems);
  
        const updatedProducts = products.map(product =>
          product._id === productId ? { ...product, inCart: false } : product
        );
        setProducts(updatedProducts);
        alert("Product removed from cart successfully");
      }
    } catch (err) {
      console.error("Error removing product from cart:", err);
      alert("Failed to remove product from cart");
    }
  };
  
  // Ensure to call handleCartAction correctly
  const handleCartAction = async (product) => {
    if (product.inCart) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id);
    }
  };
  
  

  
  
  const handleDoubleClick = (id) => {
    navigate(`/details/${id}`);
  };

  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    // Filter by category
    if (sortingOptions.category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === sortingOptions.category.toLowerCase());
    }

    // Filter by breed
    if (sortingOptions.breed.length > 0) {
      filteredProducts = filteredProducts.filter(product => sortingOptions.breed.includes(product.breed));
    }

    // Filter by sizes
    if (sortingOptions.sizes.length > 0) {
      filteredProducts = filteredProducts.filter(product => product.size && sortingOptions.sizes.includes(product.size));
    }

    // Filter by gender
    if (sortingOptions.gender.length > 0) {
      filteredProducts = filteredProducts.filter(product => sortingOptions.gender.includes(product.gender));
    }

    // Filter by price range
    filteredProducts = filteredProducts.filter(product => product.price >= sortingOptions.priceRange[0] && product.price <= sortingOptions.priceRange[1]);

    // Sort products based on selected sorting option
    if (sortingOptions.sortBy) {
      filteredProducts.sort((a, b) => {
        if (sortingOptions.sortBy === 'price') {
          return a.price - b.price; // Ascending order
        } else if (sortingOptions.sortBy === 'priceDesc') {
          return b.price - a.price; // Descending order
        } else if (sortingOptions.sortBy === 'name') {
          return a.breed.localeCompare(b.breed); // Alphabetical order
        }
        return 0;
      });
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

 
  return (
    <main>
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
      items={3} // Specify the number of items to show
    >
      <div className="carousel-item">
        <img src="https://cdn.pixabay.com/photo/2017/08/07/18/57/dog-2606759_640.jpg" alt="Book 1" />
        <img src="https://cdn.pixabay.com/photo/2021/01/02/23/55/dog-5883275_1280.jpg" alt="Book 2" />
        <img src="https://cdn.pixabay.com/photo/2013/07/18/01/37/kat-163341_960_720.jpg" alt="Book 3" />
      </div>
      <div className="carousel-item">
        <img src="https://cdn.pixabay.com/photo/2023/10/01/12/56/shih-tzu-8287355_960_720.jpg" alt="Book 2" />
        <img src="https://cdn.pixabay.com/photo/2024/04/10/14/29/dog-8688183_640.jpg" alt="Book 2" />
        <img src="https://cdn.pixabay.com/photo/2022/10/31/19/04/dog-7560602_1280.jpg" alt="Book 2" />
      </div>
      <div className="carousel-item">
        <img src="https://img.freepik.com/premium-photo/closeup-shot-cat-licking-ear-rabbit-isolated-white_926199-4090218.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 3" />
        <img src="https://img.freepik.com/premium-photo/group-rabbits-are-laying-couch-one-is-holding-rabbit_1293074-193269.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 3" />
        <img src="https://img.freepik.com/premium-photo/checkered-giant-rabbit-parakeet_87557-4781.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 3" />
      </div>
      <div className="carousel-item">
        <img src="https://img.freepik.com/premium-photo/close-up-shot-cute-pet-animals-generative-ai_658559-3543.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 4" />
        <img src="https://img.freepik.com/premium-photo/dog-rabbit-are-rabbit-rabbit_1293074-193301.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 4" />
        <img src="https://img.freepik.com/premium-photo/dog-is-looking-rabbit-rabbit-is-rabbit_1276068-24072.jpg?ga=GA1.1.76497856.1727076494&semt=ais_hybrid" alt="Book 4" />
      </div>
      <div className="carousel-item">
        <img src="https://cdn.pixabay.com/photo/2022/02/01/11/48/woman-6986050_640.jpg" alt="Book 5" />
        <img src="https://cdn.pixabay.com/photo/2019/12/22/17/13/french-bulldog-4713013_640.jpg" alt="Book 5" />
        <img src="https://cdn.pixabay.com/photo/2022/04/18/16/20/animal-7140980_640.jpg" alt="Book 5" />
      </div>
    </Carousel>
    </div>
      <Navbar />
      
      <header className='main-section'>
        <div>
          <SortingOptions />
        </div>
        <Link to="cart">cart</Link>
        <div className='card-container'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product._id}
                className="pet-card" 
                onDoubleClick={() => handleDoubleClick(product._id)}
              >
                <div className="pet-card-image-container">
                  <img src={product.image} className="pet-card-image" alt={product.category} />
                </div>
                <div className="pet-card-details">
                  <p>{product.gender} {product.category}</p>
                  <h4>{product.breed}</h4>
                  <h4>{product.color} color</h4>
                  <h2>${product.price}</h2>
                  <div className="pet-card-buttons">
                    <button
                      className='view-button'
                      onClick={() => handleCartAction(product)}
                    >
                      {cartItems.includes(product._id) ? "Remove from Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No products found matching your criteria.</div>
          )}
        </div>
      </header>

      {/* Footer Section */}
      {/* <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h1>petspot</h1>
          </div>
          <div className="footer-links">
            <ul>
              <li><a href="#about">About Us</a></li>
              
              <li><a href="#services">Our Services</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <li> our Services</li>
          </div>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </footer> */}
    </main>
  );
};

export default Card;
