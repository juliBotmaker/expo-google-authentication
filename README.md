# Expo Google Authentication

Expo module that allows you to use native iOS and Android libraries to provide sign-in with Google functionality in an Expo application.

**When should I use this?**

Use this library if you want your Expo React Native application to be able to use native Google OAuth 2.0 sdks to login your users. This library provides the native APIs to login only. It does not provide UI components.

## Package Installation

### Add the package to your npm dependencies

```
npm install expo-google-authentication
```

### Configure for Android

The only configuration needed for Android is to pass your OAuth Web ClientID from the Google Developer Console into the `ExpoGoogleAuthentication.configure()` method. See the `usage` section for additional details.

Documentation on creating your Android and Web ClientID can be found under the "Setup your Google APIs console project" here: https://developer.android.com/identity/sign-in/credential-manager-siwg.

### Configure for iOS

Run `npx pod-install` after installing the npm package. For iOS you'll also need to edit your 'Info.plist`file and add the following. Make sure there is only one instance of`CFBundleURLTypes`.

```
<key>GIDClientID</key>
<string>Your iOS clientID from the Google Developer Console</string>
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>Your reversed iOS ClientID from the Google Developer Console</string>
    </array>
  </dict>
</array>
<key>GIDServerClientID</key>
<string>Your Web OAuth ClientID from the Google Developer Console</string>
```

Official Google Documentation: https://developers.google.com/identity/sign-in/ios/start-integrating

## Usage

```
import * as ExpoGoogleAuthentication from 'expo-google-authentication';
```

### API

#### Methods

- `ExpoGoogleAuthentication.configure(props: ExpoGoogleAuthenticationConfigureProps): void`: This method allows you to set runtime configuration.
- `ExpoGoogleAuthentication.login(): Promise<ExpoGoogleAuthenticationLoginResponse>`: You should call this method when there is user intent to login to your application using Google. For example, from a login button. Use either this method **or** `ExpoGoogleAuthentication.loginWithUserIntent()`. On Android, this login method shows a modal and allows a user to add a Google account or re-authenticate. On iOS there is no difference between this method and `ExpoGoogleAuthentication.loginWithUserIntent()`.
- `ExpoGoogleAuthentication.loginWithoutUserIntent(): Promise<ExpoGoogleAuthenticationLoginResponse>`: An alternate method to `ExpoGoogleAuthentication.login()`. On Android there are two different login flows. The first is `ExpoGoogleAuthentication.login()` which is a UX flow when the user has shown intent to login to your application using Google. The second is `ExpoGoogleAuthentication.loginWithoutUserIntent()` which is a UX flow when the user has not expressed intent. For example, you might trigger this when your application starts. This flow shows a bottomsheet that does not allow a user to add or re-authenticate their Google account because it would be more confusing to the user. On iOS there is no difference between this method on `ExpoGoogleAuthentication.loginWithUserIntent()`.
- `ExpoGoogleAuthentication.logout()`: Logs the user out of your application. This only clears the native state. You must clear any application state separately.

#### Types

```
export type ExpoGoogleAuthenticationConfigureProps = {
  webClientId: string;        // Web client ID from Google Cloud Console.
  profileImageSize?: number;  // Size of the profile image in pixels to request from Google.
};

export type ExpoGoogleAuthenticationLoginResponse = {
  displayName?: string;         // Full name of the user.
  familyName?: string;          // Last name of the user.
  givenName?: string;           // First name of the user.
  email?: string;               // Email. Only available on iOS.
  id?: string;                  // UserID. Email on Android, ID on iOS.
  idToken: string;              // ID token from Google to verify on your server.
  phoneNumber?: string;         // Phone number. May not be available.
  profilePictureUri?: string;   // URL for the user's profile picture.
};
```

#### Constants

```
export const ExpoGoogleAuthenticationStatusCodes = {
  LOGIN_CANCELED: "ERR_CANCELED",
  NO_CREDENTIALS: "ERR_NO_CRED",
  NO_PLAY_SERVICES: "ERR_INVALID_ENVIRONMENT",
  BAD_INPUT: "ERR_BAD_INPUT",
  UNKNOWN_ERROR: "ERR_FAIL",
  INVALID_CREDENTIALS: "ERR_CRED",
  LOGOUT_FAILED: "ERR_LOGOUT_FAILED",
  UNSUPPORTED_PLATFORM: "ERR_UNSUPPORTED_PLATFORM",
};

