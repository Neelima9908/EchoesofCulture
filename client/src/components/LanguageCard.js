import React from "react";
import "../styles/LanguageCard.css";

const LanguageCard = ({ language }) => {
  return (
    <div className="language-card">
      <h2>{language.name}</h2>
      <p>{language.origin}</p>
      <p>{language.family}</p>
      <p>{language.status}</p>
    </div>
  );
};

export default LanguageCard;
