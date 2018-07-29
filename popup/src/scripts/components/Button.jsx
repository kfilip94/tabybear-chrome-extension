import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => (
  <div>
    <button
      className={props.className}
      onClick={props.handleClick}
      title={props.title}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  </div>
);

export default Button;