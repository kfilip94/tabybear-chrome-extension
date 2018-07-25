import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Searchbar = () => (
  <div className="searchbar">
		<FontAwesomeIcon 
			className="searchbar__icon" 
			icon={faSearch} 
		/>
    <input 
      type="text"
      className="searchbar__input"
    	placeholder="Type search..."
    />
  </div>
);

export default Searchbar;
