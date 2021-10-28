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
  return axios.post(API_URL + "departments/update/" + id, {
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
  return axios.post(API_URL + "departments/add", {
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
  getAll,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
