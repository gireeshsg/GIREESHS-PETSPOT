// ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId, fetchReviews }) => {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/reviews', {
        productId,
        username,
        rating,
        comment,
      });
      fetchReviews(); // Refresh the reviews after submission
      setUsername('');
      setRating(1);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)} required>
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
      <textarea
        placeholder="Your Review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
