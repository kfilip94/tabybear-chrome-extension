import React from 'react';

const App = props => {
  const { handleBookmarkFolderChange, handleUrlChange, state: { bookmarkFolders, newBookmarkFolderId, newTabUrl } } = props;
    return (
      <div className="options">
        <div className="options__wrapper">
          <span className="options__label">Open new tab at:</span>
          <input 
            type="text" 
            className="options__item options__item--input"
            value={newTabUrl}
            onChange={(e) => handleUrlChange(e.target.value)} 
          />
        </div>
        <div className="options__wrapper">
          <span className="options__label">Folder where new bookmarks are saving:</span>
          <div className="select__wrapper">
            <select 
              className="options__item options__item--select"
              onChange={(e) => handleBookmarkFolderChange(e.target.value)} 
              value={newBookmarkFolderId}
            >
              {bookmarkFolders && bookmarkFolders.map(({ id, title }) => 
                (<option value={id}>{title}</option>)
              )}
            </select>
          </div>
        </div>
      </div>
    );
};

export default App;
