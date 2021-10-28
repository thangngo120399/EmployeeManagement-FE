import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "positions", { headers: authHeader() });
};
const getPosition = (id) => {
  return axios.get(API_URL + "positions/" + id, { headers: authHeader() });
};

const deletePosition = (id) => {
  return axios.delete(API_URL + "positions/delete/" + id, {
    headers: authHeader(),
  });
};
const updatePosition = (id, namePosition) => {
  return axios.put(API_URL + "positions/update/" + id, {
    namePosition,
  });
};
const createPosition = (namePosition) => {
  return axios.post(API_URL + "positions/create", {
    namePosition,
  });
};

export default {
  getAll,
  getPosition,
  createPosition,
  updatePosition,
  deletePosition,
};
