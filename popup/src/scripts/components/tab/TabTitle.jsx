import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const titleClassNames = (isActive, isChecked) => 
  classNames("tab__title" , {
    "tab__title--bold": isActive,
    "tab__title--checked": isChecked
  });

const TabTitle = props => {
  const { isChecked, handleClick, active, title = '' } = props;
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

TabTitle.propTypes = {
  isChecked: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  title: PropTypes.string
};

TabTitle.defaultProps = {
  isChecked: false,
  active: false,
  title: ''
};

export default TabTitle;