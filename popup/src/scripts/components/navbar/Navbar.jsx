import React from "react";
import { faCog, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Button from "../button/Button";

const Navbar = ({ handleCreateWindow, handleOpenSettingsPage }) => (
  <div className="navbar">
    <Button
      className="button--navbar"
      handleClick={handleCreateWindow}
      title="Open new browser window"
      icon={faPlusSquare}
    />
    <span className="navbar__logo" />
    <Button
      className="button--navbar"
      handleClick={handleOpenSettingsPage}
      title="Open settings page"
      icon={faCog}
    />
  </div>
);

export default Navbar;
