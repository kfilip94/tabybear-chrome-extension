import React from 'react';
import classNames from 'classnames';
import TabCheckbox from './TabCheckbox';
import Button from './Button';
import { connect } from 'react-redux';
import { removeTabRequest, setTabActiveRequest, clearActive } from '../actions/tabs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const titleClassNames = (isActive, isChecked) => 
  classNames("tab__title" , {
    "tab__title--bold": isActive,
    "tab__title--checked": isChecked
  });

const TabTitle = (props) => (
  <span 
    className={titleClassNames(props.tab.active, props.isChecked)}
    onClick={props.handleClick}
    title={props.tab.title}
  >
    {props.tab.title}
  </span>
);

export default TabTitle;