import React from 'react';

const CommentList = ({comments}) => (
  <div>
    <h2>Comments</h2>
    {comments.length === 0 ? (
      <p>No comments available.</p>
    ) : (
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p className='commentText'>{comment.description}</p>
            <span className='commentDate'>{comment.date}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CommentList;