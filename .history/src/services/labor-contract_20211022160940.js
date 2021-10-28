import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "LaborContracts", { headers: authHeader() });
};
const getLaborContract = (id) => {
  return axios.get(API_URL + "LaborContracts/" + id, { headers: authHeader() });
};

const deleteLaborContract = (id) => {
  return axios.delete(API_URL + "LaborContracts/delete/" + id, {
    headers: authHeader(),
  });
};
const updateLaborContract = (id, nameLaborContract, address) => {
  return axios.put(API_URL + "LaborContracts/update/" + id, {
    nameLaborContract,
    address,
  });
};
const createLaborContract = (nameLaborContract, address) => {
  return axios.post(API_URL + "LaborContracts/create", {
    nameLaborContract,
    address,
  });
};

export default {
  getAll,
  getLaborContract,
  createLaborContract,
  updateLaborContract,
  deleteLaborContract,
};
