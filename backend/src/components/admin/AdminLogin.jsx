import React, { useContext, useState } from "react";
import { mycontext } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  // const { email, setEmail, password, setPassword, setToken } = useContext(mycontext);
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Basic form validation
    if (!email || !password) {
      alert("Please fill out both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/login",
        { email, password },
        { withCredentials: true }
      );

      const data = response.data;
      console.log("response.data adminlogin", response.data);

      if (data.token) {
        // Set the token in the state
        // setToken(data.token);
        console.log("token in frontEnd", data.token);
        console.log("Login successful", data.message);
        localStorage.setItem("email",email)
        localStorage.setItem("adminToken",data.token)
        alert("Welcome Admin");
        navigate("/admin");
      } else {
        console.error("Token not found in response");
        alert("Invalid response from the server");
      }
    } catch (error) {
      console.error("Login failed", error.message);
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="adminLogin-main">
      <h2 className="adminLogin-head">Admin Login</h2>
      <form className="adminLogin-Form" onSubmit={(e) => e.preventDefault()}>
        <label className="adminLogin-Label">Email:</label>
        <input
          className="adminLogin-Input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label className="adminLogin-Label">Password:</label>
        <input
          className="adminLogin-Input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="adminLogin-Btn" type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
