import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faVolumeOff, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { updateTab } from '../actions/tabs';
import { pinTab, muteTab } from '../chrome-services/tabs';
import { checkTab, uncheckTab } from '../actions/checkedTabs';

class TabCheckbox extends React.Component {

  render() {
    return (
      <div className="tab-checkbox">
        {!this.props.isChecked ? 
          <img 
            src={this.props.tab.favIconUrl} 
            className="tab-checkbox__favicon"
            onClick={() => this.props.dispatch(checkTab(this.props.tab.id))}
          />
          :
          <FontAwesomeIcon 
            icon={faCheckCircle} 
            className="tab-checkbox__favicon"
            onClick={() => this.props.dispatch(uncheckTab(this.props.tab.id))}
          />
        }
        <FontAwesomeIcon 
          icon={faThumbtack} 
          className={classNames("tab-checkbox__btn", "tab-checkbox__btn--pin" , {
            "tab-checkbox__btn--enabled": this.props.tab.pinned
          })}
          onClick={() => {
            console.log('props.tab.id:', this.props.tab.id,' ,props.tab.pinned:', this.props.tab.pinned);
            pinTab(this.props.tab.id, this.props.tab.pinned, (updatedTab) => this.props.dispatch(updateTab(this.props.tab.id, updatedTab)));
          }}
        />
        <FontAwesomeIcon 
          icon={faVolumeOff} 
          className={classNames("tab-checkbox__btn", "tab-checkbox__btn--mute" , {
            "tab-checkbox__btn--enabled": this.props.tab.mutedInfo.muted
          })}
          onClick={() => 
            muteTab(this.props.tab.id, this.props.tab.mutedInfo.muted, (updatedTab) => this.props.dispatch(updateTab(this.props.tab.id, updatedTab)))
          }
        />
      </div>
        );
      };
};

export default connect()(TabCheckbox);
