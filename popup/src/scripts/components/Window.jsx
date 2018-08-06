import React from 'react';
import ActionBar from './ActionBar';
import Tab from './Tab';
import { addTab } from '../actions/tabs';
import { openNewTab } from '../chrome-services/tabs';
import { connect } from 'react-redux';

const Window = (props) => (
	<div className="window">
		<ActionBar windowId={props.windowId} />
		<div className="window__tab-list" >
		  { props.tabs.map((tab) => (<Tab key={tab.id} tab={tab}/>)) }
		</div>
		<button
			className="window__bottom-btn"
			onClick={() => openNewTab(props.windowId, (newTab) => props.dispatch(addTab(newTab)))}
		>
			+ Open new tab
		</button>
	</div>
);



export default connect()(Window);