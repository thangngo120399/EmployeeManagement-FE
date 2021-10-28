import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import ScriptTag from "react-script-tag";

Sidebar2.propTypes = {};

function Sidebar2(props) {
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
          <ul class="collapse list-unstyled" id="homeSubmenu">
            <li>
              <a href="#">Developer</a>
            </li>
            <li>
              <a href="#">Accounting</a>
            </li>
            <li>
              <a href="#">Sale</a>
            </li>
            <li>
              <a href="#">Design</a>
            </li>
            <li>
              <a href="#">Human Resources</a>
            </li>
          </ul>
        </li>

        <li>
          <a href="#">Position</a>
        </li>
        <li>
          <a href="#">Academic Level</a>
        </li>
        <li>
          <a href="#">Insurance</a>
        </li>
        <li>
          <a href="#">Labor contract</a>
        </li>
        <li>
          <a href="#">Role</a>
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
