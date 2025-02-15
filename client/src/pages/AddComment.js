import React, { useState } from 'react';
import '../styles/AddComment.css';

const AddComment = () => {
  const [text, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/Comment_API/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log(text);
        alert('Comment added!');
        setComment('');
      })
      .catch((error) => console.error('Error adding comment:', error));
  };

  return (
    <div className="add-comment-container">
      <h1>Add a Comment</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddComment;

