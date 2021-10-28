import React from "react";
import PropTypes from "prop-types";

ScrollToTop.propTypes = {};

function ScrollToTop(props) {
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
