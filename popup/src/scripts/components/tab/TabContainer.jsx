import React from 'react';
import { connect } from 'react-redux';
import Tab from './Tab';
import { removeTabRequest, setTabActiveRequest, pinTabRequest, muteTabRequest  } from '../../actions/tabs';
import { checkTab, uncheckTab } from '../../../../../event/src/reducers/checkedTabs';

const TabContainer = props => (
  <Tab {...props} />
);

const mapDispatchToProps = dispatch => ({
  checkTab: (tabId, windowId) => { dispatch(checkTab({ tabId, windowId })) },
  uncheckTab: (tabId) => { dispatch(uncheckTab({ tabId })) },
  pinTab: (tabId, windowId, pinned) => { dispatch(pinTabRequest(tabId, windowId, pinned)) },
  muteTab: (tabId, windowId, muted) => { dispatch(muteTabRequest(tabId, windowId, muted)) },
  setTabActive: (tabId, windowId) => { dispatch(setTabActiveRequest(tabId, windowId)) },
  removeTab: (tabId) => { dispatch(removeTabRequest(tabId)) },
});

const mapStateToProps = (state, props) => ({
  isChecked: state.checkedTabs.some(({ id }) => id === props.tab.id),
  drag: state.drag,
  checkedTabsLength: state.checkedTabs.length
});

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer);