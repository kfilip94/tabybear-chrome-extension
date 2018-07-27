import React from 'react';
import { connect } from 'react-redux';
import { removeTab } from '../actions/tabs';
import { setTabActive } from '../chrome-services/tabs';
import TabCheckbox from './TabCheckbox';

const Tab = (props) => (
  <div className="tab">
    <TabCheckbox tab={props.tab}/>
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