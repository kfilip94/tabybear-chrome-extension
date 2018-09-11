import React from "react";
import ActionBar from "./ActionBar";
import * as selectors from "./ActiobBarSelectors";
import { connect } from "react-redux";
import { removeWindowRequest } from "../../actions/windows";
import { checkWindow, uncheckWindow } from '../../../../../event/src/reducers/checkedTabs';
import { pinMultipleTabsRequest, removeTabsRequest } from '../../actions/tabs';
import createMultipleBookmarksRequest from '../../actions/bookmarks';

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
  checkWindow: (windowId, ids) => { dispatch(checkWindow({ windowId, ids })) },
  uncheckWindow: (windowId) => { dispatch(uncheckWindow({ windowId })) },
  createBookmarks: (bookmarksData, windowId) => { dispatch(createMultipleBookmarksRequest(bookmarksData, windowId)) },
  pinMultipleTabs: (ids, isChecked) => { dispatch(pinMultipleTabsRequest(ids, !isChecked)) },
  removeMultipleTabs: (checkedTabIds) => { dispatch(removeTabsRequest(checkedTabIds)) },
  removeWindow: (windowId) => { dispatch(removeWindowRequest(windowId)) }
});

const mapStateToProps = (state, props) => ({
  tabsCount: selectors.getTabCounter(state, props.windowId),
  isEditModeEnabled: selectors.isEditModeEnabled(state, props),
  bookmarksData: selectors.getBookmarksData(state, props),
  tabIds: selectors.getTabIdsInWindow(props),
  isWindowChecked: selectors.isWindowChecked(state, props),
  checkedTabsInWindow: selectors.getCheckedTabsInWindow(state.checkedTabs, props),
  checkedTabsInWindowLength: selectors.getCheckedTabsInWindow(state.checkedTabs, props).length,
  isWindowPinned: selectors.isWindowPinned(state, props),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionBarContainer);
