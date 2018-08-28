import React from 'react';
import { connect } from 'react-redux';
import ActionBar from './ActionBar';
import Tab from './Tab';
import { createTabRequest } from '../actions/tabs';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const getListStyle = isDraggingOver => ({
	border: isDraggingOver ? '2px solid #CCA43B' : '0',
	padding: '8px 0',
	background: 'white',
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: '10px',
  margin: '0 0 10px 0',

  // // change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',
	...draggableStyle,

  // // styles we need to apply on draggables
	// ':after': {
	// 	content: 'hello!',

	// }
});

const Window = props => (
			<div className="window">
				<ActionBar windowId={props.windowId} />
				<Droppable droppableId={String(props.windowId)} className="window__tab-list">
					{(provided, snapshot) => {
						console.log(`WINDOW id:${props.windowId}`  );
						console.log('WINDOW provided:',provided );
						console.log('WINDOW snapshot:',snapshot);
						return (
							<div
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
							>
								{props.tabs.map((tab) => { 
									console.log(`-->tab id:${tab.id},indes:${tab.index}`  )
									return(
									<Draggable key={`${tab.id}`} draggableId={`${tab.id}`} index={tab.index}>
										{(provided, snapshot) => (
											<div>
												<div
													ref={provided.innerRef}
													style={getItemStyle(
														snapshot.isDragging,
														provided.draggableProps.style
													)}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<Tab tab={tab} isDragging={snapshot.isDragging} isWindowDragging={props.isDragging}/>
												</div>
												{provided.placeholder}
											</div>
										)}
									</Draggable>);}
								)}
								{provided.placeholder}
							</div>
						);
						}
					}

				</Droppable>
				
				<button
					className="window__bottom-btn"
					onClick={() => props.dispatch(createTabRequest(props.windowId))}
				>
					+ Open new tab
				</button>
			</div>
		)
;

export default connect()(Window);