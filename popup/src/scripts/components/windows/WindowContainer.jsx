import React from 'react';
import Window from './Window';
import { connect } from 'react-redux';
import { createTabRequest } from '../../actions/tabs';

const WindowContainer = props => (
	<Window {...props }/>
);

const mapDispatchToProps = (dispatch, props) => ({
	createTab: () => { dispatch(createTabRequest(props.windowId)) }
});

export default connect(mapDispatchToProps)(WindowContainer);