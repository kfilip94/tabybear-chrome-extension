import React from 'react';
import Button from './Button';
import { faTimes, faThumbtack, faStar } from '@fortawesome/free-solid-svg-icons';

const EditActionBar = props => (
  <div className="actions">
    <Button
      className="button button--small"
      title="Pin seleceted tabs"
      icon={faThumbtack}
      handleClick={props.handlePinMultipleTabs}
    />
     <Button
      title="Add bookmark"
      icon={faStar}
      handleClick={props.handleAddMultipleBookmarks}
    />
    <Button
      className="button button--small"
      title="Close selected tabs"
      icon={faTimes}
      handleClick={props.handleRemoveMultipleTabs}
     />
  </div>
);

export default EditActionBar;
