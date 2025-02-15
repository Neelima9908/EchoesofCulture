import React from 'react';
import '../styles/TribeCard.css';

const TribeCard = ({ tribe }) => {
  return (
    <div className="tribe-card">
      <h3 className="tribe-name">{tribe.name}</h3>
      <p className="tribe-location">Location: {tribe.location}</p>
      <p className="tribe-description">{tribe.description}</p>
      <p className="tribe-customs">Customs: {tribe.customs}</p>
      <p className="tribe-customs">Language: {tribe.language_ids}</p>
    </div>
  );
};

export default TribeCard;
