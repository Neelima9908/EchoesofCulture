import React, { useState, useEffect } from 'react';
import '../styles/Tribes.css';

const Tribes = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [customs, setCustoms] = useState('');
  const [language_ids, setLanguage] = useState('');
  //const [created_at, setDate] = useState(''); // To display success/error messages
  const [message, setMessage] = useState(''); 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if the species already exists
    try {
      const checkResponse = await fetch(`http://localhost:5000/Tribe_API/tribes/check?name=${encodeURIComponent(name)}`);
      console.log(checkResponse);
      if (checkResponse.ok) {
        const exists = await checkResponse.json();
        console.log(exists);
        if (exists.exists) {
          setMessage('Tribe already exists. Please add a different species.');
          return;  // Exit if species already exists
        } else {
          // Species does not exist, proceed to add it
     
          try {
            const payload = { name, description, location,customs, language_ids};//, created_at 
const response = await fetch('http://localhost:5000/Tribe_API/tribes/tribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

           
            console.log(response);
            if (response.ok) {
              const data = await response.json();
              setMessage('Tribe added successfully!');
              //onAdd(data); // Optionally, update parent state
            } else {
              const errorText = await response.text(); // Capture server error message if available
              setMessage(`Failed to add Tribe. Server returned: ${errorText}`);
            }
          } catch (error) {
            console.error('Error adding Tribe:', error);
            setMessage('An error occurred while adding the Tribe.');
          }
  
          // Reset form fields after successful submission
          setName('');
          setDescription('');
          setLocation('');
          setCustoms('');
          setLanguage('');
         // setDate('');
        }
      } else {
        const errorText = await checkResponse.text(); // Capture server error message if available
        setMessage(`Failed to validate Tribe. Server returned: ${errorText}`);
        return;
      }
    } catch (error) {
      console.error('Error validating species:', error);
      setMessage('An error occurred during validation.');
      return;
    }
  };
  

  return (
    <div className="add-species-form-container">
      <h2>Add a New Tribe</h2>
      <form onSubmit={handleSubmit} className="add-species-form" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Tribe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Customs"
          value={customs}
          onChange={(e) => setCustoms(e.target.value)}
          required
        ></textarea>
        <input
            type="text"
            placeholder=" Tribe language"
            value={language_ids}
            onChange={(e) => setLanguage(e.target.value)}
            required
        />

        
        

        <button type="submit">Add Tribe</button>
      </form>
      {message && <p>{message}</p>}
     
    </div>
  );
};

export default Tribes;
/* <div className="tribes-container">
      <h1>Tribes</h1>
      <ul>
        {tribes.map((tribe) => (
          <li key={tribe.id}>
            <h2>{tribe.name}</h2>
            <p>{tribe.description}</p>
          </li>
        ))}
      </ul>
    </div>
    <input
          type="date"
          value={created_at}
          onChange={(e) => setDate(e.target.value)}  // Capture the URL instead of file
          placeholder="Enter image URL"
          required
        />*/