import React from 'react';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../button/Button';

const Searchbar = ({ clearSelection, filters, setTextFilter }) => (
  <div className="searchbar">
		<FontAwesomeIcon 
			className="searchbar__icon"
			icon={faSearch}
		/>
    <input 
      type="text" 
      className="searchbar__input"
      placeholder="Type search..."
      value={filters.text}
      onChange={(e) => {
        setTextFilter(e.target.value);
        clearSelection();
      }}
    />
    { filters.text &&
      (
        <Button 
          className="button button--small"
          title="Clear"
          icon={faTimesCircle}
          handleClick={() => setTextFilter("")}
        />
      )
    }
  </div>
);

export default Searchbar;
