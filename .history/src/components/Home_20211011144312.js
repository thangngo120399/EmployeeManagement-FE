import React, { useState, useEffect, useSelector } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    UserService.getPublicContent().then(
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
      <header className="jumbotron">
        <h3>{content}</h3>
        {isLoggedIn && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
             xxxxxxxxxxxx
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;
