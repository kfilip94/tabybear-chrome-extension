import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faVolumeOff, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const pinTabBtnClassNames = isPinned => 
  classNames("tab-checkbox__action", "tab-checkbox__action--pin" , {
    "tab-checkbox__action--enabled": isPinned
  })

const muteTabClassNames = isMuted =>
  classNames("tab-checkbox__action", "tab-checkbox__action--mute" , {
    "tab-checkbox__action--enabled": isMuted
  })

const TabCheckbox = props => {
  const { isChecked, handleCheckTab, handleMuteTab, handlePinTab, handleUncheckTab, tab } = props;
  const { favIconUrl, mutedInfo: { muted }, pinned } = tab;

  return (
    <div className="tab-checkbox">
      {!isChecked ? 
        ( 
          <img 
            src={favIconUrl} 
            className="tab-checkbox__favicon"
            onClick={handleCheckTab}
          />
        )
        :
        (
          <FontAwesomeIcon 
            icon={faCheckCircle} 
            className="tab-checkbox__favicon"
            onClick={handleUncheckTab}
          />
        )
      }
      <div title="Pin tab">
        <FontAwesomeIcon 
          icon={faThumbtack} 
          className={pinTabBtnClassNames(pinned)}
          onClick={handlePinTab}
        />
      </div>
      <div 
        className={muteTabClassNames(muted)}
        onClick={handleMuteTab}
        title="Mute tab"
      >
        <FontAwesomeIcon icon={faVolumeOff} />
      </div>
    </div>
  );
};

export default TabCheckbox;
