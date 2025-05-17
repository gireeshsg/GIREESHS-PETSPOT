import React from 'react';
import './pettips.css'; // Create this CSS file for styling

const PetCareTips = () => {
  const tips = [
    {
      title: "Regular Vet Check-ups",
      description: "Ensure your pet receives regular check-ups to stay healthy and vaccinated."
    },
    {
      title: "Proper Nutrition",
      description: "Feed your pet a balanced diet suitable for their age and breed."
    },
    {
      title: "Exercise and Play",
      description: "Daily exercise is vital for your pet's physical and mental health."
    },
    {
      title: "Training and Socialization",
      description: "Early training and socialization can help prevent behavioral issues."
    },
    {
      title: "Grooming",
      description: "Regular grooming keeps your pet clean and comfortable."
    }
  ];

  return (
    <section className="pet-care-tips">
      <h2>Pet Care Tips</h2>
      <div className="tips-container">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PetCareTips;
