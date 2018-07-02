'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tumblr = exports.twitter = exports.facebook = exports.google = undefined;

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _login = require('./lib/login');

var _login2 = _interopRequireDefault(_login);

var _reactNative = require('./lib/platforms/react-native');

var platform = _interopRequireWildcard(_reactNative);

var _google2 = require('./lib/providers/google');

var _google = _interopRequireWildcard(_google2);

var _facebook2 = require('./lib/providers/facebook');

var _facebook = _interopRequireWildcard(_facebook2);

var _twitter2 = require('./lib/providers/twitter');

var _twitter = _interopRequireWildcard(_twitter2);

var _tumblr2 = require('./lib/providers/tumblr');

var _tumblr = _interopRequireWildcard(_tumblr2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const google = exports.google = (0, _login2.default)(_google, platform); /**
                                                                          * Login with various social API's.
                                                                          * Including: Google, Twitter, Facebook, Instagram, Tumblr & LinkedIn.
                                                                          */

const facebook = exports.facebook = (0, _login2.default)(_facebook, platform);
const twitter = exports.twitter = (0, _login2.default)(_twitter, platform);
const tumblr = exports.tumblr = (0, _login2.default)(_tumblr, platform);

exports.default = (0, _login2.default)(_2.default, platform);