import React from 'react';
import { connect } from 'react-redux';
import ActionBar from './ActionBar';
import Tab from './Tab';
import { createTabRequest } from '../actions/tabs';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const getListStyle = isDraggingOver => ({
	// background: isDraggingOver ? 'lightblue' : 'lightgrey',
	// padding: '4px',
	// width: 250,
	// maxHeight: '400px',
	// overflowY: 'scroll'
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // // some basic styles to make the items look a bit nicer
  // userSelect: 'none',
  // padding: '10px',
  // margin: '0 0 10px 0',

  // // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // // styles we need to apply on draggables
  // ...draggableStyle,
});

class Window extends React.Component {
	render() {
		return(
			<div className="window">
				<ActionBar windowId={this.props.windowId} />
				<Droppable droppableId={this.props.windowId} className="window__tab-list">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
						>
							{this.props.tabs.map((tab) => (
								<Draggable key={tab.id} draggableId={tab.id} index={tab.index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											style={getItemStyle(
												snapshot.isDragging,
												provided.draggableProps.style
											)}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<Tab key={tab.id} tab={tab}/>
										</div>
									)}
								</Draggable>
							))}
						</div>
					)}
				</Droppable>
				
				<button
					className="window__bottom-btn"
					onClick={() => this.props.dispatch(createTabRequest(this.props.windowId))}
				>
					+ Open new tab
				</button>
			</div>
		)
	};
};

export default connect()(Window);