import React, { useEffect, useState } from 'react';
import { AppRegistry, Platform, View, Text, Dimensions } from 'react-native';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { ToastProvider } from 'react-native-toast-notifications'
import PushNotification from 'react-native-push-notification';
import { COLORS } from './util';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

const Root = () => (
  <Provider store={store}>
    <ToastProvider
      renderToast={(options) => {
        console.log(options)
        return (
          <View
            style={{
              width: Dimensions.get('window').width - 40,
              height: 50,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1e591d',

            }}
          >
            <Text 
              style={{
                color: COLORS.white,
                fontFamily: 'CircularStd'
              }}
            >
              {options?.message}
            </Text>
          </View>
        )
      }}
    >
      <App />
    </ToastProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);

//AppRegistry.registerComponent(appName, () => App);
