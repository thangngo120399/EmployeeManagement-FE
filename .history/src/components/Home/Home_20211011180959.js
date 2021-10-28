import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UserService from "../../services/user.service";

const Home = (props) => {
  const [content, setContent] = useState([null]);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent([...content, response.data]);
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
        {isLoggedIn ? <div>{content.length}</div> : <h2>Xin moi dang nhap</h2>}
      </header>
    </div>
  );
};

export default Home;
