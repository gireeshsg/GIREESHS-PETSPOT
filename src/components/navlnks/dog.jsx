
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mycontext } from '../Context';
import axios from "axios";
import './home.css';
import { Carousel } from 'react-responsive-carousel';
import Navbar from '../Navabar/navabar'; 
import SortingOptions from '../animations/sorting';
import { FaInstagram, FaHeart, FaTwitter, FaRegHeart,FaShoppingCart, FaFacebookF ,FaYoutube, } from "react-icons/fa";
import Pagination from '../animations/pagination';
const Dog = () => {
  const { products, setProducts,isLoggedIn, setIsLoggedIn,sortingOptions } = useContext(mycontext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const handleMouseEnter = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Hide price after 5 seconds
  }; 

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; 
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    fetchDogProducts();
  }, []);

  const fetchDogProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/user/products/category/Dog",
        { withCredentials: true }
      );

      const updatedProducts = response.data.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id), // Check if product is in cart
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching dog products:", error);
    } finally {
      setLoading(false);
    }
  };
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
  const handleCartAction = async (product) => {
    if (!isLoggedIn) {
      alert("You need to log in to add items to the cart.");
      return;
    }

    if (product.inCart) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id);
    }
  };
  
  const addToCart = async (productId) => {
    if (!isLoggedIn) {
      alert("You need to log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/addToCart",
        { productId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedCartItems = [...cartItems, productId];
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Persist cart items

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
  }

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/cart`, {
        data: { productId },
        withCredentials: true,
      });

      const updatedCartItems = cartItems.filter(item => item !== productId);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Persist cart items

      const updatedProducts = products.map(product =>
        product._id === productId ? { ...product, inCart: false } : product
      );
      setProducts(updatedProducts);
      alert("Product removed from cart successfully");
    } catch (err) {
      console.error("Error removing product from cart:", err);
      alert("Failed to remove product from cart");
    }
  };


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const handleLogin = () => {
    // Logic for logging in
    setIsLoggedIn(true);
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems); // Update context state
    fetchDogProducts(); // Refetch products to update cart state
  };
  
  
  const handleLogout = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };
  ;const handleDoubleClick = (id) => {
    navigate(`/product/${id}`);
  };
  
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
if (sortingOptions.priceSort) {
  filteredProducts.sort((a, b) => {
      if (sortingOptions.priceSort === 'lowToHigh') {
          return a.price - b.price; // Ascending order
      } else if (sortingOptions.priceSort === 'highToLow') {
          return b.price - a.price; // Descending order
      }
      return 0;
  });
}


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

  return (
    <main>
  
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
            <img src="https://media.gettyimages.com/id/182374827/photo/cairn-terrier-with-banner.jpg?s=612x612&w=0&k=20&c=42cTggR3EB4NyWEjKuAADZEs7tM7sxwOjWuhYJUsawQ=" alt="Book 1" />
            <img src="https://media.gettyimages.com/id/184378376/photo/cat-and-dog.jpg?s=612x612&w=0&k=20&c=8HidkC14RA7xU9JwAmmhvRrzl0tuDPJLa6L2NZq80O4=" alt="Book 2" />
            <img src="https://media.gettyimages.com/id/173603002/photo/playful.jpg?s=612x612&w=0&k=20&c=8qUYVT7hY3Q93pBJ1jUW1ZN0vWXyy97nvf2Tx7Mu6s0=" alt="Book 3" />
          </div>
          <div className="carousel-item">
            <img src="https://cdn.pixabay.com/photo/2023/10/01/12/56/shih-tzu-8287355_960_720.jpg" alt="Book 2" />
            <img src="https://cdn.pixabay.com/photo/2024/04/10/14/29/dog-8688183_640.jpg" alt="Book 2" />
            <img src="https://cdn.pixabay.com/photo/2022/10/31/19/04/dog-7560602_1280.jpg" alt="Book 2" />
          </div>
          
          {/* Carousel items here... */}
        </Carousel>
        <Navbar/>
      </div>
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
          <h4 className="peut-card-price">Price: ₹{product.price}</h4>
          <p className="pet-stock">Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}</p>
          <div className="pet-card-buttons">
            <button className='crart-button' onClick={() => handleCartAction(product)}>
              <FaShoppingCart className="cartt-icon" />
            
                {cartItems.includes(product._id) ? "Remove from Cart" : "Add to Cart"}
             
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


        <p>&copy; 2024 PetSpot. All rights reserved.</p>
      </footer>
</main>

);
};



export default Dog;