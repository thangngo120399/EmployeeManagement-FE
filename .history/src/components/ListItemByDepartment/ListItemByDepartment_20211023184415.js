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

        setContent(_content);
      }
    );
  }, []);

  let { id } = useParams();
  let { nameDepartment } = useParams();
  console.log(id);

  return (
    <div className="container">
      <div>
        <h3>{nameDepartment}</h3>
      </div>
      <div>
        <ListItem items={content} />
      </div>
    </div>
  );
};

export default ListItemByDepartment;
