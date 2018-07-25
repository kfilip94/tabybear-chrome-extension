import React from 'react';
import ActionBar from './ActionBar';
import Tab from './Tab';
import { removeWindow } from '../actions/tabs';
import { closeWindow } from '../services/chrome-windows';
import { connect } from 'react-redux';

const Window = (props) => (
	<div className="window">
		<ActionBar windowId={props.windowId} />
		<div className="window__tab-list" >
			 { props.tabs.map((tab, id) => <Tab key={tab.id} tab={tab}/>) }
		</div>
		<button 
			onClick={() => 
				closeWindow(props.windowId, () => 
					props.dispatch(removeWindow(props.windowId)
				)
			)}
		>
			Remove Window
		</button>
	</div>
);

export default connect()(Window);