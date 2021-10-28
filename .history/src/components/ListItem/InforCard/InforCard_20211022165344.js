import React, { useState } from "react";
import PropTypes from "prop-types";
import "./InforCard.css";
import { Route, Link } from "react-router-dom";
import Profile from "../../Profile/Profile";
import { history } from "../../../helpers/history";
import { Router, useLocation } from "react-router-dom";

const InforCard = (props) => {
  const { item } = props;
  const [employee, setemployee] = useState(item);
  let location = useLocation();

  return (
    <div className="col-3">
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={employee.avatar} alt="Image" width="100%" height="120" />
          </div>
          <div className="col-md-8">
            <div
              className=""
              onClick={() =>
                history.push({
                  pathname: `/employees/profile/${employee.id}`,
                  // state: { employee },
                })
              }
            >
              <h5 className="card-title">{employee.fullName}</h5>
              <ul>
                <li>{employee.phone}</li>
                <li>{employee.address}</li>
                <li>{employee.city}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforCard;
