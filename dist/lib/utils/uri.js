'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromQueryString = exports.toQueryString = exports.encode = undefined;

var _split = require('ramda/src/split');

var _split2 = _interopRequireDefault(_split);

var _fromPairs = require('ramda/src/fromPairs');

var _fromPairs2 = _interopRequireDefault(_fromPairs);

var _join = require('ramda/src/join');

var _join2 = _interopRequireDefault(_join);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _toPairs = require('ramda/src/toPairs');

var _toPairs2 = _interopRequireDefault(_toPairs);

var _replace = require('ramda/src/replace');

var _replace2 = _interopRequireDefault(_replace);

var _prop = require('ramda/src/prop');

var _prop2 = _interopRequireDefault(_prop);

var _sortBy = require('ramda/src/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _pipe = require('ramda/src/pipe');

var _pipe2 = _interopRequireDefault(_pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sortPairs = (0, _pipe2.default)((0, _sortBy2.default)((0, _prop2.default)(1)), (0, _sortBy2.default)((0, _prop2.default)(0)));

// For RFC 3986 Compliant URI Encoding.
const encode = exports.encode = (0, _pipe2.default)(encodeURIComponent, (0, _replace2.default)(/!/g, '%21'), (0, _replace2.default)(/'/g, '%27'), (0, _replace2.default)(/\(/g, '%28'), (0, _replace2.default)(/\)/g, '%29'), (0, _replace2.default)(/\*/g, '%2A'));

// Convert an object to a (sorted) query string.
const toQueryString = exports.toQueryString = (0, _pipe2.default)(_toPairs2.default, (0, _map2.default)((0, _map2.default)(encode)), sortPairs, (0, _map2.default)((0, _join2.default)('=')), (0, _join2.default)('&'));

// Convert a query string to an object.
const fromQueryString = exports.fromQueryString = (0, _pipe2.default)((0, _replace2.default)(/.*\?/, ''), (0, _replace2.default)(/#.*/, ''), (0, _split2.default)('&'), (0, _map2.default)((0, _split2.default)('=')), _fromPairs2.default);