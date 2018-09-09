import React from "react";
import ActionBar from "./ActionBar";
import * as selectors from "./ActiobBarSelectors";
import { connect } from "react-redux";
import { removeWindowRequest } from "../../actions/windows";
import { checkWindow, uncheckWindow } from '../../../../../event/src/reducers/checkedTabs';
import { pinMultipleTabsRequest, removeTabsRequest } from '../../actions/tabs';
import { createMultipleBookmarksRequest } from '../../actions/bookmarks';

class ActionBarContainer extends React.Component {
  handleSelectAll = () => {
    if(!this.props.isWindowChecked)
      this.props.checkWindow(this.props.windowId, this.props.tabIds);
    else
      this.props.uncheckWindow(this.props.windowId);
  }
  handlePinMultipleTabs = () => this.props.pinMultipleTabs(this.props.checkedTabsInWindow, this.props.isWindowPinned, this.props.windowId);
  handleAddMultipleBookmarks = () => this.props.createBookmarks(this.props.bookmarksData, this.props.windowId);
  handleRemoveMultipleTabs = () => this.props.removeMultipleTabs(this.props.checkedTabsInWindow);

  render() {
    return (
      <ActionBar 
        { ...this.props }
        handleSelectAll={this.handleSelectAll}
        handlePinMultipleTabs={this.handlePinMultipleTabs}
        handleAddMultipleBookmarks={this.handleAddMultipleBookmarks}
        handleRemoveMultipleTabs={this.handleRemoveMultipleTabs}
      />
    );
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkWindow: (windowId, tabIds) => { dispatch(checkWindow({ windowId, tabIds })) },
    uncheckWindow: (windowId) => { dispatch(uncheckWindow({ windowId })) },
    clearWindowCheck: (windowId) => { dispatch(uncheckWindow({ windowId })) },
    createBookmarks: (bookmarkDataArr, windowId) => { dispatch(createMultipleBookmarksRequest(bookmarkDataArr, windowId)) },
    pinMultipleTabs: (idArr, areChecked, windowId) => { dispatch(pinMultipleTabsRequest(idArr, !areChecked, windowId)) },
    removeMultipleTabs: (checkedTabsIds) => { dispatch(removeTabsRequest(checkedTabsIds)) },
    removeWindow: (windowId) => { dispatch(removeWindowRequest(windowId)) }
  };
};

const mapStateToProps = (state, props) => {
  return {
    tabsCount: selectors.getTabCounter(state, props.windowId),
    isEditModeEnabled: selectors.isEditModeEnabled(state, props),
    bookmarksData: selectors.getBookmarksData(state, props),
    tabIds: selectors.getTabIdsInWindow(props),
    isWindowChecked: selectors.isWindowChecked(state, props),
    checkedTabsInWindow: selectors.getCheckedTabsInWindow(state.checkedTabs, props),
    isWindowPinned: selectors.isWindowPinned(state, props),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionBarContainer);
