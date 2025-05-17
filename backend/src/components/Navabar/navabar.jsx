// src/Navbar.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { FaHome, FaSearch, FaHeart, FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import { GiLabradorHead } from 'react-icons/gi';
import OffcanvasSorting from '../animations/offcanvas';
import { mycontext } from '../Context';
import axios from 'axios';
import CartIcon from './cartbubble';
import { AiOutlineHome } from "react-icons/ai";
import SortingOptions from '../animations/sorting';


     
 
   
import Footer from './footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Marquee from '../animations/marquee';
import './navbar.css'; // Updated CSS import



const Navbar = () => {
  const navigate = useNavigate();
  const { products, setProducts,isLoggedIn, setIsLoggedIn, setCartItems,setOrders } = useContext(mycontext);
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // State for offcanvas
  const [userRole, setUserRole] = useState(''); // State for user role (admin/user)
  const [sorting, setSorting] = useState('default'); // Example sorting state

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term in parent component
  };
  const pet = products.filter((product) =>
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleLogin = () => {
      // Logic to log in (this can be replaced with actual authentication logic)
     navigate("/login")
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId")
const user =localStorage.getItem("user")
    if (token,user,userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  localStorage.removeItem("userId")
  localStorage.removeItem("user")
  localStorage.removeItem("addressDetails")
    setIsLoggedIn(false);
    setOrders([]);
     // Change state to logged out
    navigate("/main"); // Redirect to homepage
  };

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(prev => !prev);
  };
  // Fetch products
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleGetProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/user/products/category/${category}`, { withCredentials: true });
      // const cartItems = await fetchCartItems();

      const updatedProducts = response.data.map(product => ({
        ...product,
        // inCart: cartItems.includes(product._id),
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetdDogProducts = () => {
    handleGetProductsByCategory("Dog");
    navigate(`/dog`);
  };

  const handleGetcatProducts = () => {
    handleGetProductsByCategory("Cat");          
    navigate(`/cat`);
  };
  
  const handleGetBirdProducts = () => {
    handleGetProductsByCategory("Bird");            
    navigate(`/bird`);
  };
  
  
  const handleGetRabbitProducts = () => {
    handleGetProductsByCategory("Rabbit");           
    navigate(`/rabbit`);
  };
  

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   navigate("/");
  // };

  return (
    <footer>
  <div>
    
  </div>

    <header className='hf'>
  
  
  
    {/* <div className="carousel-container">
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
  </div> */}
 
   
    <nav className="navbar">
      
    
    <div className="navbar-container">
   
  <div className="logo-toggle">

    <OffcanvasSorting isOpen={isOffcanvasOpen} onClose={toggleOffcanvas}className="togglee-sorting-btnn" />

    <div className="bounce-logo">
    <h1 className="logoo-text">PetSpot</h1>
    <img src='https://cdn-icons-png.freepik.com/256/6530/6530499.png?uid=R161672310&ga=GA1.1.664586321.1718601121&semt=ais_hybrid' className='bounce-logo' height={40} width={40} />
    
    </div>
    
  </div>



        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/main">Home</Link>
         
          </li>
          <li className="nav-item">
          <Link to={"/main"} className="category-link">Category</Link>

<div className="dropdown-menu">
  <div className="dropdown-section">
    <button className="dropdown-item" onClick={handleGetdDogProducts}>
      <img src="https://img.freepik.com/premium-photo/golden-retriever-dog-white-background_723055-2338.jpg?ga=GA1.1.664586321.1718601121&semt=ais_hybrid" alt="Dog" />
      Dog
    </button>
    
  </div>

  <div className="dropdown-section">
    <button className="dropdown-item" onClick={handleGetcatProducts}>
      <img src="https://img.freepik.com/free-psd/beautiful-cat-portrait-isolated_23-2150186143.jpg?ga=GA1.1.664586321.1718601121&semt=ais_hybrid" alt="Cat" />
      Cat
    </button>
    
  </div>

  <div className="dropdown-section">
    <button className="dropdown-item" onClick={handleGetBirdProducts}>
      <img src="https://img.freepik.com/free-vector/psittacus-eximius-illustrated_53876-34993.jpg?ga=GA1.1.664586321.1718601121&semt=ais_hybrid" alt="Bird" />
      Birds
    </button>
  
  </div>

  <div className="dropdown-section" onClick={handleGetRabbitProducts}>
    <button className="dropdown-item">
      <img src="https://img.freepik.com/free-vector/cute-brown-rabbit-cartoon-character_1308-122042.jpg?ga=GA1.1.664586321.1718601121&semt=ais_hybrid" alt="Rabbit" />
      Rabbit
    </button>
    
  </div>
</div>
</li>

         
          <li className="nav-item">
            <Link to="/about">About</Link>
         
          </li>
          <li className="nav-item">
           
           
          </li>
        

        </ul>
{/* <Link to={"/sellnow"}>review</Link>
<Link to={"/userr"}>user</Link> */}
        <div className="navbar-icons">
          <div className={`search-bar-wrapper ${isSearchOpen ? 'open' : ''}`} ref={searchRef}>
           
            {isSearchOpen && (
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
          onChange={handleSearchChange}
         />
              
              </div>
            )}
          </div>

          
        
         
         <div className="wishlist-container">
          <Link to={"/wishlist"}><FaHeart  className="wishlist-iconn"/></Link>  
          </div>
          <Link to="/cart" className="cart-link">
        < CartIcon className="cart-link"/>
         
        </Link>
          
        {isLoggedIn ? (
    <>
        <button className='login-btn logout-btn' onClick={handleLogout}>
            <FaSignInAlt className="login-icon" />
            <span className='login-text'>Logout</span>
        </button>
        <button className="profile-btn" onClick={() => window.location.href = '/user'}>
            Profile
        </button>
    </>
) : (
    <button className="login-btn" onClick={handleLogin}>
        <FaSignInAlt className="login-icon" />
        <span className="login-text">Login</span>
    </button>
)}

        </div>
      </div>
      
    </nav>
    

  </header>
  <div> </div>
 
  </footer>
  );
};

export default Navbar;
