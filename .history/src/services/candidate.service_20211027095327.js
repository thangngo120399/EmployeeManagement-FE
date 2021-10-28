import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/";

const getAll = () => {
  return axios.get(API_URL + "candidates", { headers: authHeader() });
};
const getExperience = () => {
  return axios.get(API_URL + "candidates/GetAllExperience", {
    headers: authHeader(),
  });
};
const getFresher = () => {
  return axios.get(API_URL + "candidates/GetAllFresher", {
    headers: authHeader(),
  });
};
const getIntern = () => {
  return axios.get(API_URL + "candidates/GetAllIntern", {
    headers: authHeader(),
  });
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
  dob,
  phone,
  email,
  education,
  graduationDate,
  graduationRank
) => {
  return axios.put(API_URL + "candidates/UpdateFresher/" + id, {
    fullName,
    dob,
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
  dob,
  phone,
  email,
  education,
  major,
  semester
) => {
  return axios.put(API_URL + "candidates/UpdateIntern/" + id, {
    fullName,
    dob,
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
  dob,
  phone,
  email,
  education,
  experInYear,
  skills
) => {
  return axios.put(API_URL + "candidates/UpdateExperience/" + id, {
    fullName,
    dob,
    phone,
    email,
    education,
    experInYear,
    skills,
  });
};
const createFresher = (
  fullName,
  dob,
  phone,
  email,
  education,
  graduationDate,
  graduationRank
) => {
  return axios.post(API_URL + "candidates/CreateFresher", {
    fullName,
    dob,
    phone,
    email,
    education,
    graduationDate,
    graduationRank,
  });
};
const createIntern = (
  fullName,
  dob,
  phone,
  email,
  education,
  majors,
  semester
) => {
  console.log(fullName + dob + phone + email + education + majors + semester);
  return axios.post(API_URL + "candidates/CreateIntern", {
    fullName,
    dob,
    phone,
    email,
    education,
    majors,
    semester,
  });
};
const createExperience = (
  fullName,
  dob,
  phone,
  email,

  experInYear,
  skills
) => {
  return axios.post(API_URL + "candidates/CreateExperience", {
    fullName,
    dob,
    phone,
    email,

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
