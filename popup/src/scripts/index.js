import React from 'react';
import {render} from 'react-dom';

import App from './components/App';

import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux';
import '../styles/style.scss';

const proxyStore = new Store({
  portName: 'tabsManageStore'
});

console.log(proxyStore);

proxyStore.ready().then(() => {
  render(
     <Provider store={proxyStore}><App /></Provider>
    ,document.getElementById('app'));
});

