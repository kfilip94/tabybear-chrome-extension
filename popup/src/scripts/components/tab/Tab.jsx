import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TabCheckbox from './TabCheckbox';
import FontAwesomeButton from 'button/FontAwesomeButton';
import TabTitle from './TabTitle';

const tabClassNames = isInDraggedGroup => 
  classNames("tab" , {
    "tab--dragged": isInDraggedGroup
  });

const Tab = props => {
  const { checkTab, checkedTabsLength, drag, muteTab, pinTab, isChecked, isDragging, removeTab, setTabActive, tab, uncheckTab } = props;
  const { active, favIconUrl, id, muted, pinned,  windowId, title } = tab;

  return (
    <div className={tabClassNames(isChecked && drag && !isDragging)}>
      <TabCheckbox 
        favIconUrl={favIconUrl} 
        muted={muted}
        pinned={pinned}
        isChecked={isChecked}
        handleCheckTab={() => checkTab(id, windowId)}
        handleUncheckTab={() =>  uncheckTab(id)}
        handlePinTab={() => pinTab(id, !pinned)}
        handleMuteTab={() => muteTab(id, !muted)}
      />
      <TabTitle 
        active={active}
        title={title} 
        isChecked={isChecked}
        handleClick={() => setTabActive(id, windowId)} 
      />
      <FontAwesomeButton 
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

Tab.propTypes = {
  checkTab: PropTypes.func.isRequired,
  checkedTabsLength: PropTypes.number,
  drag: PropTypes.bool,
  muteTab: PropTypes.func.isRequired, 
  pinTab: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
  isDragging: PropTypes.bool,
  removeTab: PropTypes.func.isRequired,
  setTabActive: PropTypes.func.isRequired,
  tab: PropTypes.shape({ 
    active: PropTypes.bool, 
    favIconUrl: PropTypes.string,
    id: PropTypes.number,
    index: PropTypes.number,
    muted: PropTypes.bool,  
    pinned: PropTypes.bool,  
    title: PropTypes.string, 
    url: PropTypes.string, 
    windowId: PropTypes.number
   }).isRequired,
  uncheckTab: PropTypes.func.isRequired,
};

Tab.defaultProps = {
  checkedTabsLength: 0,
  drag: false,
  isChecked: false,
  isDragging: false,
};

export default Tab;