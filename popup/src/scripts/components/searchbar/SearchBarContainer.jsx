import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { clearTextFilter, setTextFilter } from 'reducers/filters';
import { uncheckAll } from 'reducers/checkedTabs';

const SearchBarContainer = props => (
  <SearchBar {...props} />
);

const mapDispatchToProps = dispatch => ({
  clearSelection: () => { dispatch(uncheckAll()) },
  clearTextFilter: () => { dispatch(clearTextFilter()) },
  setTextFilter: (filterText) => { dispatch(setTextFilter(filterText)) },
});

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer);
