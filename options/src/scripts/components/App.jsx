import React from 'react';
import * as storage from '../../../../shared/storage/localStorageApi';

class App extends React.Component {
  state = {
    newTabUrl: '',
    newBookmarkFolderId: '0',
    bookmarkFolders: undefined
  };

  componentDidMount() {
    storage.getBookmarksTree()
      .then((bookmarkFolders) => 
        this.setState(() => ({ bookmarkFolders }))
      );

    storage.getSettings()
      .then(({newTabUrl, newBookmarkFolderId}) => {
        if(newTabUrl && newBookmarkFolderId)
          this.setState(() => ({ newTabUrl, newBookmarkFolderId }))
        else {
          storage.restoreDefaultSettings()
          .then(({ newTabUrl, newBookmarkFolderId }) => {
            this.setState(() => ({ newTabUrl, newBookmarkFolderId }));
          })
        }
      });
  };

  handleUrlChange = (url) => {
    storage.setNewTabUrlSetting(url)
      .then((newTabUrl) => this.setState(() => ({ newTabUrl })))
  };

  handleBookmarkFolderChange = (id) => {
    storage.setBookmarksFolderId(id)
      .then((newBookmarkFolderId) => this.setState(() => ({ newBookmarkFolderId })))
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
            onChange={(e) => this.handleUrlChange(e.target.value)} 
          />
        </div>
        <div className="options__wrapper">
          <span className="options__label">Folder where new bookmarks are saving:</span>
          <div className="select__wrapper">
            <select 
              className="options__item options__item--select"
              onChange={(e) => this.handleBookmarkFolderChange(e.target.value)} 
              value={ this.state.newBookmarkFolderId }
            >
              { this.state.bookmarkFolders && this.state.bookmarkFolders.map(({id, title}) => 
                  <option value={id} >{title}</option>
              )}
            </select>
          </div>
        </div>
      </div>
    );
  };
};

export default App;
