import React from 'react';
import { Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import iid from '@react-native-firebase/iid';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('setBackgroundMessageHandler', remoteMessage);
});

function App () {
  React.useEffect(() => {
    (async () => {
      const token = await iid().getToken();
      console.log('token', token);

      const clickedNotif = await messaging().getInitialNotification();
      console.log('clickedNotif', clickedNotif);

      const authStatus = await messaging().requestPermission();
      const wasAllowed = (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );

      if (!wasAllowed) return;

      const subscribers = [
        messaging().onMessage(async remoteMessage => {
          console.log('onMessage', remoteMessage);
        }),

        messaging().onNotificationOpenedApp(async remoteMessage => {
          console.log('onNotificationOpenedApp', remoteMessage);
        }),

        messaging().onTokenRefresh(async token => {
          console.log('onTokenRefresh', token);
        })
      ];

      return () => {
        subscribers.forEach(unsubscribeCallback => {
          if (unsubscribeCallback) unsubscribeCallback();
        });
      };
    })();
  }, []);

  return <Text>App</Text>;
}

export default React.memo(App);
