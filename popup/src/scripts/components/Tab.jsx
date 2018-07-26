import React from 'react';
import { connect } from 'react-redux';
import { removeTab } from '../actions/tabs';

const Tab = (props) => (
  <div>
    >{props.tab.title}
    <button onClick={() => {
      console.log('remove click!');
      chrome.tabs.remove(props.tab.id, () => {
        console.log('callback');
        props.dispatch(removeTab(props.tab.id));
      });
    }}>remove</button>
  </div>
);


export default connect()(Tab);