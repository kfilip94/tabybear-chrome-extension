import React from 'react';
import classNames from 'classnames';

const titleClassNames = (isActive, isChecked) => 
  classNames("tab__title" , {
    "tab__title--bold": isActive,
    "tab__title--checked": isChecked
  });

const TabTitle = props => (
  <span 
    className={titleClassNames(props.tab.active, props.isChecked)}
    onClick={props.handleClick}
    title={props.tab.title}
  >
    {props.tab.title}
  </span>
);

export default TabTitle;