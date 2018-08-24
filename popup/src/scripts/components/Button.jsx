import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => (
  <button
    className="button"
    onClick={ props.handleClick }
    title={ props.title }
  >
    <FontAwesomeIcon icon={ props.icon } />
  </button>
);

export default Button;