import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UserService from "../../services/user.service";

const Home = (props) => {
  const [content, setContent] = useState([
    {
      username: "",
      email: "",
      dateOfBirth: "",
      age: "",
      knownAs: "",
      gender: "",
      introduction: "",
      avatar: "",
      city: "",
    },
  ]);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        ...content;
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
        {isLoggedIn ? <h3>{content}</h3> : <h2>Xin moi dang nhap</h2>}
      </header>
    </div>
  );
};

export default Home;
