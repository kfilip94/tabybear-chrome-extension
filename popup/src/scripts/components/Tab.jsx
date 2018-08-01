import React from 'react';
import classNames from 'classnames'
import { connect } from 'react-redux';
import { removeTab, clearActive, updateTab } from '../actions/tabs';
import { setTabActive, closeTab } from '../chrome-services/tabs';
import TabCheckbox from './TabCheckbox';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

const Tab = (props) => /*{
  let tabTitleClass = classNames("tab__title" , {
    "tab__bold": props.tab.active
  });
  return*/ (
    <div className="tab">
      <TabCheckbox tab={props.tab}/>
      <span 
        className={classNames("tab__title" , {
          "tab__title--bold": props.tab.active
        })}
        onClick={() => 
          setTabActive(props.tab.id, (updatedTab) => {
            console.log('active!');
            props.dispatch(clearActive(props.tab.windowId));
            props.dispatch(updateTab(props.tab.id, updatedTab));
          })
      }
        title={props.tab.title}
      >
        {props.tab.title}
      </span>
      <Button 
        className="button button--small tab__close"
        icon={faTimes}
        handleClick={() => closeTab(props.tab.id, () => props.dispatch(removeTab(props.tab.id)))}
      />
    </div>
  );
//};


export default connect()(Tab);