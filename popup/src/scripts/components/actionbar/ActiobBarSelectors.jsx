export const getTabCounter = ({ tabs }, id) => 
  tabs.filter(({ windowId }) => id === windowId).length;

export const getCheckedTabsInWindow = (checkedTabs, props) => 
  [ ...checkedTabs.filter(({ windowId }) => windowId === props.windowId).map(({ id }) => id)];

export const isEditModeEnabled = ({ checkedTabs }, props) => 
  checkedTabs.some(({ windowId }) => windowId === props.windowId);

export const getTabIdsInWindow = props => 
  props.windows.find(({ windowId }) => windowId === props.windowId).tabs.map(({ id }) => id);

export const isWindowChecked = ({ checkedTabs }, props) => 
  props.windows.find(({ windowId }) => windowId === props.windowId).tabs.length <= getCheckedTabsInWindow(checkedTabs, props).length;

export const getBookmarksData = ({ checkedTabs }, props) => 
  props.windows.find(({ windowId }) => windowId === props.windowId).tabs
    .filter(({ id }) => getCheckedTabsInWindow(checkedTabs, props).includes(id))
    .map(({ title, url }) => ({ title, url }));

export const isWindowPinned = ({ checkedTabs }, props) => 
  props.windows.find(({ windowId }) => windowId === props.windowId).tabs
    .filter(({ id }) => getCheckedTabsInWindow(checkedTabs, props).includes(id))
    .every(({ pinned }) => pinned);