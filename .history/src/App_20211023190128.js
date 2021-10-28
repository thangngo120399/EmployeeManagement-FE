import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";
// import Profile from "./components/AccountProfile/Profile";
import Profile from "./components/Profile/Profile";
import BoardUser from "./components/Board/BoardUser";
import BoardModerator from "./components/Board/BoardModerator";
import BoardAdmin from "./components/Board/BoardAdmin";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import Academic from "./components/AcademicLevel/Academic";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Sidebar from "./components/Sidebar/Sidebar2";
import Position from "./components/Position/Position";
import Role from "./components/Role/Role";
import Insurance from "./components/Insurance/Insurance";
import InsuranceType from "./components/Insurance/InsuranceType/InsuranceType";
import ListItemByDepartment from "./components/ListItemByDepartment/ListItemByDepartment";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      // setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowModeratorBoard(true);
      setShowAdminBoard(true);
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  var styles = {
    btnCreate: {
      color: "white",
    },
  };
  return (
    <Router history={history}>
      <div className="wrapper">
        {currentUser && <Sidebar></Sidebar>}
        <div id="content">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            {!currentUser && (
              <Link to={"/"} className="navbar-brand">
                HRM App
              </Link>
            )}
            {currentUser && (
              <div>
                <button className="btn btn-primary" title="Add new employee ">
                  <Link to={"/employees/add"} style={styles.btnCreate}>
                    Create
                  </Link>
                </button>
              </div>
            )}
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/recruitment"} className="nav-link">
                    Recruitment
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/employees/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/employees/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/employees/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Register
                  </Link>
                </li>
              </div>
            )}
            <br />
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/employees/profile/:id" component={Profile} />
              <Route
                exact
                path="/employees/:nameDepartment/:id"
                component={ListItemByDepartment}
              />
              <Route path="/employees/user" component={BoardUser} />
              <Route path="/employees/mod" component={BoardModerator} />
              <Route path="/employees/admin" component={BoardAdmin} />
              <Route path="/employees/add" component={Create} />
              <Route path="/position" component={Position} />
              <Route path="/academic" component={Academic} />
              <Route path="/role" component={Role} />
              <Route path="/insurance" component={Insurance} />
              <Route path="/insuranceType" component={InsuranceType} />
            </Switch>
          </div>
        </div>
        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    </Router>
  );
};

export default App;
