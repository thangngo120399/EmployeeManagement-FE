import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

ScrollToTop.propTypes = {};

function ScrollToTop(props) {
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {showGoToTop && (
        <button
          style={{ position: "fixed", right: 20, bottom: 20 }}
          className="btn btn-secondary"
          onClick={scrollToTop}
        >
          <i class="fa fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;
