import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { history } from "../../../helpers/history";
toast.configure();

const CandidateHome = (props) => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  let { id } = useParams();
  let { nameDepartment } = useParams();
  console.log(id);
  const handleCreate = () => {
    history.push({
      pathname: "/candidate/add",
    });
  };
  return (
    <div className="container">
      <div className="title-department">
        <button className="btn btn-success" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CandidateHome;
