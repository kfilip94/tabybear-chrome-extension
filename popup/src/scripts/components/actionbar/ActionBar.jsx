import React from "react";
import classNames from "classnames";
import Button from "../Button";
import TabsActions from './TabsActions';
import { faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const actionBarClassNames = isEditModeEnabled => 
classNames("action-bar", { "action-bar--edit": isEditModeEnabled })

const counterClassNames = isEditModeEnabled =>
classNames("action-bar__counter", { "action-bar__counter--edit": isEditModeEnabled})

const selectAllClassNames = isEditModeEnabled =>
classNames()

const ActionBar = props => (
    <div className={actionBarClassNames(props.isEditModeEnabled)}>
      <div className="action-bar-container">
        <Button
          className={props.isEditModeEnabled ? "button--white" : ""}
          title="Select all tabs in window"
          icon={faCheckCircle}
          handleClick={props.handleSelectAll}
        />
        { props.isEditModeEnabled && 
          <TabsActions 
            windowId={props.windowId}
            isEditModeEnabled={props.isEditModeEnabled}
            handleSelectAll={props.handleSelectAll}
            handlePinMultipleTabs={props.handlePinMultipleTabs}
            handleAddMultipleBookmarks={props.handleAddMultipleBookmarks}
            handleRemoveMultipleTabs={props.handleRemoveMultipleTabs}
          />
        }
      </div>
      <div className="action-bar-container">
        <span className={counterClassNames(props.isEditModeEnabled)} >
          { props.isEditModeEnabled ? `${props.checkedTabsInWindow.length}/${props.tabsCount}` : props.tabsCount}
        </span>
        <Button
          className="button--white"
          title="Close window with all tabs"
          icon={faTimes}
          handleClick={() => props.removeWindow(props.windowId)}
        />
      </div>
    </div>
);

export default ActionBar;