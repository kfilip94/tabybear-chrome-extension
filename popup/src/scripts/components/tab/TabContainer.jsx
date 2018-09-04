import React from 'react';
import Tab from './Tab';
import { connect } from 'react-redux';
import { removeTabRequest, setTabActiveRequest, pinTabRequest, muteTabRequest  } from '../../actions/tabs';
import { checkTab, uncheckTab } from '../../../../../event/src/reducers/checkedTabs';

const TabContainer = props => (
    <Tab {...props} ></Tab>
);

const mapDispatchToProps = (dispatch) => {
  return {
    checkTab: (tabId, windowId) => { dispatch(checkTab({ tabId, windowId })) },
    uncheckTab: (tabId) => { dispatch(uncheckTab({ tabId })) },
    pinTab: (tabId, pinned) => { dispatch(pinTabRequest(tabId, pinned)) },
    muteTab: (tabId, muted) => { dispatch(muteTabRequest(tabId, muted)) },
    setTabActive: (tabId, windowId) => { dispatch(setTabActiveRequest(tabId, windowId)) },
    removeTab: (tabId) => { dispatch(removeTabRequest(tabId)) },
  };
};

const mapStateToProps = (state, props) => {
  return {
    isChecked: state.checkedTabs.some(({ id }) => id === props.tab.id),
    drag: state.drag,
    checkedTabsLength: state.checkedTabs.length
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer);