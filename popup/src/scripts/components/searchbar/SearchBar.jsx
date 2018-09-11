import React from 'react';
import PropTypes from 'prop-types';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FontAwesomeButton from 'button/FontAwesomeButton';

const Searchbar = ({ clearSelection, filters: { text }, setTextFilter }) => (
  <div className="searchbar">
		<FontAwesomeIcon
		  className="searchbar__icon"
			icon={faSearch}
		/>
    <input 
      type="text" 
      className="searchbar__input"
      placeholder="Type search..."
      value={text}
      onChange={(e) => {
        setTextFilter(e.target.value);
        clearSelection();
      }}
    />
    {text &&
      (
        <FontAwesomeButton 
          className="button button--small"
          title="Clear"
          icon={faTimesCircle}
          handleClick={() => setTextFilter("")}
        />
      )
    }
  </div>
);

Searchbar.propTypes = {
  clearSelection: PropTypes.func.isRequired,
  filters: PropTypes.shape({ text: PropTypes.string }),
  setTextFilter: PropTypes.func.isRequired,
};

Searchbar.defaultProps = {
  filters: { text: '' },
};

export default Searchbar;
