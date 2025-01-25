import React, { useState } from 'react';
import axios from 'axios';
import Birds from './components/navlnks/birds';
import Rabbit from './components/navlnks/rabbit';
import { useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { mycontext } from './components/Context';
import Navbar from './components/Navabar/navabar';
import AdminAddProduct from './components/admin/AdminAddProduct';
import AdminEditProduct from './components/admin/AdminEditProduct';
import AdminPage from './components/admin/AdminPage';
import About from './components/Navabar/About';
import Transitionvideo from './components/animations/transmistion';
import Food from './components/navlnks/food';
import SellPetForm from './components/user/sellnow';
import Usersection from './components/admin/usermanagement';
import { useReducer } from 'react';
import Order from './components/user/ordercheckout';
import SellingDetails from './components/admin/selling';
import PaymentPage from './components/user/payment';
import { useEffect } from 'react';
import MyOrderPage from './components/navlnks/demo2';
import UserProfile from './components/user/account';
import Wishlist from './components/user/wishlist';
import BuyNowPage from './components/user/buynowpage';
import AdminProducts from './components/admin/AdminProduct';
import AdminLogin from './components/admin/AdminLogin';
import Card from './components/navlnks/home';
import SpecificProductPage from './components/Navabar/detailspage';
import Cart from './components/user/cart';
import AdminAddPetfood from './components/admin/AdminAddpetfood';
import AdminEditpetfood from './components/admin/AdminEditpetfood';
import Adminpetfoods from './components/admin/Adminpetfood';
import Register from './components/user/register';
// import UserDetails from './components/user/userdetails';
import ContactForm from './components/Navabar/contact';
import Dog from './components/navlnks/dog';
import AddressForm from './components/navlnks/cat,';
import AddressManager from './components/navlnks/birds';
import Login from './components/user/login';
import OrderManagement from './components/admin/user';
import Banner from './components/navlnks/rabbit';
import Cat from './components/navlnks/cat,';
import Mainn from './components/animations/main';
import ReviewForm from './components/user/review';
import UserManagementt from './components/admin/new';
import UserDetails from './components/user/userdetails';
function App() {
  const [User, setUser] = useState([]);
  const [userlog, setuserlog] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [product, setProduct] = useState({
    category: "",
    breed: "",
    color: "",
    gender: "",
    description: "",
    detailImage: "",
    price: "",
    image: "",
    country: "",
    size: "",
    petcount:"",
    stock:""
    
  });
  const [petFood, setPetFood] = useState({
    category: "",
    brand: "",
    flavor: "",
    quantity: "",
    pfooddescription: "",
    foodprice: "",
    image: "",
    nutritionalInfo : "",
    detailfoodImage : "",
    units: "",
    
  });
  const [addressDetails, setAddressDetails] = useState({
    fullname:"",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    addressType: "",
    phone: "",
   
  });
  
  const [sortingOptions, setSortingOptions] = useState({
    category: 'all', // Ensure a default category is set
    breed: [],
    sizes: [],
    gender: [],
    priceRange: [0, 40000],
});
useEffect(() => {
  const savedToken = localStorage.getItem("adminToken"); // adjust this according to your setup
  if (savedToken) {
    setToken(savedToken);
  }
}, []);

const [token, setToken] = useState(null);
const [formData, setFormData] = useState({
  sellerName: '',
  sellerContact: '',
  sellerAddress: '',
  vaccinationStatus: '',
  reasonForSelling: '',
  category: '',
  breed: '',
  gender: '',
  size: '',
  healthIssues: '',
  image: null
});


const [searchTerm, setSearchTerm] = useState('');
const[ userAddresses, setUserAddresses] =useState([])
const [products, setProducts] = useState([]);
const [cartItems, setCartItems] = useState([]);
const [specificProduct, setSpecificProduct] = useState({});
const [inCart, setInCart] = useState(false);
const [wishlistItems, setWishlistItems] = useState([]);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const[isAdmin,setIsAdmin] =useState(false)
const[adminToken,setAdminToken] =useState(false)
const [userRole,setuserRole]=useState(null)

const[userId,setuserId]=useState([])
// const [cart, dispatch] = useReducer( []);

  const [userToken, setUserToken] = useState(null);

   const [sellers, setSellers] = useState([]);
   const [orders, setOrders] =useState([])
   const [petFoods,setPetFoods] = useState([]);
   const[pets, setPets]=useState([])
  
  const[userDetails, setUserDetails]=useState({})
  const [loading, setLoading] = useState(false);
  const [banReason, setBanReason] =useState("")
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
    const values = {
    newEmail,setAdminEmail,
    userId,setuserId,
    newPassword,setNewPassword,
    showResetForm,setShowResetForm,
    showEmailForm,setShowEmailForm,
    loading,setLoading,
    isLoggedIn,setIsLoggedIn,
    name,setName,
    searchTerm,setSearchTerm,
    userAddresses,setUserAddresses,
    adminToken,setAdminToken,
    userDetails,setUserDetails,
    petFoods,setPetFoods,
    password,setPassword,
    wishlistItems,setWishlistItems,
    confirmPassword,setConfirmPassword,
    email,setEmail,
    specificProduct,setSpecificProduct,
    adminEmail, setAdminEmail,
    product, setProduct,
    addressDetails,setAddressDetails,
    token, setToken,
 sellers,setSellers,
 isAdmin,setIsAdmin,
 banReason,setBanReason,
    orders,setOrders,
    formData,setFormData,
    userToken,setUserToken,
    products, setProducts,
    petFood,setPetFood,
    User, setUser,
    userlog, setuserlog,
    cartItems,setCartItems,
    inCart,setInCart,
    pets,setPets,
    // cart, dispatch,
    sortingOptions,setSortingOptions,
    userRole,setuserRole,
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <mycontext.Provider value={values} >
          <Routes>   
            <Route path="/product/:productId" element={<SpecificProductPage />} />

          <Route path="/main" element={<Card />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/adminProducts" element={<AdminProducts />} />
            <Route path="/adminpetfood" element={<Adminpetfoods />} />
            <Route path="/addadminpetfood" element={<AdminAddPetfood />} />
            <Route path="/addProduct" element={<AdminAddProduct />} />
            <Route path="/adminEditProduct/:productId" element={<AdminEditProduct />} />
            <Route path="/adminEditPetfood/:petFoodId" element={<AdminEditpetfood />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/dog" element={<Dog />} />
            <Route path="/buy/:productId" element={<BuyNowPage />} />
            {/* <Route path="" element={< OrderPage/>} /> */}
            {/* <Route path="/addres" element={<AddressManager />} /> */}
            {/* <Route path="/form" element={< AddressForm/>} /> */}
            <Route path="/userr" element={< UserDetails/>} />
            <Route path="/cat" element={< Cat/>} />
            <Route path="/c" element={< Transitionvideo/>} />
            {/* <Route path="/food" element={< Food/>} /> */}
            <Route path="/" element={<Mainn/>} />
            <Route path="/contact" element={<ContactForm/>} />
            <Route path="/wishlist" element={< Wishlist/>} />
            <Route path="/ban" element={< UserManagementt/>} />
            <Route path="/user" element={< UserProfile/>} />
             {/* <Route path="/ban" element={<Banner />} /> */}
             <Route path="/order" element={< MyOrderPage/>} />
             {/* <Route path="/payment" element={<PaymentPage />} /> */}
             {/* <Route path="/orders" element={<Orders />} /> */}
             <Route path='/getorder' element={<OrderManagement/>}/>
             <Route path='/getorders' element={<Order/>}/>
             <Route path='/usersection' element={<Usersection/>}/>
             <Route path="/reviews/:productId" element={<ReviewForm/>} />
             <Route path="/sellnow" element={<SellPetForm/>} />
             <Route path="/sell" element={<SellingDetails/>} />
             <Route path="/rabbit" element={<Rabbit/>} />
             <Route path="/bird" element={<Birds/>} />
          </Routes>



        </mycontext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
