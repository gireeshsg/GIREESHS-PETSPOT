import React, { useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import './ContactForm.css';

const ContactForm = () => {
  // States to handle form input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);  // To handle the loading state
  const [error, setError] = useState('');  // To display errors, if any

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start loading
    setIsLoading(true);

    try {
      // Use axios to send the POST request to the backend
      const response = await axios.post(
        'http://localhost:5000/getcomp', // Your backend API URL
        formData,
        { withCredentials: true } // Send the JWT token via cookies
      );

      if (response.status === 200) {
        // Handle success
        alert('Complaint submitted successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        // Handle error
        setError(response.data.error || 'Something went wrong');
      }
    } catch (error) {
      // Handle different error cases
      if (error.response && error.response.status === 400) {
        alert('Missing required fields or invalid data.');
      } else {
        console.error('Error submitting complaint:', error);
        alert('Failed to submit complaint. Please try again.');
      }
      setError('An error occurred. Please try again.');
    } finally {
      // End loading
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Register Your Complaint</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        {error && <p className="error-message">{error}</p>} {/* Show error message */}
        
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Complaint subject"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Complaint Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Describe your complaint"
          ></textarea>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
