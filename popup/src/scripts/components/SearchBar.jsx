import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { setTextFilter } from '../../../../event/src/reducers/filters';
import { uncheckAll } from '../../../../event/src/reducers/checkedTabs';

const Searchbar = props => (
  <div className="searchbar">
		<FontAwesomeIcon 
			className="searchbar__icon" 
			icon={faSearch} 
		/>
    <input 
      type="text"
      className="searchbar__input"
      placeholder="Type search..."
      value={props.filters.text}
      onChange={(e) => {
        props.setTextFilter(e.target.value);
        props.clearSelection();
      }}
    />
    { props.filters.text &&
      <Button 
        className="button button--small"
        title="Clear"
        icon={faTimesCircle}
        handleClick={() => props.setTextFilter("")}
      />
    }
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    clearSelection: () => { dispatch(uncheckAll()) },
    setTextFilter: (filterText) => { dispatch(setTextFilter(filterText)) },
  };
};

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
