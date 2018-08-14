import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Searchbar from './SearchBar';
import Window from './Window'
import { setWindowsRequest, createWindowRequest  } from '../actions/windows';
import selectTabs from '../selectors/tabs';

class App extends Component {
  componentDidMount() {
    console.log('component did mount!');
    this.props.dispatch(setWindowsRequest());
    chrome.windows.getAll({ populate: true }, (windows) => {
      console.log('what i have here:',windows);
    });
  }

  render() {
    console.log('this props windows', this.props.windows);
    return (
      <div className='app'>
        <Navbar
          handleOpenNewWindow={() => this.props.dispatch(createWindowRequest())}
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
