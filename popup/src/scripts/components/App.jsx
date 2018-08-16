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
  wololo(id, windowId, newWindowId, index) {
    this.props.moveTab(id, windowId, newWindowId, index);
  };

  // onDragEnd(result) {
  //   console.log('APP: onDragEnd:',result);
  //   this.wololo(
  //     result.draggableId, 
  //     result.destination.droppableId, 
  //     result.destination.index
  //   );


  //   const { source, destination } = result;

  //   // dropped outside the list
  //   if (!destination) {
  //       return;
  //   }

  //   if (source.droppableId === destination.droppableId) {
  //       const items = reorder(
  //           this.getList(source.droppableId),
  //           source.index,
  //           destination.index
  //       );

  //       let state = { items };

  //       if (source.droppableId === 'droppable2') {
  //           state = { selected: items };
  //       }

  //       this.setState(state);
  //   } else {
  //       const result = move(
  //           this.getList(source.droppableId),
  //           this.getList(destination.droppableId),
  //           source,
  //           destination
  //       );

  //       this.setState({
  //           items: result.droppable,
  //           selected: result.droppable2
  //       });
  //   }
  //   // // dropped outside the list
  //   // if (!result.destination) {
  //   //   return;
  //   // }

  //   // const items = reorder(
  //   //   this.state.items,
  //   //   result.source.index,
  //   //   result.destination.index
  //   // );

  //   // this.setState({
  //   //   items,
  //   // });
  // };


  render() {
    console.log('this props windows', this.props.windows);
    return (
      <DragDropContext onDragEnd={(result) => {
        console.log('APP: onDragEnd:',result);

        this.wololo(
          result.draggableId, 
          result.source.droppableId,
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
    moveTab: (id, windowId, newWindowId, index) => {dispatch(moveTabRequest(id, windowId, newWindowId, index))},
    setWindows: () => {dispatch(setWindowsRequest())}
  };
};


const mapStateToProps = (state) => {
  return {
    windows: selectTabs(state.windows, state.filters)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
