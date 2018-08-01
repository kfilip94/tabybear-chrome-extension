export default(windows, { text }) => {
  const filteredWindows = windows.filter((chromeWindow) => 
    chromeWindow.tabs.some((tab) => tab.title.toLowerCase().includes(text.toLowerCase())
  ))
  .map(chromeWindow => {
    let newWindow = Object.assign({}, chromeWindow,
      {
        'tabs': chromeWindow.tabs.filter((tab) => 
          tab.title.toLowerCase().includes(text.toLowerCase()))
          .sort((tabOne, tabTwo) => tabOne.index > tabTwo.index ? 1 : -1)
      }
    );
    return newWindow;
  });
  
  console.log('filtered: ',filteredWindows);
  return filteredWindows;
};
 