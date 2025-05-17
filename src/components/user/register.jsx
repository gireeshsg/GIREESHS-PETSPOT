import React, { useContext } from "react";
import { mycontext } from "../Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./register.css";

export default function Register() {
  const nav = useNavigate();

  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
  } = useContext(mycontext);

  const Register = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        name,
        email,
        password,
        confirmPassword, // You still send this for validation
      });
  
      if (response.status === 201) {
        toast.success("Registration successful");
        nav("/login");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data || "Registration failed");
      } else {
        toast.error("Registration failed");
      }
    }
  };
  

  return (
    <header className="b">
    <div className="main-register">
      <ToastContainer />
      <h1 className="main-head">Register</h1>
      <input
        className="reg-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <input
        className="reg-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />{" "}
      <br />
      <input
        className="reg-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />{" "}
      <br />
      <input
        className="reg-input"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />{" "}
      <br />
      <button className="reg-button" onClick={Register}>
        Register
      </button>
      <br />
      <p className="pq"> Already have an account?</p>
      <Link to="/login">Login</Link>
    </div>
    </header>
  );
}