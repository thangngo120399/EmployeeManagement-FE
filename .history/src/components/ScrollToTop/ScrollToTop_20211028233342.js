import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

ScrollToTop.propTypes = {};

function ScrollToTop(props) {
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 200);
    };

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
