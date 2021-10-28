import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getUser = (id) => {
  return axios.get(API_URL + "users/" + id, { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const deleteEmployee = (id) => {
  return axios.get(API_URL + "users/delete/" + id, { headers: authHeader() });
};
const updateEmployee = (
  id,
  fullName,
  gender,
  phone,
  address,
  position,
  academicLevel,
  dateOfBirth,
  department,
  status
) => {
  return axios.post(API_URL + "users/update/" + id, {
    fullName,
    gender,
    phone,
    address,
    position,
    academicLevel,
    dateOfBirth,
    department,
    status,
  });
};
const addEmployee = (
  fullName,
  gender,
  phone,
  address,
  position,
  academicLevel,
  dateOfBirth,
  department,
  status
) => {
  return axios.post(API_URL + "users/add") {
    fullName,
    gender,
    phone,
    address,
    position,
    academicLevel,
    dateOfBirth,
    department,
    status,
  });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUser,
  deleteEmployee,
  updateEmployee,
};
