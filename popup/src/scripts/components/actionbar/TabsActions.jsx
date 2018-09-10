import React from 'react';
import PropTypes from 'prop-types';
import { faTimes, faThumbtack, faStar } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../iconButton/IconButton';

const TabsActions = ({ handlePinMultipleTabs, handleAddMultipleBookmarks, handleRemoveMultipleTabs }) => (
  <div className="action-bar__tabs-actions">
    <IconButton
      className="button--white"
      title="Pin selected tabs"
      icon={faThumbtack}
      handleClick={handlePinMultipleTabs}
    />
    <IconButton
      className="button--white"
      title="Add bookmark"
      icon={faStar}
      handleClick={handleAddMultipleBookmarks}
    />
    <IconButton
      className="button--white"
      title="Close selected tabs"
      icon={faTimes}
      handleClick={handleRemoveMultipleTabs}
    />
  </div>
);

TabsActions.propTypes = {
  handlePinMultipleTabs: PropTypes.func.isRequired,
  handleAddMultipleBookmarks: PropTypes.func.isRequired,
  handleRemoveMultipleTabs: PropTypes.func.isRequired,
};

export default TabsActions;
