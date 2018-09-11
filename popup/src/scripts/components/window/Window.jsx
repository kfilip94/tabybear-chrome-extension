import React from 'react';
import ActionBar from 'actionbar/ActionBarContainer';
import WindowTabList from './WindowTabList';

const Window = props => {
  const { windowId, windows } = props;
  return (
    <div className="window">
      <ActionBar 
        windowId={windowId}
        windows={windows}
      />
      <WindowTabList {...props} />
      <button
        className="window__new-tab"
        onClick={() => props.createTab(props.windowId)}
        type="button"
      >
        + Open new tab
      </button>
    </div>
  );
};

export default Window;