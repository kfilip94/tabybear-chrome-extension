import React from 'react';
import { connect } from 'react-redux';
import { removeTab } from '../actions/tabs';
import { setTabActive } from '../chrome-services/tabs';

const Tab = (props) => (
  <div className="tab">
    <div className="tab-checkbox">
      <img src={props.tab.favIconUrl} className="tab-checkbox__icon"/>
    </div>
    <span className="tab__title" onClick={() => setTabActive(props.tab.id, ()=> console.log('set active!'))}>{props.tab.title} </span>
    <button 
      className="tab__close"
      onClick={() => {
        console.log('remove click!');
        chrome.tabs.remove(props.tab.id, () => {
          console.log('callback');
          props.dispatch(removeTab(props.tab.id));
        });
      }}
    >x</button>
  </div>
);


export default connect()(Tab);