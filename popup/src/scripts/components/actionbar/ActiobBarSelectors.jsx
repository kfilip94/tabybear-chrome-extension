export const getTabCounter = ({ tabs }, id) => {
  try {
    return tabs.filter(({ windowId }) => id === windowId).length;
  } catch(error) {
    return 0;
  }
};

export const getCheckedTabsInWindow = (checkedTabs, props) => {
  return [ ...checkedTabs.filter(({ windowId }) => windowId === props.windowId).map(({ id }) => id)];
};

export const isEditModeEnabled = ({ checkedTabs }, props) => {
  return checkedTabs.some(({ windowId }) => windowId === props.windowId);
};

export const getTabIdsInWindow = props => {
  try {
    // console.log('getTabIdsInWindow:',props.windows.find(({ windowId }) => windowId === props.windowId).tabs.map(({ id }) => id));
    return props.windows.find(({ windowId }) => windowId === props.windowId).tabs.map(({ id }) => id);
  } catch(error) {
    return [];
  }
};

export const isWindowChecked = ({ checkedTabs }, props) => {
  try {
    console.log('props.windows.find(({ windowId }) => windowId = props.windowId).tabs.length:',props.windows.find(({ windowId }) => windowId === props.windowId).tabs.length);
    console.log('getCheckedTabsInWindow(checkedTabs, props).length:',getCheckedTabsInWindow(checkedTabs, props).length);
    return props.windows.find(({ windowId }) => windowId === props.windowId).tabs.length <= getCheckedTabsInWindow(checkedTabs, props).length;
  } catch(error) {
    return false;
  }
};

export const getBookmarksData = ({ checkedTabs }, props) => {
  try {
    return props.windows.find(({ windowId }) => windowId === props.windowId).tabs
      .filter(({id}) => getCheckedTabsInWindow(checkedTabs, props).includes(id))
      .map(({ title, url }) => ({ title, url }));
  } catch(error) {
    return [];
  }
}

export const isWindowPinned = ({ checkedTabs }, props) => {
  try {
    return props.windows.find(({ windowId }) => windowId === props.windowId).tabs
      .filter(({ id }) => getCheckedTabsInWindow(checkedTabs, props).includes(id))
      .every(({ pinned }) => pinned);
  } catch(error) {
    return false;
  };
};