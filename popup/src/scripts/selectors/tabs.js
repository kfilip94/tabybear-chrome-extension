export default(windows, { text }) => {
  return windows.filter((chromeWindow) => 
    chromeWindow.tabs && chromeWindow.tabs.some((tab) => tab.title.toLowerCase().includes(text.toLowerCase())
  ))
  .map(chromeWindow => {
    let newWindow = Object.assign({}, chromeWindow,
      {
        'tabs': chromeWindow.tabs.filter((tab) => 
          tab.title && tab.title.toLowerCase().includes(text.toLowerCase()))
          .sort((tabOne, tabTwo) => tabOne.index > tabTwo.index ? 1 : -1)
      }
    );
    return newWindow;
  });
};
 