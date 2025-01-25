


// import React, { useState } from 'react';
// import axios from 'axios';

// const AddressForm = ({ address, onSubmit }) => {
//   const [formData, setFormData] = useState(address || {
//     label: '',
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     state: '',
//     zip: '',
//     country: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSubmit(formData);
//     setFormData({ label: '', addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: '' });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="label" value={formData.label} onChange={handleChange} placeholder="Address Label" required />
//       <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" required />
//       <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
//       <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
//       <input name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
//       <input name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP Code" required />
//       <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
//       <button  type="submit">Submit</button>
//     </form>
//   );
// };

// export default AddressForm;
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mycontext } from '../Context';
import axios from "axios";
import './home.css';
import Navbar from '../Navabar/navabar'; 
import SortingOptions from '../animations/sorting';
import { FaInstagram, FaHeart, FaTwitter, FaFacebookF,FaRegHeart,FaShoppingCart } from "react-icons/fa";
import { Carousel } from 'react-responsive-carousel';
const Cat = () => {
  const { products, setProducts ,isLoggedIn,wishlistItems} = useContext(mycontext);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const handleMouseEnter = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Hide price after 5 seconds
  }; 

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    fetchDogProducts();
  }, []);

  const fetchDogProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/user/products/category/Cat",
        {
          withCredentials: true,
        }
      );

      const updatedProducts = response.data.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id),
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching dog products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCartAction = async (product) => {
    if (product.inCart) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/addToCart",
        { productId },
        {
          withCredentials: true,
        }
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

      const updatedCartItems = cartItems.filter(item => item !== productId);
      setCartItems(updatedCartItems);

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
  const handleDoubleClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div>
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
            <img src="https://cdn.pixabay.com/photo/2017/08/07/12/35/cat-2603395_640.jpg" alt="Book 1" />
            <img src="https://cdn.pixabay.com/photo/2019/11/18/00/38/dog-4633734_640.jpg" alt="Book 2" />
            <img src="https://cdn.pixabay.com/photo/2023/05/31/17/54/cat-8031947_640.jpg" alt="Book 3" />
          </div>
          <div className="carousel-item">
            <img src="https://cdn.pixabay.com/photo/2023/10/01/12/56/shih-tzu-8287355_960_720.jpg" alt="Book 2" />
            <img src="https://cdn.pixabay.com/photo/2024/04/10/14/29/dog-8688183_640.jpg" alt="Book 2" />
            <img src="https://cdn.pixabay.com/photo/2022/10/31/19/04/dog-7560602_1280.jpg" alt="Book 2" />
          </div>
          
          {/* Carousel items here... */}
        </Carousel> 
      <Navbar />
      <div className='main-section'>
        <div>
          <SortingOptions />
          {/* Category buttons */}
        </div>
        <div className='card-container'>
          {products.map((product) => (
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
          ))}
          
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          {/* Your footer content */}
        </div>
      </footer>
    </div>
  );
};


export default Cat;