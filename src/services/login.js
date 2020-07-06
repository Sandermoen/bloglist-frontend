import axios from 'axios';
const baseUrl = '/api/login';

const handleError = (err) => {
  throw Error(
    err.response
      ? err.response.data.error
      : err.request
      ? err.request
      : err.message
  );
};

const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, { username, password });
    return response.data;
  } catch (err) {
    return handleError(err);
  }
};

export default {
  login,
};
