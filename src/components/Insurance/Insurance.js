import React, { useState, useEffect } from "react";
import EmployeeService from '../../services/employee.service'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import ListItemInsurance from '../ListItemInsurance/ListItemInsurance'
import { Router, Switch, Route, Link } from "react-router-dom";

Insurance.propTypes = {

};

function Insurance(props) {
    const [content, setContent] = useState([]);
    useEffect(() => {
        EmployeeService.getAll().then(
            (response) => {
                setContent(response.data);
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
    return (
        <div className="container">
            <div>
            <button className="btn btn-primary" title="Add new employee" style={{marginBottom: "15px"}}>
                <Link to={"/insuranceType"} >
                  Manage Insurance
                </Link>
              </button>
                <ListItemInsurance items={content} />
            </div>
        </div>
    );
}

export default Insurance;