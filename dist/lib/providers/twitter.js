'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identify = exports.authorize = undefined;

var _lensProp = require('ramda/src/lensProp');

var _lensProp2 = _interopRequireDefault(_lensProp);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _set = require('ramda/src/set');

var _set2 = _interopRequireDefault(_set);

var _invoker = require('ramda/src/invoker');

var _invoker2 = _interopRequireDefault(_invoker);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _partial = require('ramda/src/partial');

var _partial2 = _interopRequireDefault(_partial);

var _pipeP = require('ramda/src/pipeP');

var _pipeP2 = _interopRequireDefault(_pipeP);

var _oauth = require('../utils/oauth1');

var _uri = require('../utils/uri');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const REQUEST_TOKEN = 'https://api.twitter.com/oauth/request_token'; /* eslint camelcase: "off" */

const AUTH = 'https://api.twitter.com/oauth/authenticate';
const ACCESS_TOKEN = 'https://api.twitter.com/oauth/access_token';
const VERIFY_CREDENTIALS = 'https://api.twitter.com/1.1/account/verify_credentials.json';

const authorize = exports.authorize = ({ dance, request }, { appId, appSecret, callback }) => (0, _pipeP2.default)((0, _oauth.requestToken)(REQUEST_TOKEN), ({ oauth_token, oauth_token_secret }) => (0, _pipeP2.default)((0, _partial2.default)(dance, [`${ AUTH }?oauth_token=${ oauth_token }`]), _uri.fromQueryString, (0, _merge2.default)({ appId, appSecret, oauth_token_secret }), (0, _oauth.accessToken)(ACCESS_TOKEN, request), (0, _merge2.default)({ appId, appSecret }))())(request, appId, appSecret, callback);

const identify = exports.identify = (0, _curry2.default)((request, { appId, appSecret, oauth_token, oauth_token_secret }) => (0, _pipeP2.default)((0, _partial2.default)(request, [VERIFY_CREDENTIALS, {
  headers: (0, _oauth.getHeaders)(VERIFY_CREDENTIALS, {}, {}, appId, appSecret, 'GET', oauth_token, oauth_token_secret) }, {}]), (0, _invoker2.default)(0, 'json'), (0, _set2.default)((0, _lensProp2.default)('user'), _2.default, {}), (0, _set2.default)((0, _lensProp2.default)('credentials'), { oauth_token, oauth_token_secret }))());