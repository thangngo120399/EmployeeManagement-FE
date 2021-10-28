import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "roles", { headers: authHeader() });
};
const getRole = (id) => {
  return axios.get(API_URL + "roles/" + id, { headers: authHeader() });
};

const deleteRole = (id) => {
  return axios.delete(API_URL + "roles/delete/" + id, {
    headers: authHeader(),
  });
};
const updateRole = (id, name) => {
  return axios.put(API_URL + "roles/update/" + id, {
    name,
  });
};
const createRole = (name) => {
  return axios.post(API_URL + "roles/create", {
    name,
  });
};

export default {
  getAll,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
