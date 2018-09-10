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
    const { checkWindow, isWindowChecked, tabIds, uncheckWindow, windowId } = this.props;
    !isWindowChecked ? checkWindow(windowId, tabIds) : uncheckWindow(windowId);
  };

  handlePinMultipleTabs = () => {
    const { checkedTabsInWindow, isWindowPinned, pinMultipleTabs } = this.props;
    pinMultipleTabs(checkedTabsInWindow, isWindowPinned);
  };

  handleAddMultipleBookmarks = () => {
    const { bookmarksData, createBookmarks, windowId } = this.props;
    createBookmarks(bookmarksData, windowId);
  };

  handleRemoveMultipleTabs = () => {
    const { checkedTabsInWindow, removeMultipleTabs } = this.props;
    removeMultipleTabs(checkedTabsInWindow);
  };

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

const mapDispatchToProps = (dispatch) => ({
  checkWindow: (windowId, tabIds) => { dispatch(checkWindow({ windowId, tabIds })) },
  uncheckWindow: (windowId) => { dispatch(uncheckWindow({ windowId })) },
  clearWindowCheck: (windowId) => { dispatch(uncheckWindow({ windowId })) },
  createBookmarks: (bookmarkDataArr, windowId) => { dispatch(createMultipleBookmarksRequest(bookmarkDataArr, windowId)) },
  pinMultipleTabs: (idArr, areChecked) => { dispatch(pinMultipleTabsRequest(idArr, !areChecked)) },
  removeMultipleTabs: (checkedTabsIds) => { dispatch(removeTabsRequest(checkedTabsIds)) },
  removeWindow: (windowId) => { dispatch(removeWindowRequest(windowId)) }
});

const mapStateToProps = (state, props) => ({
  tabsCount: selectors.getTabCounter(state, props.windowId),
  isEditModeEnabled: selectors.isEditModeEnabled(state, props),
  bookmarksData: selectors.getBookmarksData(state, props),
  tabIds: selectors.getTabIdsInWindow(props),
  isWindowChecked: selectors.isWindowChecked(state, props),
  checkedTabsInWindow: selectors.getCheckedTabsInWindow(state.checkedTabs, props),
  checkedTabsInWindowCounter: selectors.getCheckedTabsInWindow(state.checkedTabs, props).length,
  isWindowPinned: selectors.isWindowPinned(state, props),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionBarContainer);
