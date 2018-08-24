import React from 'react';
import classNames from 'classnames';
import TabCheckbox from './TabCheckbox';
import Button from './Button';
import TabTitle from './TabTitle';
import { connect } from 'react-redux';
import { removeTabRequest, setTabActiveRequest, pinTabRequest, muteTabRequest  } from '../actions/tabs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { checkTab, uncheckTab } from '../actions/checkedTabs';

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
        className="button tab__close"
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

const mapDispatchToProps = (dispatch) => {
  return {
    checkTab: (id, windowId) => { dispatch(checkTab(id, windowId)) },
    uncheckTab: (id) => { dispatch(uncheckTab(id)) },
    pinTab: (id, pinned) => { dispatch(pinTabRequest(id, pinned)) },
    muteTab: (id, muted) => { dispatch(muteTabRequest(id, muted)) },
    setTabActive: (id, windowId) => { dispatch(setTabActiveRequest(id, windowId)) },
    removeTab: (id) => { dispatch(removeTabRequest(id)) },
  };
};

const mapStateToProps = (state, props) => {
  return {
    isChecked: state.checkedTabs.some(({ id }) => id === props.tab.id),
    checkedTabsLength: state.checkedTabs.length
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab);