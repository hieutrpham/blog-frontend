import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAuthConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getAuthConfig());
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    newObject,
    getAuthConfig()
  );
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getAuthConfig());
};

export default { getAll, create, setToken, update, remove };
