import React from 'react';
import { render} from 'react-dom';
import { Store } from 'react-chrome-redux';
import { Provider } from 'react-redux';
import App from './components/app/AppContainer';

import '../styles/style.scss';

const proxyStore = new Store({
  portName: 'tabsManageStore'
});

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}><App/></Provider>, document.getElementById('app')
  );
});

