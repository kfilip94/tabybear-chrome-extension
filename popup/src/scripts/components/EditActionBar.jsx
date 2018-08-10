import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import { faTimes, faThumbtack, faStar } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { pinTabRequest, removeTabsRequest } from '../actions/tabs';

class EditActionBar extends React.Component {
  handlePinMultipleTabs = () => {
    this.props.checkedTabsInWindow.forEach(id => {
       this.props.dispatch(pinTabRequest(id, !this.props.areAllTabsPinned));
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
          title="Manage tabs in this window"
          icon={faStar}
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
    checkedTabsInWindow: checkedTabsInWindow(state.checkedTabs, props),
    areAllTabsPinned: 
      state.windows.find(({ windowId }) => windowId === props.id)
        .tabs.filter(({id}) => checkedTabsInWindow(state.checkedTabs, props).includes(id))
        .every(({pinned}) => pinned),
  };
};

export default connect(mapStateToProps)(EditActionBar);
