import React from 'react';
import './pettraining.css'; // Create this CSS file for styling

const PetTrainingTips = () => {
  const trainingTips = [
    {
      title: "Start Early",
      description: "Begin training your pet as soon as you bring them home. Puppies and kittens are more receptive to learning."
    },
    {
      title: "Be Consistent",
      description: "Use the same commands and rewards consistently to avoid confusing your pet."
    },
    {
      title: "Positive Reinforcement",
      description: "Reward good behavior with treats, praise, or playtime to encourage your pet to repeat those behaviors."
    },
    {
      title: "Short Sessions",
      description: "Keep training sessions short and fun to maintain your pet's attention and enthusiasm."
    },
    {
      title: "Socialization",
      description: "Expose your pet to different environments, people, and other animals to help them become well-adjusted."
    }
  ];

  return (
    <section className="pet-training-tips">
      <h2>Pet Training Tips</h2>
      <div className="training-tips-container">
        {trainingTips.map((tip, index) => (
          <div key={index} className="training-tip-card">
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PetTrainingTips;
