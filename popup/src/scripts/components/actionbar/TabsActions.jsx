import React from 'react';
import { faTimes, faThumbtack, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button';

const TabsActions = props => (
  <div className="action-bar__tabs-actions">
    <Button
      className="button--white"
      title="Pin selected tabs"
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

export default TabsActions;
