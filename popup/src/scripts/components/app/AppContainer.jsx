import React from 'react';
import { connect } from 'react-redux';
import { createWindowRequest } from 'requestActions/windows';
import { moveTabRequest, moveTabsRequest, setTabsRequest } from 'requestActions/tabs';
import App from './App';
import selectWindows from './AppSelectors';
import * as actionsDrag from 'reducers/drag';

class AppContainer extends React.Component {
  componentDidMount() {
    const { setTabs } = this.props;
    setTabs();
  };

  handleOpenSettingsPage() {
    if (chrome.runtime.openOptionsPage)
      chrome.runtime.openOptionsPage();
    else 
      window.open(chrome.runtime.getURL('html/settings.html'));
  }

  onDragStart = () => {
    const { startDragging } = this.props;
    startDragging();
  }

  onDragEnd = ({ draggableId, source, destination }) => {
    const { checkedTabs, checkeTabsIds, moveTab, moveTabs, stopDragging } = this.props;

    stopDragging();
    
    if(destination && destination.droppableId){
      const tabId = parseInt(draggableId);
      const newWindowId = parseInt(destination.droppableId);
      const windowId = parseInt(source.droppableId);

      if(checkeTabsIds.includes(parseInt(tabId)))
        moveTabs(checkedTabs, windowId, newWindowId, destination.index);
      else 
        moveTab(tabId, windowId,  newWindowId, destination.index);
    }
  };

  render() {
    return(
      <App 
        { ...this.props }
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        handleOpenSettingsPage={this.handleOpenSettingsPage}
      />
    );
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createWindow: () => { dispatch(createWindowRequest()) },
    moveTab: (id, windowId, newWindowId, index) => { dispatch(moveTabRequest(id, windowId, newWindowId, index)) },
    moveTabs: (checkedTabs, windowId, newWindowId, index) => { dispatch(moveTabsRequest(checkedTabs, windowId, newWindowId, index)) },
    setTabs: () => { dispatch(setTabsRequest()) },
    startDragging: () => { dispatch(actionsDrag.startDragging()) },
    stopDragging: () => { dispatch(actionsDrag.stopDragging()) }
  };
};

const mapStateToProps = (state) => {
  return {
    checkedTabs: state.checkedTabs,
    checkeTabsIds: state.checkedTabs.map(({id}) => id),
    windows: selectWindows(state.tabs, state.filters),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
