import React from 'react';
import classNames from 'classnames';

const titleClassNames = (isActive, isChecked) => 
  classNames("tab__title" , {
    "tab__title--bold": isActive,
    "tab__title--checked": isChecked
  });

const TabTitle = props => {
  const { isChecked, handleClick, tab: { active, title } } = props;
  
  return (
    <span 
      className={titleClassNames(active, isChecked)}
      onClick={handleClick}
      title={title}
    >
      {title}
    </span>
  );
};

export default TabTitle;