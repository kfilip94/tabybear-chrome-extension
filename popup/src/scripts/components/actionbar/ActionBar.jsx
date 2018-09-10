import React from "react";
import classNames from "classnames";
import { faCheckCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/Button";
import TabsActions from './TabsActions';

const actionBarClassNames = isEditModeEnabled => 
  classNames("action-bar", { "action-bar--edit": isEditModeEnabled });

const counterClassNames = isEditModeEnabled =>
  classNames("action-bar__counter", { "action-bar__counter--edit": isEditModeEnabled});

const buttonClassNames = isEditModeEnabled => isEditModeEnabled ? "button--white" : "";

const ActionBar = props => {
  const { 
    checkedTabsInWindow, 
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
        <Button
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
        <span className={counterClassNames(isEditModeEnabled)} >
          { isEditModeEnabled ? `${checkedTabsInWindow.length}/${tabsCount}` : tabsCount}
        </span>
        <Button
          className={buttonClassNames(isEditModeEnabled)}
          title="Close window with all tabs"
          icon={faTrashAlt}
          handleClick={() => removeWindow(windowId)}
        />
      </div>
    </div>
  );
};

export default ActionBar;