import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "insurances", { headers: authHeader() });
};
const getInsurance = (id) => {
  return axios.get(API_URL + "insurances/" + id, { headers: authHeader() });
};

const deleteinsurance = (id) => {
  return axios.delete(API_URL + "insurances/delete/" + id, {
    headers: authHeader(),
  });
};
const updateinsurance = (id, nameinsurance, address) => {
  return axios.put(API_URL + "insurances/update/" + id, {
    nameinsurance,
    address,
  });
};
const createinsurance = (nameinsurance, address) => {
  return axios.post(API_URL + "insurances/create", {
    nameinsurance,
    address,
  });
};

export default {
  getAll,
  getinsurance,
  createinsurance,
  updateinsurance,
  deleteinsurance,
};
