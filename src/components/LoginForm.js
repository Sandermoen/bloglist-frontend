import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    login(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={(event) => handleLogin(event)}>
      <div>
        username{' '}
        <input
          id="username"
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </div>
      <div>
        password{' '}
        <input
          id="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </div>
      <button id="submit-button" type="submit">
        login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
