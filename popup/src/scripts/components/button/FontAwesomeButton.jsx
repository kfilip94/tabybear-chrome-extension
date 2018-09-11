import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FontawesomeButton = ({ className, handleClick, icon, title }) => (
  <button
    className={`button ${className}`}
    onClick={handleClick}
    title={title}
    type="button"
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

FontawesomeButton.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  icon: PropTypes.object.isRequired,
  title: PropTypes.string,
};

FontawesomeButton.defaultProps = {
  className: '',
  handleClick: () => {},
  title: ''
};

export default FontawesomeButton;