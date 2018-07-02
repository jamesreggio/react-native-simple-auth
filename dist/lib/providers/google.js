'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identify = exports.authorize = undefined;

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _invoker = require('ramda/src/invoker');

var _invoker2 = _interopRequireDefault(_invoker);

var _partial = require('ramda/src/partial');

var _partial2 = _interopRequireDefault(_partial);

var _pipeP = require('ramda/src/pipeP');

var _pipeP2 = _interopRequireDefault(_pipeP);

var _lensProp = require('ramda/src/lensProp');

var _lensProp2 = _interopRequireDefault(_lensProp);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _set = require('ramda/src/set');

var _set2 = _interopRequireDefault(_set);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _prop = require('ramda/src/prop');

var _prop2 = _interopRequireDefault(_prop);

var _pipe = require('ramda/src/pipe');

var _pipe2 = _interopRequireDefault(_pipe);

var _has = require('ramda/src/has');

var _has2 = _interopRequireDefault(_has);

var _identity = require('ramda/src/identity');

var _identity2 = _interopRequireDefault(_identity);

var _ifElse = require('ramda/src/ifElse');

var _ifElse2 = _interopRequireDefault(_ifElse);

var _oauth = require('../utils/oauth2');

var _uri = require('../utils/uri');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SCOPE = 'email profile';
const AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN = 'https://www.googleapis.com/oauth2/v4/token';
const ME = 'https://www.googleapis.com/oauth2/v2/userinfo';

const checkError = (0, _ifElse2.default)((0, _has2.default)('error'), (0, _pipe2.default)((0, _prop2.default)('error'), (0, _curry2.default)(e => {
  throw new Error(e);
})), _identity2.default);

const getUser = (0, _curry2.default)((request, credentials) => (0, _pipe2.default)((0, _prop2.default)('access_token'), _oauth.getHeaders, (0, _set2.default)((0, _lensProp2.default)('headers'), _2.default, {}), (0, _pipeP2.default)((0, _partial2.default)(request, [ME]), (0, _invoker2.default)(0, 'json'), (0, _set2.default)((0, _lensProp2.default)('user'), _2.default, {}), (0, _set2.default)((0, _lensProp2.default)('credentials'), credentials)))(credentials));

const authorize = exports.authorize = ({ dance, request }, { appId, callback, scope = SCOPE }) => (0, _pipeP2.default)(dance, _uri.fromQueryString, checkError, (0, _merge2.default)({ appId, callback }))((0, _oauth.authorizationUrl)(AUTH, appId, callback, scope, 'code'));

const identify = exports.identify = (0, _curry2.default)((request, { appId, callback, code }) => (0, _pipeP2.default)((0, _partial2.default)(request, [TOKEN]), (0, _invoker2.default)(0, 'json'), checkError, getUser(request))({
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: (0, _uri.toQueryString)({
    code,
    client_id: appId,
    redirect_uri: callback,
    grant_type: 'authorization_code'
  })
}));