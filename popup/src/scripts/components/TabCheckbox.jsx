import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faVolumeOff, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { updateTab } from '../actions/tabs';
import { pinTab, muteTab } from '../chrome-services/tabs';
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
          onClick={() => {
            console.log('props.tab.id:', props.tab.id,' ,props.tab.pinned:', props.tab.pinned);
            // pinTab(props.tab.id, props.tab.pinned, (updatedTab) => props.dispatch(updateTab(props.tab.id, updatedTab)));
          }}
        />
        <FontAwesomeIcon 
          icon={faVolumeOff} 
          className={classNames("tab-checkbox__btn", "tab-checkbox__btn--mute" , {
            "tab-checkbox__btn--enabled": props.tab.mutedInfo.muted
          })}
          onClick={() => 
            muteTab(props.tab.id, props.tab.mutedInfo.muted, (updatedTab) => props.dispatch(updateTab(props.tab.id, updatedTab)))
          }
        />
      </div>
);


export default connect()(TabCheckbox);
