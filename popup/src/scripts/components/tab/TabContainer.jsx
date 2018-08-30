import React from 'react';
import Tab from './Tab';
import { connect } from 'react-redux';
import { removeTabRequest, setTabActiveRequest, pinTabRequest, muteTabRequest  } from '../../actions/tabs';
import { checkTab, uncheckTab } from '../../actions/checkedTabs';

const TabContainer = props => (
    <Tab {...props} ></Tab>
);

const mapDispatchToProps = (dispatch) => {
  return {
    checkTab: (id, windowId) => { dispatch(checkTab(id, windowId)) },
    uncheckTab: (id) => { dispatch(uncheckTab(id)) },
    pinTab: (id, pinned) => { dispatch(pinTabRequest(id, pinned)) },
    muteTab: (id, muted) => { dispatch(muteTabRequest(id, muted)) },
    setTabActive: (id, windowId) => { dispatch(setTabActiveRequest(id, windowId)) },
    removeTab: (id) => { dispatch(removeTabRequest(id)) },
  };
};

const mapStateToProps = (state, props) => {
  return {
    isChecked: state.checkedTabs.some(({ id }) => id === props.tab.id),
    checkedTabsLength: state.checkedTabs.length
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer);