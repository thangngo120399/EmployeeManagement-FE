import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "employees", { headers: authHeader() });
};

const getEmployee = (id) => {
  return axios.get(API_URL + "employees/" + id, { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getEmployeeByDepartment = (id) => {
  return axios.get(API_URL + "employees/getEmployeeByDepartment/" + id, {
    headers: authHeader(),
  });
};

const deleteEmployee = (id) => {
  return axios.delete(API_URL + "employees/delete/" + id, {
    headers: authHeader(),
  });
};
const blockEmployee = (id) => {
  return axios.delete(API_URL + "employees/EmployeeBlock/" + id, {
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

  return axios.put(API_URL + "employees/update/" + id, {
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
  return axios.post(API_URL + "employees/create", {
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
  blockEmployee
  updateEmployee,
  addEmployee,
  getEmployeeByDepartment,
};
