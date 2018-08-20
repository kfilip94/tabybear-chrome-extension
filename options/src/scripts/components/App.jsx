import React from 'react';
import * as storage from '../storage/localStorageApi';

class App extends React.Component {
  state = {
    newTabUrl: '',
    newBookmarkFolderId: '0',
    bookmarkFolders: undefined
  };

  componentDidMount() {
    console.log('component did mount!');
    storage.getBookmarksTree()
      .then((bookmarkFolders) => 
        this.setState(() =>
          ({ bookmarkFolders }))
        );

    storage.getSettings()
      .then((settings) => {
        this.setState(() => ({
            newTabUrl: settings.newTabUrl,
            newBookmarkFolderId: settings.newBookmarkFolderId
        }));
      })
  };

  render() {
    return (
      <div>
        <input 
          type="text" value={this.state.newTabUrl}
          onChange={(e) => 
            storage.setNewTabUrlSetting(e.target.value)
              .then((newTabUrl) => this.setState(() => ({ newTabUrl })))
          } 
        />
        <select 
          onChange={(e) => 
            storage.setBookmarksFolderId(e.target.value)
              .then((newBookmarkFolderId) => this.setState(() => ({ newBookmarkFolderId })))
          } 
          value={ this.state.newBookmarkFolderId }
        >
          {
           this.state.bookmarkFolders && 
           this.state.bookmarkFolders.map(({id, title}) => 
            <option value={id} >{title}</option>
          )}
        </select>
      </div>
    );
  }
}

export default App;
