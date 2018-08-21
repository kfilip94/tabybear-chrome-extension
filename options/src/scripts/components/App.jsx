import React from 'react';
import * as storage from '../../../../shared/storage/localStorageApi';

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
      });
  };

  render() {
    return (
      <div className="options">
        <div className="options__wrapper">
          <span className="options__label">Open new tab at:</span>
          <input 
            type="text" 
            className="options__item options__item--input"
            value={this.state.newTabUrl}
            onChange={(e) => 
              storage.setNewTabUrlSetting(e.target.value)
                .then((newTabUrl) => this.setState(() => ({ newTabUrl })))
            } 
          />
        </div>
        <div className="options__wrapper">
          <span className="options__label">Folder where new bookmarks are saving:</span>
          <div className="select__wrapper">
            <select 
              className="options__item options__item--select"
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
        </div>
      </div>
    );
  }
}

export default App;
