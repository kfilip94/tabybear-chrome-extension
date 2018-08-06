import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import { faTimes, faCheckCircle, faThumbtack, faStar } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { removeTabs, pinTabThunk, pinTab } from '../actions/tabs';
  // import { pinTab } from '../chrome-services/tabs';
import { clearSelection } from '../actions/checkedTabs';

class EditActionBar extends React.Component {
  handlePinMultipleTabs = () => {
    this.props.checkedTabsInWindow.forEach(id => {
       this.props.dispatch(pinTab(id, true));
    });
  };

  handleCloseTabs = () => {
    this.props.dispatch(removeTabs(this.props.checkedTabsInWindow));
    this.props.dispatch(clearSelection());
  };

  render () {
    return (
      <div className="actions">
        <Button
          className="button button--small"
          title="Select all tabs in window"
          icon={faCheckCircle}
        />
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

const mapStateToProps = (state, props) => {
  return {
    checkedTabsInWindow: state.checkedTabs.filter(({ windowId }) => windowId === props.windowId).map(({id}) => id)
  }
};

export default connect(mapStateToProps)(EditActionBar);
