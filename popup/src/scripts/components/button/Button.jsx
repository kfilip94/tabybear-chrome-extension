import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ className, handleClick, icon, title }) => (
  <button
    className={`button ${className}`}
    onClick={handleClick}
    title={title}
    type="button"
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

export default Button;