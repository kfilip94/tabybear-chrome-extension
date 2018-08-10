export const getAllWindowsPromise = () => new Promise(resolve =>
  chrome.windows.getAll({ populate: true }, (windows) => 
    resolve(windows)
  )
);
  
export const removeWindowPromise = (windowId) => new Promise(resolve =>
  chrome.windows.remove(windowId, () => resolve())
);

// export const createWindowPromise = () => new Promise(resolve =>
//   chrome.windows.create(null, (newWindow) => {
//     chrome.tabs.query({ windowId: newWindow.id }, (tabsInWindow) => {
//       // console.log('newWindow:',{...newWindow, tabs: tabsInWindow});
//       // callback({...newWindow, tabs: tabsInWindow});
//     });
//   });
// );
