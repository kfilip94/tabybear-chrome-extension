import React from 'react';
import Button from './Button';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { removeWindow } from '../actions/tabs';
import { closeWindow } from '../chrome-services/windows';

const ActionBar = (props) => (
  <div className="action-bar">
    <span></span>
      <div className="action-bar-container">
        <span className="action-bar__counter">
          {props.tabsCount}
        </span>
        <Button 
          className="button button--small"
          title="Manage tabs in this window"
          icon={faEdit}
        />
        <Button 
          className="button button--small"
          title="Close window with all tabs"
          icon={faPlus}
          onClick={() => 
            closeWindow(props.windowId, () => 
              props.dispatch(removeWindow(props.windowId)
            )
          )}
        />
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    tabsCount: state.windows.find(({id}) => id === props.windowId).tabs.length
  }
};

export default connect(mapStateToProps)(ActionBar);
