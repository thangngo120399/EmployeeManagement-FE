import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "insurances", { headers: authHeader() });
};
const getInsurance = (id) => {
  return axios.get(API_URL + "insurances/" + id, { headers: authHeader() });
};

const deleteInsurance = (id) => {
  return axios.delete(API_URL + "insurances/delete/" + id, {
    headers: authHeader(),
  });
};
const updateInsurance = (id, name) => {
  return axios.put(API_URL + "insurances/update/" + id, {
    name,
  });
};
const createInsurance = (name) => {
  return axios.post(API_URL + "insurances/create", {
    name,
  });
};

export default {
  getAll,
  getInsurance,
  createInsurance,
  updateInsurance,
  deleteInsurance,
};
