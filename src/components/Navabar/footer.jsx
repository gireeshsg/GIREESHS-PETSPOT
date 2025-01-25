import React from 'react';
import './footer.css'; // Ensure this CSS file is created

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We are your one-stop destination for all kinds of books, providing an extensive range of genres and authors.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">My Orders</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: support@bookshop.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Book Street, Reading Town</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Book Shop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
