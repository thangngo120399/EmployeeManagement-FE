import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UserService from "../../services/user.service";

const Home = (props) => {
  const [content, setContent] = useState([]);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent([...content, response.data]);
        console.log(content.length);
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

  const ListItem = ({ username, age }) => (
    <li>
      xxxxxxxx
      {username} &mdash; {age}
    </li>
  );

  const ListItems = ({ items }) => (
    <ul>
      {items.map((props) => (
        <ListItem key={props.username} {...props} />
      ))}
    </ul>
  );
  return (
    <div className="container">
      <header className="jumbotron">
        {isLoggedIn ? (
          <ListItems items={content} />
        ) : (
          <h2>Xin moi dang nhap</h2>
        )}
      </header>
    </div>
  );
};

export default Home;
