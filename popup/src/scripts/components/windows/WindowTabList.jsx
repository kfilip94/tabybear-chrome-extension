import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Tab from '../tab/TabContainer';

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

const WindowTabList = ({ tabs, windowId }) => (
  <Droppable droppableId={`${windowId}`} className="window__tab-list">
    {({ innerRef }, { isDraggingOver }) => 
      (
        <div
          ref={innerRef}
          style={getListStyle(isDraggingOver)}
        >
          {tabs && tabs.map((tab) => 
            (
              <Draggable key={`${tab.id}`} draggableId={`${tab.id}`} index={tab.index}>
                {({ innerRef: innerRefDraggable, draggableProps, dragHandleProps}, { isDragging }) => 
                  (
                    <div>
                      <div
                        ref={innerRefDraggable}
                        style={getItemStyle(isDragging, draggableProps.style)}
                        {...draggableProps}
                        {...dragHandleProps}
                      >
                        <Tab tab={tab} isDragging={isDragging} />
                      </div>
                    </div>
                  )
                }
              </Draggable>
            )
          )}
        </div>
      )
    }
  </Droppable>
);

export default WindowTabList;