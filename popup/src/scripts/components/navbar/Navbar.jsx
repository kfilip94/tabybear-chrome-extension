import React from "react";
import PropTypes from 'prop-types';
import { faCog, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import IconButton from "../iconButton/IconButton";

const Navbar = ({ handleCreateWindow, handleOpenSettingsPage }) => (
  <div className="navbar">
    <IconButton
      className="button--navbar"
      handleClick={handleCreateWindow}
      title="Open new browser window"
      icon={faPlusSquare}
    />
    <span className="navbar__logo" />
    <IconButton
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
