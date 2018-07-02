'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNow = exports.getNonce = undefined;

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _toUpper = require('ramda/src/toUpper');

var _toUpper2 = _interopRequireDefault(_toUpper);

var _adjust = require('ramda/src/adjust');

var _adjust2 = _interopRequireDefault(_adjust);

var _concat = require('ramda/src/concat');

var _concat2 = _interopRequireDefault(_concat);

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _reduce = require('ramda/src/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _binary = require('ramda/src/binary');

var _binary2 = _interopRequireDefault(_binary);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _divide = require('ramda/src/divide');

var _divide2 = _interopRequireDefault(_divide);

var _flip = require('ramda/src/flip');

var _flip2 = _interopRequireDefault(_flip);

var _join = require('ramda/src/join');

var _join2 = _interopRequireDefault(_join);

var _partial = require('ramda/src/partial');

var _partial2 = _interopRequireDefault(_partial);

var _times = require('ramda/src/times');

var _times2 = _interopRequireDefault(_times);

var _pipe = require('ramda/src/pipe');

var _pipe2 = _interopRequireDefault(_pipe);

var _hmacsha = require('hmacsha1');

var _hmacsha2 = _interopRequireDefault(_hmacsha);

var _uri = require('./uri');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Map arguments to OAuth keys.
const OAUTH_KEYS = {
  consumerKey: 'oauth_consumer_key',
  signatureMethod: 'oauth_signature_method',
  oauthToken: 'oauth_token',
  version: 'oauth_version',
  nonce: 'oauth_nonce',
  now: 'oauth_timestamp'
};

// Create a random alphanumeric string of a given length.
const getNonce = exports.getNonce = (0, _pipe2.default)((0, _times2.default)((0, _partial2.default)(chars => chars[Math.floor(Math.random() * chars.length)], ['0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'])), (0, _join2.default)(''));

// Return the current timestamp in seconds
const getNow = exports.getNow = (0, _pipe2.default)(Date.now, (0, _flip2.default)(_divide2.default)(1000), Math.floor);

// Join key items with an ampersand and hash with given data.
const hash = (0, _pipe2.default)((0, _join2.default)('&'), (0, _curry2.default)((0, _binary2.default)(_hmacsha2.default)));

// Rename an objects keys and remove unknown keys.
const renameKeys = (0, _curry2.default)((keysMap, obj) => (0, _reduce2.default)((acc, key) => {
  const ret = acc;
  if (obj[key]) {
    ret[keysMap[key] || key] = obj[key];
  }
  return ret;
}, {}, (0, _keys2.default)(keysMap)));

// Rename an objects OAuth keys.
const renameOAuthKeys = renameKeys(OAUTH_KEYS);

// Prepend the method and url to the base string.
const prependRequest = (0, _pipe2.default)((0, _adjust2.default)(_toUpper2.default, 0), (0, _adjust2.default)((0, _compose2.default)((0, _concat2.default)(_2.default, '&'), _uri.encode), 1), (0, _join2.default)('&'), _concat2.default);

// Merge 2 objects into a given object.
const mergeParams = (0, _compose2.default)(_merge2.default, _merge2.default);

// Create an OAuth 1.0 signature.

exports.default = ({
  url,
  consumerKey,
  consumerSecret,
  oauthToken = '',
  oauthSecret = '',
  params = {},
  data = {},
  method = 'POST',
  version = '1.0',
  signatureMethod = 'HMAC-SHA1',
  nonceSize = 32,
  nonce = getNonce(nonceSize),
  now = getNow()
}) => (0, _pipe2.default)(renameOAuthKeys, mergeParams(params, data), _uri.toQueryString, _uri.encode, prependRequest([method, url]), hash([consumerSecret, oauthSecret]))({ consumerKey, signatureMethod, oauthToken, version, nonce, now });