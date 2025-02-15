
import React, { useState, useEffect } from 'react';
import '../styles/Languages.css';

const Languages = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [family, setFamily] = useState('');
  const [status, setStatus] = useState('');
  
  //const [created_at, setDate] = useState(''); // To display success/error messages
  const [message, setMessage] = useState(''); 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if the species already exists
    try {
      const checkResponse = await fetch(`http://localhost:5000/Language_API/languages/check?name=${encodeURIComponent(name)}`);
      console.log(checkResponse);
      if (checkResponse.ok) {
        const exists = await checkResponse.json();
        console.log(exists);
        if (exists.exists) {
          setMessage('Language already exists. Please add a different species.');
          return;  // Exit if species already exists
        } else {
          // Species does not exist, proceed to add it
     
          try {
            const payload = { name, origin,family, status};//, created_at
const response = await fetch('http://localhost:5000/Language_API/languages/lang', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

           
            console.log(response);
            if (response.ok) {
              const data = await response.json();
              setMessage('Language added successfully!');
             // onAdd(data); // Optionally, update parent state
            } else {
              const errorText = await response.text(); // Capture server error message if available
              setMessage(`Failed to add Language. Server returned: ${errorText}`);
            }
          } catch (error) {
            console.error('Error adding Language:', error);
            setMessage('An error occurred while adding the Language.');
          }
  
          // Reset form fields after successful submission
          setName('');
          setOrigin('');
          setFamily('');
          setStatus('');
          
         // setDate('');
        }
      } else {
        const errorText = await checkResponse.text(); // Capture server error message if available
        setMessage(`Failed to validate Language. Server returned: ${errorText}`);
        return;
      }
    } catch (error) {
      console.error('Error validating Language:', error);
      setMessage('An error occurred during validation.');
      return;
    }
  };
  

  return (
    <div className="add-species-form-container">
      <h2>Add a New Language</h2>
      <form onSubmit={handleSubmit} className="add-species-form" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Language Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Family"
          value={family}
          onChange={(e) => setFamily(e.target.value)}
          required
        />
        <textarea
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        ></textarea>
       
        <button type="submit">Add Language</button>
      </form>
      {message && <p>{message}</p>}
     
    </div>
  );
};

export default Languages;
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
    </div>*/
      /*<input
          type="date"
          value={created_at}
          onChange={(e) => setDate(e.target.value)}  // Capture the URL instead of file
          placeholder="date"
          required
        />*/