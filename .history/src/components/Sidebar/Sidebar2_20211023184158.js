import React, { userState, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import ScriptTag from "react-script-tag";
import { Router, Switch, Route, Link } from "react-router-dom";
import Table from "../Position/Position";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import DepartmentService from "../../services/department.service";
import { history } from "../../helpers/history";

toast.configure();

Sidebar2.propTypes = {};

function Sidebar2(props) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    DepartmentService.getAll().then(
      (response) => {
        setDepartments(response.data);
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

  // const callAPI = () => {
  //     DepartmentService.getAll().then(
  //         (response) => {
  //             setDepartments(response.data);
  //         },

  //         (error) => {
  //             const _content =
  //                 (error.response && error.response.data) ||
  //                 error.message ||
  //                 error.toString();
  //             toast.error(_content);
  //         }
  //     );
  // }
  // callAPI();

  return (
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3>Manage</h3>
      </div>

      <ul class="list-unstyled components">
        <li class="">
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="true"
            class="dropdown-toggle"
          >
            Department
          </a>
          <ul class=" list-unstyled collapse show" id="homeSubmenu">
            {departments.map((item) => (
              <li>
                <a
                  href={`/employees/department/${item.id}`}
                  className="nav-link"
                >
                  {item.nameDepartment}
                </a>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <Link to={"/position"} className="nav-link">
            Position
          </Link>
        </li>
        <li>
          <Link to={"/academic"} className="nav-link">
            Academic Level
          </Link>
        </li>
        <li>
          <Link to={"/insurance"} className="nav-link">
            Insurance
          </Link>
        </li>
        <li>
          <a href="#">Labor contract</a>
        </li>
        <li>
          <Link to={"/role"} className="nav-link">
            Role
          </Link>
        </li>
      </ul>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      />
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
      />
    </nav>
  );
}

export default Sidebar2;
