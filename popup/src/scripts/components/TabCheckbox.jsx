import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faVolumeOff, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { pinTabRequest, muteTabRequest } from '../actions/tabs';
import { checkTab, uncheckTab } from '../actions/checkedTabs';

const TabCheckbox = (props) => (
      <div className="tab-checkbox">
        {!props.isChecked ? 
          <img 
            src={props.tab.favIconUrl} 
            className="tab-checkbox__favicon"
            onClick={() => props.dispatch(checkTab(props.tab.id, props.tab.windowId))}
          />
          :
          <FontAwesomeIcon 
            icon={faCheckCircle} 
            className="tab-checkbox__favicon"
            onClick={() => props.dispatch(uncheckTab(props.tab.id))}
          />
        }
        <FontAwesomeIcon 
          icon={faThumbtack} 
          className={classNames("tab-checkbox__btn", "tab-checkbox__btn--pin" , {
            "tab-checkbox__btn--enabled": props.tab.pinned
          })}
          onClick={() => props.dispatch(pinTabRequest(props.tab.id, !props.tab.pinned))}
        />
        <FontAwesomeIcon 
          icon={faVolumeOff} 
          className={classNames("tab-checkbox__btn", "tab-checkbox__btn--mute" , {
            "tab-checkbox__btn--enabled": props.tab.mutedInfo.muted
          })}
          onClick={() => props.dispatch(muteTabRequest(props.tab.id, !props.tab.mutedInfo.muted))}
        />
      </div>
);


export default connect()(TabCheckbox);
