import React from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './About.css'; // Styling

const About = () => {
    const Navigate=useNavigate()
    function pets() {
Navigate("/main")
        
    }
  return (
    <div className="about-page">

      {/* Header Section */}
      <div className="about-header">
        <h1>About PetSpot</h1>
        <p>Your ultimate destination for finding the perfect furry, feathery, or scaly companion!</p>
      </div>

      {/* What We Offer Section */}
      <div className="section-container offer-section">
        <h2>What We Offer</h2>
        <p>
          At <strong>PetSpot</strong>, we take pride in offering a wide variety of pets from all around the world. We carefully handpick our pets to ensure they are healthy, happy, and ready to become a beloved part of your family. Our pets come from reputable breeders who prioritize well-being, and we’re here to guide you in choosing the best match for your lifestyle.
        </p>
      </div>

      {/* Breeds Available Section */}
      <div className="section-container breeds-section">
        <h3>Breeds Available:</h3>
        <ul>
          <li><strong>Dogs:</strong> From tiny pups to majestic breeds, our collection is vast and diverse.</li>
          <li><strong>Cats:</strong> From playful kittens to independent cats, you’ll find your feline friend here.</li>
          <li><strong>Birds:</strong> Looking for a chirpy companion? We offer colorful, exotic, and friendly birds.</li>
          <li><strong>Rabbits:</strong> Soft, gentle, and cute – rabbits are perfect for those looking for a quiet and affectionate pet.</li>
        </ul>
      </div>

      {/* Why Choose Us Section */}
      <div className="section-container why-choose-section">
        <h3>Why Choose PetSpot?</h3>
        <ul>
          <li><strong>Quality Breeding:</strong> All our pets are sourced from verified, responsible breeders who follow ethical practices.</li>
          <li><strong>Healthy Pets:</strong> We believe in offering only the healthiest pets, ensuring they are vaccinated, dewormed, and ready to join your home.</li>
          <li><strong>Reliable Delivery:</strong> We offer safe and efficient delivery services, so your new pet will reach you in perfect condition.</li>
          <li><strong>Customer Care:</strong> Our team is dedicated to providing you with exceptional service before, during, and after your purchase.</li>
        </ul>
      </div>

      {/* Our Promise Section */}
      <div className="section-container promise-section">
        <h3>Our Promise:</h3>
        <ul>
          <li><strong>Love & Care:</strong> Each pet is raised with love, care, and attention, ensuring they are well-socialized and happy.</li>
          <li><strong>Expert Guidance:</strong> We provide expert advice and support to help you care for your new friend. From choosing the right breed to tips on training and health, we’ve got you covered.</li>
        </ul>
      </div>

      {/* Call to Action Section */}
      <div className="cta-container">
        <button onClick={pets} className="cta-button">Shop Now</button>
      
      </div>

    </div>
  );
};

export default About;
