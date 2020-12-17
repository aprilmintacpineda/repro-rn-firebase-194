# Reproducible demo for react-native-firebase issue #194

https://github.com/zoontek/react-native-bootsplash/issues/194

# Getting started

1. Clone repo
2. Create firebase project
3. Add Android and iOS app on that project
4. Download the `Google-Services.plist` and `google-services.js` files.
5. Replace the `ios/Google-Services.plist` and `android/app/google-services.js` files with the ones you downloaded respectively.
6. cd to the clone repo.
7. run `yarn install-all` which will do `yarn install && cd ios && pod install && cd ..`
8. run `yarn start`
8. Open XCode, and run the app on a real iphone device.
9. Run the app on an android emulator or a real android device.
10. Send notification while the app is on the foreground, you'll notice console logs when the device has received the notif.
11. Send notification while the app is on killed state, you'll see notifications on the status bar of the device.
12. Tap on the notification,

expectation is that `onNotificationOpened` will be called, but it won't be called.

# Work around

use `messaging().getInitialNotification`.

[Checkout diff](https://github.com/aprilmintacpineda/repro-rn-firebase-194/commit/a2665b462ff6657764254b5f795989c5730cb200)