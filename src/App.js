import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginService.login(username, password);
      setUser(response);
      window.localStorage.setItem('user', JSON.stringify(response));
    } catch (err) {
      setNotification({ message: err.message, error: true });
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create(title, author, url, user.token);
      setBlogs((previous) => [...previous, blog]);
      setNotification({
        message: `a new blog ${title} by ${author} added`,
      });
      blogFormRef.current.toggleVisibility();
    } catch (err) {
      setNotification({ message: err.message, error: true });
    }
  };

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.like(blog, user.token);
      setBlogs((previous) =>
        previous.map((blog) => {
          if (blog.id === updatedBlog.id) {
            return { ...blog, likes: blog.likes + 1 };
          }
          return blog;
        })
      );
    } catch (err) {
      setNotification({ message: err.message, error: true });
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id, user.token);
      setBlogs((previous) => previous.filter((blog) => blog.id !== id));
    } catch (err) {
      setNotification({ message: err.message, error: true });
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {notification && (
        <Notification
          error={notification.error}
          hide={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
      {user && (
        <div>
          <h3>{user.username} logged in</h3>{' '}
          <button onClick={handleLogout}>logout</button>
          <h2>Create New</h2>
          <Toggleable buttonLabel="New blog" ref={blogFormRef}>
            <NewBlogForm createBlog={createBlog} />
          </Toggleable>
        </div>
      )}
      {user ? (
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
            />
          ))
      ) : (
        <LoginForm login={login} />
      )}
    </div>
  );
};

export default App;
