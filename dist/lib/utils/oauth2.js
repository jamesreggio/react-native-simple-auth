'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHeaders = exports.authorizationUrl = undefined;

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authorizationUrl = exports.authorizationUrl = (0, _curry2.default)((url, appId, callback, scope, responseType = 'token') => `${ url }?scope=${ encodeURIComponent(scope) }&
      redirect_uri=${ encodeURIComponent(callback) }&
      response_type=${ responseType }&
      client_id=${ appId }`.replace(/\s+/g, ''));

const getHeaders = exports.getHeaders = token => ({ Authorization: `Bearer ${ token }` });