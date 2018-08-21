import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import { faTimes, faThumbtack, faStar } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { pinTabRequest, removeTabsRequest } from '../actions/tabs';
import { createBookmarkRequest } from '../actions/bookmarks';

class EditActionBar extends React.Component {
  handlePinMultipleTabs = () => {
    this.props.checkedTabsInWindow.forEach(tabId => {
      const tabToPin = this.props.windows.find(({id}) => this.props.windowId === id).tabs.find(({id}) => id === tabId);
      this.props.dispatch(pinTabRequest(tabToPin.id, !this.props.areAllTabsPinned));
    });
  };

  handleAddMultipleBookmarks = () => {
    this.props.checkedTabsInWindow.forEach(tabId => {
      const tabToBookmark = this.props.windows.find(({id}) => this.props.windowId === id).tabs.find(({id}) => id === tabId);
      this.props.dispatch(createBookmarkRequest(tabToBookmark.title, tabToBookmark.url));
    });
  };

  handleCloseTabs = () => {
    this.props.dispatch(removeTabsRequest(this.props.checkedTabsInWindow));
  };


  render () {
    return (
      <div className="actions">
        <Button
          className="button button--small"
          title="Pin seleceted tabs"
          icon={faThumbtack}
          handleClick={this.handlePinMultipleTabs}
        />
        <Button
          className="button button--small"
          title="Add bookmark"
          icon={faStar}
          handleClick={this.handleAddMultipleBookmarks}
        />
        <Button
          className="button button--small"
          title="Close selected tabs"
          icon={faTimes}
          handleClick={this.handleCloseTabs}
        />
      </div>
    )
  }
};

const checkedTabsInWindow = (checkedTabs, props) => {
  return checkedTabs.filter(({ windowId }) => windowId === props.windowId).map(({id}) => id);
};

const mapStateToProps = (state, props) => {
  return {
    windows: state.windows,
    checkedTabs: state.checkedTabs.filter(({ windowId }) => windowId === props.windowId),
    checkedTabsInWindow: checkedTabsInWindow(state.checkedTabs, props),
    areAllTabsPinned: 
      state.windows.find(({ id }) => id === props.windowId)
        .tabs.filter(({id}) => checkedTabsInWindow(state.checkedTabs, props).includes(id))
        .every(({pinned}) => pinned),
  };
};

export default connect(mapStateToProps)(EditActionBar);
