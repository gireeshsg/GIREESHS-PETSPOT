import { useContext, useState } from "react";
import { mycontext } from "../Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const notify = () => toast("Login successful!");
  const nav = useNavigate();
  const { setToken, isLoggedIn, setIsLoggedIn, setIsAdmin } = useContext(mycontext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState(""); // State for secret key
  const [tapCount, setTapCount] = useState(0); // State for tap count
  const SECRET_KEY = "123"; // Define your secret key here
  
const handleLogin = async () => {
  try {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const response = await axios.post(
      "http://localhost:5000/user/login",
      { email, password },
      { withCredentials: true }
    );

    const data = response.data; // This may be undefined if the request failed.
    console.log("Banned", data)
    if(data.status === 403){
      toast.error('Your account has been banned. Please contact our support team.');
      return;
    }

    // Store user details and token in local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log("token in frontEnd", data.token);
    console.log("Login successful", data.message);
    // Set user token in context
    setToken(data.token);

    // Update login status
    setIsLoggedIn(true);

    // Notify user and navigate to home page
    notify();
    nav("/main");
  } catch (error) {
    // Check if error.response exists before accessing error.response.data
    if (error.response) {
      console.log(error.response.data); // This will show the server's response error message
      alert(error.response.data.message || "Login failed");
    } else {
      console.error("Error:", error.message);
      toast.error("Network error or server is down.");
    }
  }
};


  const handleAdminAccess = () => {
    if (secretKey === SECRET_KEY) {
      nav("/adminlogin"); // Navigate to admin login if the secret key is correct
    } else {
      toast.error("Invalid secret key");
    }
  };

  const handleTap = () => {
    setTapCount(prevCount => prevCount + 1);
    if (tapCount + 1 === 5) {
      // Reset tap count after 5 taps
      setTapCount(0);
    }
  };

  return (
    <header className="loginbody">
      <div className="logini-container" onClick={handleTap}>
        <h1 className="logini-head">Login</h1>
        <input
          className="logini-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="logini-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="logini-btn" onClick={handleLogin}>
          Login
        </button>
        <ToastContainer />
        
        {/* Secret key input */}
        {tapCount >= 3 && (
          <>
            <input
              className="logini-input"
              type="text"
              placeholder="Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <button className="logini-btn" onClick={handleAdminAccess}>
              Enter
            </button>
          </>
        )}
        
        <p className="tt"> Don't have an account?</p>
        <Link to="/register" className="signupp">Sign Up</Link>
      </div>
    </header>
  );
}
