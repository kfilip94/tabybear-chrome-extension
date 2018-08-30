import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import Button from './Button';
import { clearSelection } from '../actions/checkedTabs';

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
      onChange={(e) => {
        props.dispatch(setTextFilter(e.target.value));
        props.dispatch(clearSelection())
      }}
    />
    { props.filters.text &&
      <Button 
        className="button button--small"
        title="Clear"
        icon={faTimesCircle}
        handleClick={() => props.dispatch(setTextFilter())}
      />
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
};

export default connect(mapStateToProps)(Searchbar);
