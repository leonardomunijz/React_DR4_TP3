// src/components/Button.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Button = ({ icon, text, onClick, className, ...props }) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} className="button-icon" />}
      {text}
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
