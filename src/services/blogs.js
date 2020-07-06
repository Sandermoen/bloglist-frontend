import axios from 'axios';
const baseUrl = '/api/blogs';

const handleError = (err) => {
  throw Error(
    err.response
      ? err.response.data.error
      : err.request
      ? err.request
      : err.message
  );
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    return handleError(err);
  }
};

const create = async (title, author, url, token) => {
  try {
    const response = await axios.post(
      baseUrl,
      { title, author, url },
      { headers: { Authorization: `bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    return handleError(err);
  }
};

const like = async (blog, token) => {
  const { id, ...blogFields } = blog;
  try {
    const response = await axios.put(
      `${baseUrl}/${id}`,
      { ...blogFields, likes: blogFields.likes + 1 },
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    return handleError(err);
  }
};

const deleteBlog = async (id, token) => {
  try {
    await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });
  } catch (err) {
    return handleError(err);
  }
};

export default { getAll, create, like, deleteBlog };
