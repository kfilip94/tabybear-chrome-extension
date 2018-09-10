import React from 'react';
import App from './App';
import * as storage from '../../../../shared/storage/localStorageApi';

class AppContainer extends React.Component {
  state = {
    newTabUrl: '',
    newBookmarkFolderId: '0',
    bookmarkFolders: undefined
  };

  componentDidMount() {
    storage.getBookmarksTree()
      .then(bookmarkFolders => 
        this.setState(() => ({ bookmarkFolders }))
      );

    storage.getSettings()
      .then(({ newTabUrl, newBookmarkFolderId }) => 
        this.setState(() => ({ newTabUrl, newBookmarkFolderId })));
  };

  handleUrlChange = url => {
    storage.setNewTabUrlSetting(url)
      .then(newTabUrl => this.setState(() => ({ newTabUrl })))
  };

  handleBookmarkFolderChange = id => {
    storage.setBookmarksFolderId(id)
      .then(newBookmarkFolderId => this.setState(() => ({ newBookmarkFolderId })))
  };

  render() {
    return (
      <App 
        state={this.state}
        handleBookmarkFolderChange={this.handleBookmarkFolderChange}
        handleUrlChange={this.handleUrlChange}
      />
    );
  };
};

export default AppContainer;
