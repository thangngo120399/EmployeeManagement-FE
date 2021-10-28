import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "academicLevels", { headers: authHeader() });
};
const getAcademicLevel = (id) => {
  return axios.get(API_URL + "academicLevels/" + id, { headers: authHeader() });
};

const deleteAcademicLevel = (id) => {
  return axios.delete(API_URL + "academicLevels/delete/" + id, {
    headers: authHeader(),
  });
};
const updateAcademicLevel = (id, name, address) => {
  return axios.put(API_URL + "academicLevels/update/" + id, {
    name,
    address,
  });
};
const createAcademicLevel = (name, address) => {
  return axios.post(API_URL + "academicLevels/create", {
    name,
    address,
  });
};

export default {
  getAll,
  getAcademicLevel,
  createAcademicLevel,
  updateAcademicLevel,
  deleteAcademicLevel,
};
