import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Blog.css';

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [showMore, setShowMore] = useState(false);
  const handleLikeBlog = (event) => {
    event.preventDefault();
    likeBlog({ ...blog, user: blog.user._id });
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();
    const shouldDelete = window.confirm(
      `Delete ${blog.title} by ${blog.author}`
    );
    shouldDelete && deleteBlog(blog.id);
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowMore((previous) => !previous)}>
        {showMore ? 'Hide' : 'View'}
      </button>
      {showMore && (
        <div className="blog__content">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button onClick={(event) => handleLikeBlog(event)}>like</button>
          </p>
          <p>{blog.user.username}</p>
          <button onClick={(event) => handleDeleteBlog(event)}>Delete</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
