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



class Window extends React.Component {
	state = {
		isDraggingOver: false,
	};

	render(){
		return (
			<div className="window">
				<ActionBar windowId={this.props.windowId} />
				<Droppable droppableId={String(this.props.windowId)} className="window__tab-list">
					{(provided, snapshot) => {
						// console.log(`WINDOW id:${this.props.windowId}`  );
						// console.log('WINDOW provided:',provided );
						// console.log('WINDOW snapshot:',snapshot);
						// this.setState(() => ({ isDraggingOver: snapshot.isDraggingOver }));
						return (
							<div
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
							>
								{this.props.tabs && this.props.tabs.map((tab) => { 
									// console.log(`-->tab id:${tab.id},indes:${tab.index}`  )
									return(
									<Draggable key={`${tab.id}`} draggableId={`${tab.id}`} index={tab.index}>
										{(provided, snapshotDraggable) => {
											
											// console.log(`-->tab id:${tab.id},indes:${tab.index}`  )
											// console.log('TAB provided:',provided );
											// console.log('TAB snapshot:',snapshot);
											return (
											<div>
												<div
													ref={provided.innerRef}
													style={getItemStyle(
														snapshotDraggable.isDragging,
														provided.draggableProps.style
													)}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<Tab tab={tab} isDragging={snapshotDraggable.isDragging} isWindowDragging={this.props.isDragging}/>
												</div>
												{provided.placeholder}
											</div>
										)}}
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
					onClick={() => this.props.dispatch(createTabRequest(this.props.windowId))}
				>
					+ Open new tab
				</button>
			</div>
		);
	}
}	
;

export default connect()(Window);