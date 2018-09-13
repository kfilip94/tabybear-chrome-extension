import React from 'react';
import PropTypes from 'prop-types';
import { faTimes, faThumbtack, faStar } from '@fortawesome/free-solid-svg-icons';
import FontAwesomeButton from 'button/FontAwesomeButton';

const TabsActions = ({ handlePinMultipleTabs, handleAddMultipleBookmarks, handleRemoveMultipleTabs }) => (
  <div className="action-bar__tabs-actions">
    <FontAwesomeButton
      className="button--white"
      title="Pin selected tabs"
      icon={faThumbtack}
      handleClick={handlePinMultipleTabs}
    />
    <FontAwesomeButton
      className="button--white"
      title="Add bookmark"
      icon={faStar}
      handleClick={handleAddMultipleBookmarks}
    />
    <FontAwesomeButton
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
