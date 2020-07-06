import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    createBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={(event) => handleCreateNewBlog(event)}>
      <div>
        title{' '}
        <input
          id="title"
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
      </div>
      <div>
        author{' '}
        <input
          id="author"
          type="text"
          onChange={(event) => setAuthor(event.target.value)}
          value={author}
        />
      </div>
      <div>
        url{' '}
        <input
          id="url"
          type="text"
          onChange={(event) => setUrl(event.target.value)}
          value={url}
        />
      </div>
      <button id="create-blog-button" type="submit">
        Create
      </button>
    </form>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
