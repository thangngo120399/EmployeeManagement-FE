import React, { useState, useEffect, useSelector } from "react";
import { Redirect } from "react-router-dom";
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
  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
