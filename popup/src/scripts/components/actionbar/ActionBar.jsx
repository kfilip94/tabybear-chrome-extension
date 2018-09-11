import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { faCheckCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeButton from "button/FontAwesomeButton";
import TabsActions from './TabsActions';

const actionBarClassNames = isEditModeEnabled => 
  classNames("action-bar", { "action-bar--edit": isEditModeEnabled });

const counterClassNames = isEditModeEnabled =>
  classNames("action-bar__counter", { "action-bar__counter--edit": isEditModeEnabled});

const buttonClassNames = isEditModeEnabled => isEditModeEnabled ? "button--white" : "";

const ActionBar = props => {
  const { 
    checkedTabsInWindowLength, 
    isEditModeEnabled, 
    handleAddMultipleBookmarks, 
    handlePinMultipleTabs, 
    handleRemoveMultipleTabs, 
    handleSelectAll, 
    removeWindow, 
    tabsCount, 
    windowId } = props;

  return (
    <div className={actionBarClassNames(isEditModeEnabled)}>
      <div className="action-bar-container">
        <FontAwesomeButton
          className={`${buttonClassNames(isEditModeEnabled)} button--big`}
          title="Select all tabs in window"
          icon={faCheckCircle}
          handleClick={handleSelectAll}
        />
        { isEditModeEnabled && 
          (
            <TabsActions 
              windowId={windowId}
              isEditModeEnabled={isEditModeEnabled}
              handleSelectAll={handleSelectAll}
              handlePinMultipleTabs={handlePinMultipleTabs}
              handleAddMultipleBookmarks={handleAddMultipleBookmarks}
              handleRemoveMultipleTabs={handleRemoveMultipleTabs}
            />
          )
        }
      </div>
      <div className="action-bar-container">
        <span className={counterClassNames(isEditModeEnabled)}>
          { isEditModeEnabled ? `${checkedTabsInWindowLength}/${tabsCount}` : tabsCount}
        </span>
        <FontAwesomeButton
          className={buttonClassNames(isEditModeEnabled)}
          title="Close window with all tabs"
          icon={faTrashAlt}
          handleClick={() => removeWindow(windowId)}
        />
      </div>
    </div>
  );
};

ActionBar.propTypes = {
  checkedTabsInWindowLength: PropTypes.number.isRequired,
  isEditModeEnabled: PropTypes.bool.isRequired, 
  handleAddMultipleBookmarks: PropTypes.func.isRequired, 
  handlePinMultipleTabs: PropTypes.func.isRequired, 
  handleRemoveMultipleTabs: PropTypes.func.isRequired, 
  handleSelectAll: PropTypes.func.isRequired, 
  removeWindow: PropTypes.func.isRequired,  
  tabsCount: PropTypes.number.isRequired, 
  windowId: PropTypes.number.isRequired,
};

export default ActionBar;