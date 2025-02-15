import React, { useState, useEffect } from 'react';
import TribeCard from '../components/TribeCard'; // Assuming you have a TribeCard component
import LanguageCard from '../components/LanguageCard'; // Assuming you have a LanguageCard component
import '../styles/Learn.css'; // Add styles for Learn page

const Learn = () => {
  const [tribes, setTribes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch tribes and languages data
    const fetchTribesAndLanguages = async () => {
      try {
        // Fetch tribes
        const tribesResponse = await fetch('http://localhost:5000/Tribe_API/tribes/tribe');
        if (!tribesResponse.ok) throw new Error('Failed to fetch tribes');
        const tribesData = await tribesResponse.json();
        setTribes(tribesData.species);

        // Fetch languages
        const languagesResponse = await fetch('http://localhost:5000/Language_API/languages/lang');
        if (!languagesResponse.ok) throw new Error('Failed to fetch languages');
        const languagesData = await languagesResponse.json();
        console.log(languagesData);
        setLanguages(languagesData.species);
      } catch (error) {
        setMessage('An error occurred while fetching data.');
        console.error('Error:', error);
      }
    };

    fetchTribesAndLanguages();
  }, []);

  return (
    <div className="learn-container">
      <h1>Learn About Tribes and Languages</h1>
      {message && <p>{message}</p>}

      <div className="tribe-language-grid">
        {/* Display tribes */}
        <div className="tribes-section">
          <h2>Tribes</h2>
          {console.log('speciesList:', tribes)}
          {console.log('Is speciesList an array?', Array.isArray(tribes))}
          <div className="cards-container">
            {tribes.length > 0 ? (
              tribes.map((tribe) => (<TribeCard key={tribe.id} tribe={tribe} />))
            ) : (
              <p>No tribes found.</p>
            )}
          </div>
        </div>

        {/* Display languages */}
        <div className="languages-section">
          <h2>Languages</h2>
          {console.log('speciesList:', languages)}
          {console.log('Is speciesList an array?', Array.isArray(languages))}
          <div className="cards-container">
            {languages.length > 0 ? (
              languages.map((language) => (<LanguageCard key={language.id} language={language} />))
            ) : (
              <p>No languages found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
