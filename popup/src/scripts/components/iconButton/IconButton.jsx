import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({ className, handleClick, icon, title }) => (
  <button
    className={`button ${className}`}
    onClick={handleClick}
    title={title}
    type="button"
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

IconButton.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  icon: PropTypes.instanceOf().isRequired,
  title: PropTypes.string,
};

IconButton.defaultProps = {
  className: '',
  handleClick: () => {},
  title: ''
};

export default IconButton;