import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "employes", { headers: authHeader() });
};

const getEmployee = (id) => {
  return axios.get(API_URL + "employes/" + id, { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const deleteEmployee = (id) => {
  return axios.delete(API_URL + "employes/delete/" + id, {
    headers: authHeader(),
  });
};
const updateEmployee = (
  id,
  fullName,
  gender,
  address,
  dob,
  phone,
  status,
  idDepartment,
  idAcademicLevel,
  email,
  idPosition
) => {
  console.log(
    fullName +
      gender +
      address +
      dob +
      phone +
      status +
      idDepartment +
      idAcademicLevel +
      email +
      idPosition
  );
  return axios.put(API_URL + "employes/update/" + id, {
    fullName,
    gender,
    address,
    dob,
    phone,
    status,
    idDepartment,
    idAcademicLevel,
    email,
    idPosition,
  });
};
const addEmployee = (
  fullName,
  gender,
  address,
  dob,
  phone,
  status,
  idDepartment,
  idAcademicLevel,
  email,
  idPosition
) => {
  console.log(
    fullName +
      gender +
      address +
      dob +
      phone +
      status +
      idDepartment +
      idAcademicLevel +
      email +
      idPosition
  );
  return axios.post(API_URL + "employes/create", {
    fullName,
    gender,
    address,
    dob,
    phone,
    status,
    idDepartment,
    idAcademicLevel,
    email,
    idPosition,
  });
};

export default {
  getAll,
  getEmployee,
  getModeratorBoard,
  getAdminBoard,
  deleteEmployee,
  updateEmployee,
  addEmployee,
};
