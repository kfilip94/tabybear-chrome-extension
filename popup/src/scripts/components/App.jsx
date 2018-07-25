import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Searchbar from './SearchBar';
import Window from './Window'
import { setWindows } from '../actions/tabs';
import { openNewWindow, getAllWindows } from '../services/chrome-windows';

class App extends Component {

  componentDidMount() {
    console.log('componentDidMount!');
    getAllWindows((windows) => {
      this.setState({ windows });
      this.props.dispatch(setWindows({windows}));
    });
  }

  render() {
    return (
      <div className="app">
        <Navbar
          handleOpenNewWindow={() => openNewWindow((newWindow) => this.props.dispatch(addWindow(newWindow)))}
          handleOpenSettingsPage={() => console.log('open settings page')}
        />
        <Searchbar />
        <div className="window-list">
          {this.props.windows && this.props.windows.map(
            (chromeWindow, id) => (<Window key={ chromeWindow.id } tabs={chromeWindow.tabs} windowId={chromeWindow.id}/>)
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    windows: state.windows
  };
};

export default connect(mapStateToProps)(App);
