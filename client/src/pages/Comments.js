/*import React, { useState, useEffect } from 'react';
import '../styles/Comments.css';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/Comment_API/comments')
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching comments:', error));
  }, []);

  return (
    <div className="comments-container">
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;*/

import React, { useState, useEffect } from 'react';
//import SpeciesCard from '../components/SpeciesCard'; // Ensure correct path to SpeciesCard component
import '../styles/Comments.css'; // Include your styles

const Comments = () => {
  const [comments, setComments] = useState([]);

  // Fetch species data on component mount
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch('http://localhost:5000/Comment_API/comments');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched comments:', data);
        console.log('Is data.comments an array?', Array.isArray(data.species));
        setComments(data.species); // Update state with the species array
      } catch (error) {
        console.error('Failed to fetch species:', error);
      }
    };
  
    fetchSpecies();
  }, []);
  

  return (
    <div className="comments-container">
      <h1>Comments</h1>
      {console.log('speciesList:', comments)}
    {console.log('Is speciesList an array?', Array.isArray(comments))}
      <div className="species-grid">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} >{comment.text}</li> 
          ))
        ) : (
          <p>Loading Comments</p>
        )}
      </div>
    </div>
  );
};

export default Comments;

