import React from 'react';
import { connect } from 'react-redux';
import Tab from './Tab';
import { removeTabRequest, setTabActiveRequest, pinTabRequest, muteTabRequest } from 'requestActions/tabs';
import { checkTab, uncheckTab } from 'reducers/checkedTabs';

const TabContainer = props => (
  <Tab {...props} />
);

const mapDispatchToProps = dispatch => ({
  checkTab: (id, windowId) => { dispatch(checkTab({ id, windowId })) },
  uncheckTab: (id) => { dispatch(uncheckTab({ id })) },
  pinTab: (id, windowId, pinned) => { dispatch(pinTabRequest(id, windowId, pinned)) },
  muteTab: (id, windowId, muted) => { dispatch(muteTabRequest(id, windowId, muted)) },
  setTabActive: (id, windowId) => { dispatch(setTabActiveRequest(id, windowId)) },
  removeTab: (id) => { dispatch(removeTabRequest(id)) },
});

const mapStateToProps = (state, props) => ({
  isChecked: state.checkedTabs.some(({ id }) => id === props.tab.id),
  drag: state.drag,
  checkedTabsLength: state.checkedTabs.length
});

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer);