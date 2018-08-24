import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Button from "./Button";
import EditActionBar from './EditActionBar';
import { faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { removeWindowRequest } from "../actions/windows";
import { selectWindow } from '../actions/checkedTabs';
import { pinMultipleTabsRequest, removeTabsRequest } from '../actions/tabs';
import { createMultipleBookmarksRequest } from '../actions/bookmarks';
import { clearWindowSelection } from '../actions/checkedTabs';

const actionBarClassNames = (isEditModeEnabled) => 
  classNames("action-bar", { "action-bar--green": isEditModeEnabled })


  
class ActionBar extends React.Component {
  
  handleSelectAll = () => this.props.checkAllTabsInWindow(this.props.windowId, this.props.allTabsIdsInWindows, !this.props.areAllTabsInWindowChecked);

  handlePinMultipleTabs = () => this.props.pinMultipleTabs(this.props.checkedTabsInWindow, this.props.areAllTabsInWindowPinned);

  handleAddMultipleBookmarks = () => this.props.createBookmarks(this.props.bookmarksDataArr, this.props.windowId);

  handleRemoveMultipleTabs = () => this.props.removeMultipleTabs(this.props.checkedTabsInWindow);

  render() {
    return (
      <div className={actionBarClassNames(this.props.isEditModeEnabled)}>
        <div className="action-bar-container">
          <Button
            title="Select all tabs in window"
            icon={faCheckCircle}
            handleClick={this.handleSelectAll}
          />
          { this.props.isEditModeEnabled && 
            <EditActionBar 
              windowId={this.props.windowId}
              handleSelectAll={this.handleSelectAll}
              handlePinMultipleTabs={this.handlePinMultipleTabs}
              handleAddMultipleBookmarks={this.handleAddMultipleBookmarks}
              handleRemoveMultipleTabs={this.handleRemoveMultipleTabs}
            />
          }
        </div>
        <div className="action-bar-container">
          <span className="action-bar__counter">
            { this.props.isEditModeEnabled ? `${this.props.checkedTabsInWindow.length}/${this.props.tabsCount}` : this.props.tabsCount}
          </span>
          <Button
            title="Close window with all tabs"
            icon={faTimes}
            handleClick={() => this.props.removeWindow(this.props.windowId)}
          />
        </div>
      </div>
    );
  }
}

const countTabsInWindow = (state, windowId) => {
  try {
    return state.windows.find(({ id }) => id === windowId).tabs.length;
  } catch(error) {
    return 0;
  }
}

const getCheckedTabsInWindow = (checkedTabs, props) => {
  return [...checkedTabs.filter(({ windowId }) => windowId === props.windowId).map(({id}) => id)];
};

const isEditModeEnabled = ({checkedTabs}, props) => {
  return checkedTabs.some(({ windowId }) => windowId === props.windowId);
};

const getAllTabsIdsInWindow = ({windows}, props) => {
  return windows.find(({ id }) => id === props.windowId).tabs.map(({id}) => (id));
};

const areAllTabsInWindowChecked = ({windows, checkedTabs}, props) => {
  return windows.find(({ id }) => id === props.windowId).tabs.length === getCheckedTabsInWindow(checkedTabs, props).length;
};

const getBookmarksDataArr = ({windows, checkedTabs}, props) => {
  return windows.find(({id}) => props.windowId === id)
    .tabs.filter(({id}) => getCheckedTabsInWindow(checkedTabs, props).includes(id))
    .map(({title, url}) => ({ title, url }));
}; 

const areAllTabsInWindowPinned = ({windows, checkedTabs}, props) => {
  return windows.find(({ id }) => id === props.windowId)
    .tabs.filter(({id}) => getCheckedTabsInWindow(checkedTabs, props).includes(id))
    .every(({pinned}) => pinned);
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAllTabsInWindow: (windowId, allTabsIdsInWindows, areallTabsIdsInWindowsChecked) => { dispatch(selectWindow(windowId, allTabsIdsInWindows, areallTabsIdsInWindowsChecked)) },
    clearWindowCheck: (windowId) => { dispatch(clearWindowSelection(windowId)) },
    createBookmarks: (bookmarkDataArr, windowId) => { dispatch(createMultipleBookmarksRequest(bookmarkDataArr, windowId)) },
    pinMultipleTabs: (idArr, areChecked) => { dispatch(pinMultipleTabsRequest(idArr,!areChecked)) },
    removeMultipleTabs: (checkedTabsIds) => { dispatch(removeTabsRequest(checkedTabsIds)) },
    removeWindow: (windowId) => { dispatch(removeWindowRequest(windowId)) }
  };
};

const mapStateToProps = (state, props) => {
  return {
    windows: state.windows,
    tabsCount: countTabsInWindow(state, props.windowId),
    isEditModeEnabled: isEditModeEnabled(state, props),
    bookmarksDataArr: getBookmarksDataArr(state, props),
    allTabsIdsInWindows: getAllTabsIdsInWindow(state, props),
    areAllTabsInWindowChecked: areAllTabsInWindowChecked(state, props),
    checkedTabsInWindow: getCheckedTabsInWindow(state.checkedTabs, props),
    areAllTabsInWindowPinned: areAllTabsInWindowPinned(state, props),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
