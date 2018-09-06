import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Searchbar from './SearchBar';
import Window from './windows/WindowContainer'
import { createWindowRequest, setWindowsRequest  } from '../actions/windows';
import { moveTabRequest, moveTabsRequest } from '../actions/tabs';
import selectTabs from '../selectors/tabs';
import { DragDropContext } from 'react-beautiful-dnd';
import * as actionsDrag from '../../../../event/src/reducers/drag';

class App extends React.Component {

  componentDidMount() {
    console.log('component did mount!');
    this.props.setWindows();
  };

  handleOpenSettingsPage() {
    if (chrome.runtime.openOptionsPage)
      chrome.runtime.openOptionsPage();
    else 
      window.open(chrome.runtime.getURL('html/settings.html'));
  }

  onDragStart() {
    this.props.startDragging();
  }

  onDragEnd({draggableId, source, destination}) {
    this.props.stopDragging();

    if(destination && destination.droppableId){
      const tabId = parseInt(draggableId);
      const newWindowId = parseInt(destination.droppableId);
      const windowId = parseInt(source.droppableId);

      if(this.props.checkeTabsIds.includes(parseInt(tabId)))
        this.props.moveTabs(this.props.checkedTabs, newWindowId, destination.index);
      else 
        this.props.moveTab(tabId, windowId,  newWindowId, destination.index);
    }
  };

	shouldComponentUpdate(nextProps) {
    return this.props.windows !== nextProps.windows;
  }

  render() {
    return (
      <div className="app">
        <DragDropContext 
          onDragStart={() => this.onDragStart()}
          onDragEnd={(result) => this.onDragEnd(result)}
          className={this.props.className}
        >
          <Navbar
            handleCreateWindow={() => this.props.createWindow()}
            handleOpenSettingsPage={this.handleOpenSettingsPage}
          />
          <Searchbar />
          <div className="window-list">
            {this.props.windows && this.props.windows.length != 0 ?
              this.props.windows.map((chromeWindow) => 
                <Window 
                  key={chromeWindow.id} 
                  tabs={chromeWindow.tabs} 
                  windowId={chromeWindow.id}  
                  windows={this.props.windows}
                />
              ) : <p className="window-list--empty" >I didn't found anything :(</p>
            }
          </div>
        </DragDropContext>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createWindow: () => { dispatch(createWindowRequest()) },
    moveTab: (id, windowId, newWindowId, index) => { dispatch(moveTabRequest(id, windowId, newWindowId, index)) },
    moveTabStore: (id, windowId, newWindowId, index) => { dispatch(moveTabStore(id, windowId, newWindowId, index)) },
    moveTabs: (checkedTabs, newWindowId, index) => { dispatch(moveTabsRequest(checkedTabs, newWindowId, index)) },
    setWindows: () => { dispatch(setWindowsRequest()) },
    startDragging: () => { dispatch(actionsDrag.startDragging()) },
    stopDragging: () => { dispatch(actionsDrag.stopDragging()) }
  };
};

const mapStateToProps = (state) => {
  return {
    windows: selectTabs(state.windows, state.filters),
    checkedTabs: state.checkedTabs,
    checkeTabsIds: state.checkedTabs.map(({id}) => id),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
