import React from 'react';
import ActionBar from '../actionbar/ActionBarContainer';
import Tab from '../tab/TabContainer';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const getListStyle = isDraggingOver => ({
	border: isDraggingOver ? '2px solid #CCA43B' : '0',
	padding: '8px 0',
	background: 'white',
});

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	padding: '10px',
	margin: '0 0 10px 0',
  background: isDragging ? 'lightgreen' : 'grey',
  border: isDragging ? '1px solid #CCA43B' : '0',
	...draggableStyle,
});

const Window = props => (
  <div className="window">
    <ActionBar 
      windowId={props.windowId}
      filteredTabs={props.filteredTabs}
    />
    <Droppable droppableId={`${props.windowId}`} className="window__tab-list">
      {(provided, snapshot) => 
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {props.tabs && props.tabs.map((tab) => 
            <Draggable key={`${tab.id}`} draggableId={`${tab.id}`} index={tab.index}>
              {(provided, snapshotDraggable) => 
                <div>
                  <div
                    ref={provided.innerRef}
                    style={getItemStyle(snapshotDraggable.isDragging,provided.draggableProps.style)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Tab tab={tab} isDragging={snapshotDraggable.isDragging} />
                  </div>
                  {provided.placeholder}
                </div>
              }
            </Draggable>)
          }
          {provided.placeholder}
        </div>
      }
    </Droppable>
    <button
      className="window__new-tab"
      onClick={() => props.createTab(props.windowId)}
    >
      + Open new tab
    </button>
  </div>
);

export default Window;