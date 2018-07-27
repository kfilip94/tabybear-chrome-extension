import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { updateTab } from '../actions/tabs';
import { pinTab } from '../chrome-services/tabs';

const TabCheckbox = (props) => (
  <div className="tab-checkbox">
    <img src={props.tab.favIconUrl} className="tab-checkbox__icon"/>
    <FontAwesomeIcon 
      icon={faThumbtack} 
      className="tab-checkbox__pin-btn"
      onClick={() => {
        console.log('props.tab.id:',props.tab.id,' ,props.tab.pinned:',props.tab.pinned);
        pinTab(props.tab.id, props.tab.pinned, (updatedTab) => props.dispatch(updateTab(props.tab.id, updatedTab)));
      }} />
  </div>
);

export default connect()(TabCheckbox);
