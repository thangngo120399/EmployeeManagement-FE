import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { history } from "../../../helpers/history";
import candidateService from "../../../services/candidate.service";

import ListExperience from "../Experiences/ListItem/ListItem";
import ListFresher from "../Freshers/ListItem/ListItem";
import ListIntern from "../Interns/ListItem/ListItem";

toast.configure();

const CandidateHome = (props) => {
  const [listExperience, setListExperience] = useState([]);
  const [listFresher, setListFresher] = useState([]);
  const [listIntern, setListIntern] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    candidateService.getAllExperience().then(
      (response) => {
        setListExperience(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        toast.error(_content);
      }
    );
  }, []);
  useEffect(() => {
    candidateService.getAllFresher().then(
      (response) => {
        setListFresher(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        toast.error(_content);
      }
    );
  }, []);
  useEffect(() => {
    candidateService.getAllIntern().then(
      (response) => {
        setListIntern(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        toast.error(_content);
      }
    );
  }, []);

  const handleCreate = () => {
    history.push({
      pathname: "/candidate/add",
    });
  };
  return (
    <div className="container">
      <div className="title-department gradient-buttons">
        <button
          className="btn btn-success "
          onClick={handleCreate}
          style={{ marginBottom: " 20px" }}
        >
          Create New Candidate
        </button>
        <ul
          class="nav nav-pills nav-fill"
          id="pills-tab"
          role="tablist"
          style={{ marginBottom: "40px" }}
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-home"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Experiences
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="pills-profile-tab"
              data-toggle="pill"
              href="#pills-profile"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Freshers
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="pills-contact-tab"
              data-toggle="pill"
              href="#pills-contact"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Interns
            </a>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <ListExperience items={listExperience}></ListExperience>
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <ListFresher items={listFresher}></ListFresher>
          </div>
          <div
            class="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            {listIntern.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateHome;
