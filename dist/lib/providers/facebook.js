'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identify = exports.authorize = undefined;

var _invoker = require('ramda/src/invoker');

var _invoker2 = _interopRequireDefault(_invoker);

var _partial = require('ramda/src/partial');

var _partial2 = _interopRequireDefault(_partial);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _lensProp = require('ramda/src/lensProp');

var _lensProp2 = _interopRequireDefault(_lensProp);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _set = require('ramda/src/set');

var _set2 = _interopRequireDefault(_set);

var _replace = require('ramda/src/replace');

var _replace2 = _interopRequireDefault(_replace);

var _pipeP = require('ramda/src/pipeP');

var _pipeP2 = _interopRequireDefault(_pipeP);

var _oauth = require('../utils/oauth2');

var _uri = require('../utils/uri');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SCOPE = 'email public_profile';
const AUTH = 'https://www.facebook.com/dialog/oauth';
const ME = 'https://graph.facebook.com/v2.8/me?';
const FIELDS = ['id', 'name', 'first_name', 'last_name', 'verified', 'email', 'location', 'link'];

const authorize = exports.authorize = ({ dance, request }, { appId, callback, scope = SCOPE, fields = FIELDS }) => (0, _pipeP2.default)(dance, (0, _replace2.default)('#', '?'), _uri.fromQueryString, (0, _set2.default)((0, _lensProp2.default)('credentials'), _2.default, {}), (0, _merge2.default)({ fields }))((0, _oauth.authorizationUrl)(AUTH, appId, callback, scope));

const identify = exports.identify = (0, _curry2.default)((request, { credentials, fields }) => (0, _pipeP2.default)((0, _partial2.default)(request, [`${ ME }` + `&access_token=${ credentials.access_token }` + `&fields=${ fields.join(',') }`, {}]), (0, _invoker2.default)(0, 'json'), (0, _set2.default)((0, _lensProp2.default)('user'), _2.default, {}), (0, _set2.default)((0, _lensProp2.default)('credentials'), credentials))());