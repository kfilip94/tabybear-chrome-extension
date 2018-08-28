import React from 'react';
import Button from './Button';
import classNames from "classnames";
import { faTimes, faThumbtack, faStar } from '@fortawesome/free-solid-svg-icons';

const editActionsClassNames = isEditModeEnabled => 
  classNames("actions", { "actions--edit": isEditModeEnabled })


const EditActionBar = props => (
  <div className={editActionsClassNames(props.isEditModeEnabled)}>
    <span className="split"></span>

    <Button
      className="button--white"
      title="Pin seleceted tabs"
      icon={faThumbtack}
      handleClick={props.handlePinMultipleTabs}
    />
     <Button
      className="button--white"
      title="Add bookmark"
      icon={faStar}
      handleClick={props.handleAddMultipleBookmarks}
    />
    <Button
      className="button--white"
      title="Close selected tabs"
      icon={faTimes}
      handleClick={props.handleRemoveMultipleTabs}
     />
  </div>
);

export default EditActionBar;
