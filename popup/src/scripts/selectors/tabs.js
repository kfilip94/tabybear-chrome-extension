export default(windows, { text }) => {
  const filteredWindows = windows
  .filter((chromeWindow) => 
    chromeWindow.tabs.some((tab) => tab.title.toLowerCase().includes(text.toLowerCase())
  ))
  .map(chromeWindow => {
    let newWindow = Object.assign({}, chromeWindow,
      {
        'tabs': chromeWindow.tabs.filter((tab) => 
          tab.title.toLowerCase().includes(text.toLowerCase()))
      }
    );
    return newWindow;
  });
  
  console.log('filtered: ',filteredWindows);
  return filteredWindows;
};
