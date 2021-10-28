import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "departments", { headers: authHeader() });
};

const deleteDepartment = (id) => {
  return axios.delete(API_URL + "users/delete/" + id, {
    headers: authHeader(),
  });
};
const updateDepartment = (
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
const addDepartment = (
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
  return axios.post(API_URL + "users/add", {
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
  addEmployee,
};
