import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "departments", { headers: authHeader() });
};
const getDepartment = (id) => {
  return axios.get(API_URL + "departments/" + id, { headers: authHeader() });
};

const deleteDepartment = (id) => {
  return axios.delete(API_URL + "departments/delete/" + id, {
    headers: authHeader(),
  });
};
const updateDepartment = (id, name, address) => {
  return axios.put(API_URL + "departments/update/" + id, {
    name,
    address,
  });
};
const createDepartment = (name, address) => {
  return axios.post(API_URL + "departments/create", {
    name,
    address,
  });
};

export default {
  getAll,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
