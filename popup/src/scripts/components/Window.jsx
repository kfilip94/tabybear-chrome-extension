import React from 'react';
import ActionBar from './ActionBar';
import Tab from './Tab';
import { removeWindow } from '../actions/tabs';
import { closeWindow } from '../chrome-services/windows';
import { connect } from 'react-redux';

const Window = (props) => (
	<div className="window">
		<ActionBar windowId={props.windowId} />
		<div className="window__tab-list" >
		  { props.tabs.map((tab) => (<Tab key={tab.id} tab={tab}/>)) }
		</div>
	</div>
);


export default connect()(Window);