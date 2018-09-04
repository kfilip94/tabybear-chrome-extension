import React from "react";
import ActionBar from "./ActionBar";
import { connect } from "react-redux";
import { removeWindowRequest } from "../../actions/windows";
import { checkWindow, uncheckWindow } from '../../../../../event/src/reducers/checkedTabs';
import { pinMultipleTabsRequest, removeTabsRequest } from '../../actions/tabs';
import { createMultipleBookmarksRequest } from '../../actions/bookmarks';

class ActionBarContainer extends React.Component {
  handleSelectAll = () => this.props.checkAllTabsInWindow(this.props.windowId, this.props.allTabsIdsInWindow, !this.props.areAllTabsInWindowChecked);
  handlePinMultipleTabs = () => this.props.pinMultipleTabs(this.props.checkedTabsInWindow, this.props.areAllTabsInWindowPinned);
  handleAddMultipleBookmarks = () => this.props.createBookmarks(this.props.bookmarksDataArr, this.props.windowId);
  handleRemoveMultipleTabs = () => this.props.removeMultipleTabs(this.props.checkedTabsInWindow);

  render() {
    return (
      <ActionBar 
        {...this.props}
        handleSelectAll={this.handleSelectAll}
        handlePinMultipleTabs={this.handlePinMultipleTabs}
        handleAddMultipleBookmarks={this.handleAddMultipleBookmarks}
        handleRemoveMultipleTabs={this.handleRemoveMultipleTabs}
      />
    );
  };
}

const countTabsInWindow = (state, windowId) => {
  try {
    return state.windows.find(({ id }) => id === windowId).tabs.length;
  } catch(error) {
    return 0;
  }
};

const getCheckedTabsInWindow = (checkedTabs, props) => {
  return [...checkedTabs.filter(({ windowId }) => windowId === props.windowId).map(({id}) => id)];
};

const isEditModeEnabled = ({checkedTabs}, props) => {
  return checkedTabs.some(({ windowId }) => windowId === props.windowId);
};

const getAllTabsIdsInWindow = (props) => {
  try {
    return props.windows.find(({ id }) => id === props.windowId).tabs.map(({id}) => (id));
  } catch(error) {
    return [];
  }
};

const areAllTabsInWindowChecked = ({checkedTabs}, props) => {
  try {
    return props.windows.find(({ id }) => id === props.windowId).tabs.length <= getCheckedTabsInWindow(checkedTabs, props).length;
  } catch(error) {
    return false;
  }
};

const getBookmarksDataArr = ({checkedTabs}, props) => {
  try {
    return props.windows.find(({id}) => props.windowId === id)
    .tabs.filter(({id}) => getCheckedTabsInWindow(checkedTabs, props).includes(id))
    .map(({title, url}) => ({ title, url }));
  } catch(error) {
    return [];
  }
}

const areAllTabsInWindowPinned = ({checkedTabs}, props) => {
  try {
    return props.windows.find(({ id }) => id === props.windowId)
    .tabs.filter(({id}) => getCheckedTabsInWindow(checkedTabs, props).includes(id))
    .every(({pinned}) => pinned);
  } catch(error) {
    return false;
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAllTabsInWindow: (windowId, tabIdArr, isChecked) => { dispatch(checkWindow({ windowId, tabIdArr, isChecked })) },
    clearWindowCheck: (windowId) => { dispatch(uncheckWindow({ windowId })) },
    createBookmarks: (bookmarkDataArr, windowId) => { dispatch(createMultipleBookmarksRequest(bookmarkDataArr, windowId)) },
    pinMultipleTabs: (idArr, areChecked) => { dispatch(pinMultipleTabsRequest(idArr,!areChecked)) },
    removeMultipleTabs: (checkedTabsIds) => { dispatch(removeTabsRequest(checkedTabsIds)) },
    removeWindow: (windowId) => { dispatch(removeWindowRequest(windowId)) }
  };
};

const mapStateToProps = (state, props) => {
  return {
    tabsCount: countTabsInWindow(state, props.windowId),
    isEditModeEnabled: isEditModeEnabled(state, props),
    bookmarksDataArr: getBookmarksDataArr(state, props),
    allTabsIdsInWindow: getAllTabsIdsInWindow(props),
    areAllTabsInWindowChecked: areAllTabsInWindowChecked(state, props),
    checkedTabsInWindow: getCheckedTabsInWindow(state.checkedTabs, props),
    areAllTabsInWindowPinned: areAllTabsInWindowPinned(state, props),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionBarContainer);
