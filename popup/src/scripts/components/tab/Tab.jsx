import React from 'react';
import classNames from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TabCheckbox from './TabCheckbox';
import Button from '../button/Button';
import TabTitle from './TabTitle';

const tabClassNames = isInDraggedGroup => 
  classNames("tab" , {
    "tab--dragged": isInDraggedGroup
  });

const Tab = props => {
  const { checkTab, checkedTabsLength, drag, muteTab, pinTab, isChecked, isDragging, removeTab, setTabActive, tab, uncheckTab } = props;
  const { id, mutedInfo: { muted }, pinned,  windowId } = tab;

  return (
    <div className={tabClassNames(isChecked && drag && !isDragging)}>
      <TabCheckbox 
        tab={tab} 
        isChecked={isChecked}
        handleCheckTab={() => checkTab(id, windowId)}
        handleUncheckTab={() =>  uncheckTab(id)}
        handlePinTab={() => pinTab(id, !pinned)}
        handleMuteTab={() => muteTab(id, !muted)}
      />
      <TabTitle 
        tab={tab} 
        isChecked={isChecked}
        handleClick={() => setTabActive(id, windowId)} 
      />
      <Button 
        className="tab__close"
        icon={faTimes}
        handleClick={() => removeTab(id)}
      />
      {isDragging && isChecked && 
        (
          <div className="tab__dragged-counter">
            {checkedTabsLength}
          </div>
        )
      }
    </div>
  );
};

export default Tab;