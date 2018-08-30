import React from 'react';
import classNames from 'classnames';
import TabCheckbox from './TabCheckbox';
import Button from '../Button';
import TabTitle from './TabTitle';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const tabClassNames = isInDraggedGroup => 
  classNames("tab" , {
    "tab--dragged": isInDraggedGroup
  });

const Tab = props => (
    <div className={tabClassNames(props.isChecked && props.isWindowDragging && !props.isDragging)}>
      <TabCheckbox 
        tab={props.tab} 
        isChecked={props.isChecked}
        handleCheckTab={() =>  props.checkTab(props.tab.id, props.tab.windowId)}
        handleUncheckTab={() =>  props.uncheckTab(props.tab.id)}
        handlePinTab={() =>  props.pinTab(props.tab.id, !props.tab.pinned)}
        handleMuteTab={() =>  props.muteTab(props.tab.id, !props.tab.mutedInfo.muted)}
      />
      <TabTitle 
        tab={props.tab} 
        isChecked={props.isChecked}
        handleClick={() => props.setTabActive(props.tab.id, props.tab.windowId)} 
      />
      <Button 
        className="tab__close"
        icon={faTimes}
        handleClick={() => props.removeTab(props.tab.id)}
      />
      {props.isDragging && props.isChecked && 
        <div className="tab__dragged-tabs-counter">
          {props.checkedTabsLength}
        </div>
      }
    </div>
);

export default Tab;