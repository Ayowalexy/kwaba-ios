/**
 * @format
 */
import React, {useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';

{
  /* <Provider store={store}>
<App />
</Provider>, */
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);

//AppRegistry.registerComponent(appName, () => App);

//AppRegistry.registerComponent(appName, () => Point)
