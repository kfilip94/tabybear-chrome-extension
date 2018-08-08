import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Searchbar from './SearchBar';
import Window from './Window'
import { setWindowsRequest  } from '../actions/windows';
import { openNewWindow } from '../chrome-services/windows';
import selectTabs from '../selectors/tabs';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(setWindowsRequest());
  }

  render() {
    console.log('this props windows', this.props.windows);
    return (
      <div className='app'>
        <Navbar
          handleOpenNewWindow={() => {
            openNewWindow((newWindow) => this.props.dispatch(addWindow(newWindow)));
          }}
          handleOpenSettingsPage={() => console.log('open settings page')}
        />
        <Searchbar />
        <div className="window-list">
          {this.props.windows && this.props.windows.map(
            (chromeWindow) => (<Window key={ chromeWindow.id } tabs={chromeWindow.tabs} windowId={chromeWindow.id}/>)
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    windows: selectTabs(state.windows, state.filters)
  };
};

export default connect(mapStateToProps)(App);
