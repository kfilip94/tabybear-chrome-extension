# Tabybear
![](https://image.ibb.co/h07V29/logo_Beta200.png)

Tabybear is a Google Chrome extension which helps you to manage your browser tabs.

IMPORTANT! It's not released yet, still in development

## Getting Started

Tabybear is built with React and Redux, project use also Webpack and Gulp

### Building project

To build project:
```
yarn start
```

This'll create folder "build" needed to run extension in your browser

### Installing in Chrome browser

To run extension in your browser, you need load "build" folder:

1. Type path below into browser URL bar:

    ```
    chrome://extensions
    ```
2. Remember to enable "Developer mode:
   
    ![](https://image.ibb.co/dnTHFU/Screenshot_from_2018_09_12_11_59_59.png) 

3. Click "Load unpacked" and select "build" folder in your project.

4. Now Tabybear is running in your browser!
   
    ![](https://image.ibb.co/mPkm9p/Screenshot_from_2018_09_12_12_14_34.png)


## Features

Tabybear has a lot of features which make web browsing much easier.

### One handy view

Switch between tabs by clicking on them - all tabs are grouped by windows in one scrollable view.

![](https://image.ibb.co/m89tN9/Screenshot_from_2018_09_12_12_53_18.png)

### Know how many tabs you are actually opened

Tabybear counts all opened tabs in windows and in the browser.

![](https://image.ibb.co/k309ep/Screenshot_from_2018_09_12_13_00_31.png)  ![](https://image.ibb.co/d2SBs9/Screenshot_from_2018_09_12_14_07_46.png)


### Pin, save and remove multiple tabs

You can select multiple tabs and pin them, save them as bookmarks or remove them.

![](https://image.ibb.co/jx4UUp/Screenshot_from_2018_09_12_12_47_38.png)

### Search tab by title

Find tabs by typing a part or whole tab name phrase.

![](https://image.ibb.co/gLPch9/Screenshot_from_2018_09_12_12_51_07.png)

### Move your tabs

Move your tabs to the new position in a window or even between windows - just simple drag and drop them.


## Architecture

Tabybear is built mainly with ReactJS framework and Redux library, however specific architecture of Chrome extensions
force few changes in project structure.
Brief, chrome extensions consist of three basic types of script files:

* popup script - contain ordinary HTML pages with JavaScript logic and optionally CSS style sheets,  
* background script - persistent JavaScript page where Redux store is located and chrome event listeners are running,
* content script - content scripts read and modify the DOM of web pages the browser visits (not used here),

According to this pattern, there's three React project's: popup, event, and options.

  + **popup**: is scrollable list of tabs with other UI Components which user can see and can interact with. 
Contains react components and style files,
  +  **event**: here live Redux store with actions and reducers, chrome event listeners and chrome API promises
  + **options**: UI page used to show extension settings (fires after clicking on 'cog' button in popup)

MORE ABOUT ARCHITECTURE SOON


## Author

* **Kamil Filip** - [@kfilip](https://gitlab.com/kfilip)