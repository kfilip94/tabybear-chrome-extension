import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters'

const Searchbar = (props) => (
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
      onChange={(e) => props.dispatch(setTextFilter(e.target.value))}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
};

export default connect(mapStateToProps)(Searchbar);
