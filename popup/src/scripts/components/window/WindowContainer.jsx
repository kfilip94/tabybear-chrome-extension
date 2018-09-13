import React from 'react';
import { connect } from 'react-redux';
import Window from './Window';
import { createTabRequest } from 'requestActions/tabs';

const WindowContainer = props => (
	 <Window { ...props } />
);

const mapDispatchToProps = (dispatch) => {
  return {
		createTab: (windowId) => { dispatch(createTabRequest(windowId)) }
	};	
};

export default connect(null, mapDispatchToProps)(WindowContainer);