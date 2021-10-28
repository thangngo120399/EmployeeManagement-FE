import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InforCard.css'
import { Route, Link } from "react-router-dom";
import Profile from '../../Profile/Profile'
import { history } from "../../../helpers/history";
import { Router, useLocation} from 'react-router-dom';

const InforCard = (props) => {
    const { item } = props;
    const [user, setUser] = useState(item);
    let location = useLocation();

    return (
        <div className="col-3">
            <div className="card mb-3" >
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={user.avatar}  alt="Image" width="100%" height="120"/>
                    </div>
                    <div className="col-md-8">
                        <div className="" onClick={() => history.push({
                            pathname: `/profile/${user.id}`,
                            // state: { user },
                        })}>
                            <h5 className="card-title">{user.username}</h5>
                            <ul>
                                <li>{user.age}</li>
                                <li>{user.knowAs}</li>
                                <li>{user.city}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InforCard;