import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import EmployeeService from "../../services/employee.service";
import ListItem from "../ListItem/ListItem";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

toast.configure();

const ListItemByDepartment = (props) => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    EmployeeService.getEmployeeByDepartment(id).then(
      (response) => {
        setContent(response.data);
        console.log(response.data);
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

  let { id } = useParams();
  let { nameDepartment } = useParams();
  console.log(id);

  return (
    <div className="container">
      <div className="title-department">
        <h3>{nameDepartment}</h3>
      </div>
      <div>
        <ListItem items={content} />
      </div>
      {content.length > 0 && (
        <div style={{ color: "Red" }}>
          <h3>No One In here</h3>
        </div>
      )}
    </div>
  );
};

export default ListItemByDepartment;
