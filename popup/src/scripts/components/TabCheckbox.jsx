import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faVolumeOff, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const pinTabBtnClassNames = isPinned => 
  classNames("tab-checkbox__btn", "tab-checkbox__btn--pin" , {
    "tab-checkbox__btn--enabled": isPinned
  })

const muteTabClassNames = isMuted =>
  classNames("tab-checkbox__btn", "tab-checkbox__btn--mute" , {
    "tab-checkbox__btn--enabled": isMuted
  })

const TabCheckbox = props => (
      <div className="tab-checkbox">
        {!props.isChecked ? 
          <img 
            src={props.tab.favIconUrl} 
            className="tab-checkbox__favicon"
            onClick={props.handleCheckTab}
          />
          :
          <FontAwesomeIcon 
            icon={faCheckCircle} 
            className="tab-checkbox__favicon"
            onClick={props.handleUncheckTab}
          />
        }
        <FontAwesomeIcon 
          icon={faThumbtack} 
          className={pinTabBtnClassNames(props.tab.pinned)}
          onClick={props.handlePinTab}
        />
        <div 
          className={muteTabClassNames(props.tab.mutedInfo.muted)}
          onClick={props.handleMuteTab}
        >
          <FontAwesomeIcon 
            icon={faVolumeOff} 
          />
        </div>
      </div>
);


export default TabCheckbox;
