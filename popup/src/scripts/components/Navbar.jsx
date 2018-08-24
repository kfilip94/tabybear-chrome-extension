import React from "react";
import { faCog, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Button from "./Button";

const Navbar = props => (
  <div className="navbar">
    <Button
      className="button button--plus-square"
      handleClick={props.handleCreateWindow}
      title="Open new browser window"
      icon={faPlusSquare}
    />
    <span className="navbar__title">Tabs Manager</span>
    <Button
      className="button button--cog"
      handleClick={props.handleOpenSettingsPage}
      title="Open settings page"
      icon={faCog}
    />
  </div>
);

export default Navbar;
