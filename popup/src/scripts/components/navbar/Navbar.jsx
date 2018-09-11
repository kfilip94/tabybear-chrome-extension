import React from "react";
import PropTypes from 'prop-types';
import { faCog, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import FontAwesomeButton from "button/FontAwesomeButton";

const Navbar = ({ handleCreateWindow, handleOpenSettingsPage }) => (
  <div className="navbar">
    <FontAwesomeButton
      className="button--navbar"
      handleClick={handleCreateWindow}
      title="Open new browser window"
      icon={faPlusSquare}
    />
    <span className="navbar__logo" />
    <FontAwesomeButton
      className="button--navbar"
      handleClick={handleOpenSettingsPage}
      title="Open settings page"
      icon={faCog}
    />
  </div>
);

Navbar.propTypes = {
  handleCreateWindow: PropTypes.func.isRequired,
  handleOpenSettingsPage: PropTypes.func.isRequired,
};

export default Navbar;
