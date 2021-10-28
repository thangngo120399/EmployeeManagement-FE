import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "candidates", { headers: authHeader() });
};
const getCandidate = (id) => {
  return axios.get(API_URL + "candidates/" + id, { headers: authHeader() });
};

const deleteCandidate = (id) => {
  return axios.delete(API_URL + "candidates/delete/" + id, {
    headers: authHeader(),
  });
};
const updateFresher = (
  id,
  fullName,
  bod,
  phone,
  email,
  education,
  graduationDate,
  graduationRank
) => {
  return axios.put(API_URL + "candidates/UpdateFresher/" + id, {
    fullName,
    bod,
    phone,
    email,
    education,
    graduationDate,
    graduationRank,
  });
};
const updateIntern = (
  id,
  fullName,
  bod,
  phone,
  email,
  education,
  major,
  semester
) => {
  return axios.put(API_URL + "candidates/UpdateIntern/" + id, {
    fullName,
    bod,
    phone,
    email,
    education,
    major,
    semester,
  });
};
const updateExperience = (
  id,
  fullName,
  bod,
  phone,
  email,
  education,
  experInYear,
  skills
) => {
  return axios.put(API_URL + "candidates/UpdateExperience/" + id, {
    fullName,
    bod,
    phone,
    email,
    education,
    experInYear,
    skills,
  });
};
const createFresher = (
  fullName,
  bod,
  phone,
  email,
  education,
  graduationDate,
  graduationRank
) => {
  return axios.post(API_URL + "candidates/CreateFresher", {
    fullName,
    bod,
    phone,
    email,
    education,
    graduationDate,
    graduationRank,
  });
};
const createIntern = (
  fullName,
  bod,
  phone,
  email,
  education,
  major,
  semester
) => {
  return axios.post(API_URL + "candidates/CreateIntern", {
    fullName,
    bod,
    phone,
    email,
    education,
    major,
    semester,
  });
};
const createExperience = (
  fullName,
  bod,
  phone,
  email,
  education,
  experInYear,
  skills
) => {
  return axios.post(API_URL + "candidates/CreateExperience", {
    fullName,
    bod,
    phone,
    email,
    education,
    experInYear,
    skills,
  });
};

export default {
  getAll,
  getCandidate,
  createFresher,
  createIntern,
  createExperience,
  updateFresher,
  updateIntern,
  updateExperience,
  deleteCandidate,
};
