import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Searchbar from './SearchBar';
import Window from './Window'
import { setWindowsRequest, createWindowRequest  } from '../actions/windows';
import { moveTabRequest  } from '../actions/tabs';
import selectTabs from '../selectors/tabs';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
  componentDidMount() {
    console.log('component did mount!');
    this.props.setWindows();
  };
  wololo(id, windowId, index) {
    this.props.moveTab(id, windowId, index);
  };

  onDragEnd(result) {
    console.log('APP: onDragEnd:',result);
    this.wololo(
      result.draggableId, 
      result.destination.droppableId, 
      result.destination.index
    );
    // // dropped outside the list
    // if (!result.destination) {
    //   return;
    // }

    // const items = reorder(
    //   this.state.items,
    //   result.source.index,
    //   result.destination.index
    // );

    // this.setState({
    //   items,
    // });
  };


  render() {
    console.log('this props windows', this.props.windows);
    return (
      <DragDropContext onDragEnd={(result) => {
        console.log('APP: onDragEnd:',result);

        this.wololo(
          result.draggableId, 
          result.destination.droppableId, 
          result.destination.index
        );
      }} >
        <div className='app'>
          <Navbar
            handleOpenNewWindow={() => this.props.dispatch(createWindowRequest())}
            handleOpenSettingsPage={() => console.log('open settings page')}
          />
          <Searchbar />
          <div className="window-list">
            {this.props.windows && this.props.windows.map(
              (chromeWindow) => (<Window key={ chromeWindow.id } tabs={chromeWindow.tabs} windowId={chromeWindow.id}/>)
            )}
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    moveTab: (id, windowId, index) => {dispatch(moveTabRequest(id, windowId, index))},
    setWindows: () => {dispatch(setWindowsRequest())}
  };
};


const mapStateToProps = (state) => {
  return {
    windows: selectTabs(state.windows, state.filters)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
