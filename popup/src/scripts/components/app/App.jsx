import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from '../navbar/Navbar';
import Searchbar from '../searchbar/SearchBarContainer';
import Window from '../windows/WindowContainer'

const App = props => {
  const { className, createWindow, handleOpenSettingsPage, onDragStart, onDragEnd, windows } = props;
  return (
    <div className="app">
      <DragDropContext 
        onDragStart={() => onDragStart()}
        onDragEnd={(result) => onDragEnd(result)}
        className={className}
      >
        <Navbar
          handleCreateWindow={() => createWindow()}
          handleOpenSettingsPage={() => handleOpenSettingsPage()}
        />
        <Searchbar />
        <div className="window-list">
          { windows && windows.length !== 0 ? 
              windows.map(({ windowId, tabs}) => 
                ( 
                  <Window 
                    key={windowId} 
                    tabs={tabs} 
                    windowId={windowId}  
                    windows={windows}
                  />
                )
              ) : 
              <p className="window-list--empty">I didn&apos;t find anything :(</p>
          }
        </div>
      </DragDropContext>
    </div>
  );
};

App.propTypes = {
  className: PropTypes.string,
  createWindow: PropTypes.func.isRequired,
  handleOpenSettingsPage: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  windows: PropTypes.arrayOf(PropTypes.shape({ windowId: PropTypes.number, tabs: PropTypes.array })),
};

App.defaultProps = {
  className: '',
  windows: [],
};

export default App;