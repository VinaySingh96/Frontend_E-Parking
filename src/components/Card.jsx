import React from 'react';
import './Card2.css'; // Import the CSS file for styling

const Card = () => {
  const dummyData = {
    title: 'Example Card',
    description: 'This is a dummy card with some placeholder text.',
    imageUrl: 'https://dummyimage.com/300x200',
    author: 'John Doe',
    date: 'May 26, 2023',
  };

  return (
    <div className="card2 fade-in">
      <img src={dummyData.imageUrl} alt={dummyData.title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{dummyData.title}1</h2>
        <p className="card-description">{dummyData.description}</p>
        <div className="card-footer">
          <span className="card-author">Author: {dummyData.author}</span>
          <span className="card-date">Date: {dummyData.date}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
