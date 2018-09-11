import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  const { isChecked, handleCheckTab, handleMuteTab, handlePinTab, handleUncheckTab, favIconUrl, muted, pinned } = props;

  return (
    <div className="tab-checkbox">
      {!isChecked ? 
        ( 
          <img 
            src={favIconUrl} 
            className="tab-checkbox__favicon"
            onClick={handleCheckTab}
            alt=""
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

TabCheckbox.propTypes = {
  isChecked: PropTypes.bool, 
  handleCheckTab: PropTypes.func.isRequired,
  handleMuteTab: PropTypes.func.isRequired,
  handlePinTab: PropTypes.func.isRequired,
  handleUncheckTab: PropTypes.func.isRequired,
  favIconUrl: PropTypes.string,
  muted: PropTypes.bool.isRequired, 
  pinned: PropTypes.bool.isRequired,
};

TabCheckbox.defaultProps = {
  isChecked: false,
  favIconUrl: ''
};

export default TabCheckbox;
