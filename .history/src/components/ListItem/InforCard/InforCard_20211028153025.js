import React, { useState } from "react";
import PropTypes from "prop-types";
import "./InforCard.css";
import { Route, Link } from "react-router-dom";

import { history } from "../../../helpers/history";
import { Router, useLocation } from "react-router-dom";
import Switch from "react-switch";
const InforCard = (props) => {
  const { item } = props;
  const [employee, setemployee] = useState(item);
  let location = useLocation();
  const arrAvatar = [
    "https://giovannicosmetics.com/wp-content/uploads/2020/04/For-Men.jpg",
    "https://5outof4.com/wp-content/uploads/2019/11/rocky4-scaled.jpg",
    "https://martinvalen.com/9646-large_default/men-s-retro-aviator-sunglasses-brown.jpg",
    "https://s7g3.scene7.com/is/image/soloinvest/n01195A?$big_image_web$",
    "https://english.cdn.zeenews.com/sites/default/files/2017/11/17/639329-indian-men.jpg",
    "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
  ];

  for (let i = 4; i < 75; i++) {
    arrAvatar.push("https://i.pravatar.cc/300?img=" + i);
  }
  for (let i = 4; i < 75; i++) {
    arrAvatar.push("https://i.pravatar.cc/300?img=" + i);
  }
  return (
    <div className={"col-3 " + (employee.status ? "" : "block")}>
      <div
        className="card mb-3"
        style={{ boxSizing: "border-box", overflow: "hidden" }}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={arrAvatar[employee.id]}
              alt="Image"
              width="100%"
              height="120px"
            />
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
              <div className={employee.status ? "green" : "red"}></div>

              <h5 className="card-title one-line">
                <b>{employee.fullName}</b>
              </h5>
              <ul>
                <li>{employee.age} ages</li>
                <li>
                  <i>{employee.positionName}</i>
                </li>
              </ul>
              <div>
                <Switch
                  // onChange={onChangeStatus}
                  checked={true}
                  style={{ width: "20px", height: "20px" }}
                  // disabled={!isEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforCard;
