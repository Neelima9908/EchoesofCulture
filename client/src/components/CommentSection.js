import React, { useState } from 'react';
import '../styles/CommentSection.css';

const CommentSection = ({ comments, addComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={index} className="comment-item">{comment}</li>
        ))}
      </ul>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
        ></textarea>
        <button type="submit" className="comment-submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