```

#### Error handling

`ExpoGoogleAuthentication.login()` and `ExpoGoogleAuthentication.loginWithoutUserIntent()` return a `Promise`. If the `Promise` is rejected then you will receive an error with two properties:

- `code`: This is a key of the `ExpoGoogleAuthenticationStatusCodes` dictionary.
- `message`: This is a human readable message that describes the error.

```
try {
  const loginDataResponse = await ExpoGogoleAuthentication.login();
} catch (err) {
  switch (err.code) {
    case ExpoGoogleAuthenticationStatusCodes.LOGIN_CANCELED:
      // User closed the login modal.
      break;
    default:
      // Unknown error.
  }
}
```

#### Example

This repository contains a working example showing API usage: https://github.com/heartbotai/expo-google-authentication/blob/main/example/App.tsx

### iOS

For iOS you must add dependencies and configuration parameters to your iOS project. Apple documentation can be found here: https://developers.google.com/identity/sign-in/ios/start-integrating.

## Development Instructions

These instructions are for if you could like to contribute to this package. Clone the repository to your local. Enter the directory where you cloned the repository. Run:

```
npm ci
cd example
npm ci
```

## Release process

Before pushing code you should run the following commands:

```
npm run lint
npm run format
npm run test
```

Check-in any changes made.

### iOS Development

#### Setup

```
cd example
npx expo prebuild -p ios --clean
```

In `example/ios/ExpoGoogleAuthenticationExample/Info.plist` remove the following lines:

```
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.heartbot.googleauthentication.example</string>
    </array>
  </dict>
</array>
```

Then include the following:

```
<key>GIDClientID</key>
<string>Your iOS clientID from the Google Developer Console</string>
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>Your reversed iOS ClientID from the Google Developer Console</string>
    </array>
  </dict>
</array>
<key>GIDServerClientID</key>
<string>Your Web OAuth ClientID from the Google Developer Console</string>
```

#### Start app

```
cd example
npx expo run:ios
```

The above will start the example application in an iOS simulator. If you just installed XCode this may open an iPhone SE by default. You won't be able to see logs in this simulator. Open up a newer iPhone version simulator such as an iPhone 15 Pro simulator to see logs.

#### Debugging

In one terminal run the commands:

```
cd example
npx expo start
```

In another terminal run the commands:

```
cd example
npx expo prebuild
open -a "/Applications/Xcode.app/" ./ios
```

### Android Development

To run the example project use the following commands. Make sure that you have `$JAVA_HOME` set to your Android Studio JDK installation. As of writing, on a Mac the location can be found at `export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jbr/Contents/Home`.

```
cd example
npx expo run:android
```

#### Testing end-to-end Google Signin

To test on a device your android OAuth 2.0 ClientIDs must have a SHA-1 certificate fingerprint that matches the build. To find your SHA-1 certificate fingerprint:

```
cd example/android
./gradlew signingreport
```

Look for the SHA1 fingerprint with `Variant: debug` and `Config: debug`. Fill out this info in the Google Cloud API & Services Credentials page. Run the project with the following commands:

```
cd example
npx expo run:android --variant=debug
```

#### Debugging

In one terminal run the command:

```
cd example
npx expo start
```

In another terminal run the command:

```
cd example
rm -r android
npx expo prebuild
open -a "/Applications/Android Studio.app" ./android
```

If you're using an Android device connected over USB then you need to run the following extra command. This needs to be run everytime you start debugging an app.

```
adb reverse tcp:8081 tcp:8081
```

In Android Studio select the 'debug app' icon. This is an icon that looks like a bug in the top bar of Android Studio.

To view Android logs run: `adb logcat | grep "ReactNative\|ExpoGoogleAuthenticationModule"`.

### Debugging Jest Unit Tests

#### VSCode

In the `expo-google-authentication` directory:

```
node --experimental-vm-modules --inspect-brk node_modules/.bin/jest
```

In VSCode debug with this launch configuration:

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Attach",
            "port": 9229
        }
    ]
}
```
