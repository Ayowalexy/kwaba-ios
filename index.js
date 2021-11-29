import React, {useEffect, useState} from 'react';
import {AppRegistry, Platform} from 'react-native';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);

//AppRegistry.registerComponent(appName, () => App);
