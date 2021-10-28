import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import EmployeeService from "../../services/employee.service";
import ListItem from "../ListItem/ListItem";
// import "./HomeCss.css"
const Home = (props) => {
  const [content, setContent] = useState([]);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showGoToTop, setShowGoToTop] = useState(false);

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
  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="container">
      {isLoggedIn ? (
        <div>
          <ListItem items={content} />
        </div>
      ) : (
        <h2>Xin moi dang nhap</h2>
      )}
      {showGoToTop && (
        <button
          style={{ position: "fixed", right: 20, bottom: 20 }}
          onClick={() => {
            window.scrollY = 0;
          }}
        >
          Go to top
        </button>
      )}
    </div>
  );
};

export default Home;
