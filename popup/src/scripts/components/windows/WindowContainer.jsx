import React from 'react';
import Window from './Window';
import { connect } from 'react-redux';
import { createTabRequest } from '../../actions/tabs';

const WindowContainer = props => (
	<Window { ...props } />
);

const mapDispatchToProps = (dispatch) => {
  return {
		createTab: (windowId) => { dispatch(createTabRequest(windowId)) }
	};	
};

export default connect(null, mapDispatchToProps)(WindowContainer);