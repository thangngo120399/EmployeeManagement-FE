import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "certificateds", { headers: authHeader() });
};
const getCertificated = (id) => {
  return axios.get(API_URL + "certificateds/" + id, { headers: authHeader() });
};
const getCertificatedByCandidate = (idCandidate) => {
  return axios.get(API_URL + "Certificateds/GetByIpCadidate/" + idCandidate, {
    headers: authHeader(),
  });
};
const deleteCertificated = (id) => {
  return axios.delete(API_URL + "certificateds/delete/" + id, {
    headers: authHeader(),
  });
};
const updateCertificated = (id, name, certiRank, certiDate, idCandidate) => {
  return axios.put(API_URL + "certificateds/update/" + id, {
    name,
    certiRank,
    certiDate,
    idCandidate,
  });
};
const createCertificated = (name, certiRank, certiDate, idCandidate) => {
  return axios.post(API_URL + "certificateds/create", {
    name,
    certiRank,
    certiDate,
    idCandidate,
  });
};

export default {
  getAll,
  getCertificated,
  getCertificatedByCandidate,
  createCertificated,
  updateCertificated,
  deleteCertificated,
};
