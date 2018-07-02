'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = exports.dance = undefined;

var _reactNative = require('react-native');

// eslint-disable-line import/no-unresolved, max-len

let appStateTimeout;
let previousLinkingCallback;
let previousAppStateCallback;

const cleanup = () => {
  clearTimeout(appStateTimeout);

  if (previousLinkingCallback) {
    _reactNative.Linking.removeEventListener('url', previousLinkingCallback);
    previousLinkingCallback = null;
  }

  if (previousAppStateCallback) {
    _reactNative.AppState.removeEventListener('change', previousAppStateCallback);
    previousAppStateCallback = null;
  }
};

const dance = exports.dance = authUrl => {
  cleanup();

  return _reactNative.Linking.openURL(authUrl).then(() => new Promise((resolve, reject) => {
    const handleUrl = url => {
      if (!url || url.indexOf('fail') > -1) {
        reject(url);
      } else {
        resolve(url);
      }
    };

    const linkingCallback = ({ url }) => {
      cleanup();
      handleUrl(url);
    };

    _reactNative.Linking.addEventListener('url', linkingCallback);
    previousLinkingCallback = linkingCallback;

    const appStateCallback = ({ state }) => {
      // Give time for Linking event to fire.
      appStateTimeout = setTimeout(() => {
        if (state === 'active') {
          cleanup();
          reject('cancelled');
        }
      }, 100);
    };

    _reactNative.AppState.addEventListener('change', appStateCallback);
    previousAppStateCallback = appStateCallback;
  }));
};

const request = exports.request = fetch;