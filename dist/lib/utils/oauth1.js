'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupForTesting = exports.requestToken = exports.accessToken = exports.getHeaders = exports.verifyCallback = undefined;

var _tap = require('ramda/src/tap');

var _tap2 = _interopRequireDefault(_tap);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _signature = require('./signature');

var _signature2 = _interopRequireDefault(_signature);

var _uri = require('./uri');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let testNonce;
let testNow;

const assert = (err, test) => {
  if (!test) {
    throw new Error(err);
  }
};

const verifyCallback = exports.verifyCallback = resp => assert('Unconfirmed callback', resp.oauth_callback_confirmed === 'true');

const getHeaders = exports.getHeaders = (url, params, data, consumerKey, consumerSecret, method, oauthToken = '', oauthSecret = '') => {
  const nonce = testNonce || (0, _signature.getNonce)(32);
  const now = testNow || (0, _signature.getNow)();
  const sig = (0, _signature2.default)({
    url,
    consumerKey,
    consumerSecret,
    oauthToken,
    oauthSecret,
    params,
    method,
    data,
    nonce,
    now
  });

  const header = `OAuth oauth_consumer_key="${ (0, _uri.encode)(consumerKey) }",
    oauth_nonce="${ (0, _uri.encode)(nonce) }",
    oauth_signature="${ (0, _uri.encode)(sig) }",
    oauth_signature_method="HMAC-SHA1",
    oauth_timestamp="${ (0, _uri.encode)(now) }",
    ${ oauthToken && 'oauth_token="' }${ oauthToken }${ oauthToken && '",' }
    oauth_version="1.0"`.replace(/\n? +\n? */g, ' ');
  return { Authorization: header };
};

const accessToken = exports.accessToken = (0, _curry2.default)((accessTokenUrl, request, { appId, appSecret, oauth_token, oauth_token_secret, oauth_verifier }) => {
  const data = { oauth_verifier };
  const headers = Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded' }, getHeaders(accessTokenUrl, {}, data, appId, appSecret, 'POST', oauth_token, oauth_token_secret));
  const opts = {
    method: 'POST',
    headers,
    body: `oauth_verifier=${ oauth_verifier }` };

  return request(accessTokenUrl, opts).then(resp => resp.text()).then(_uri.fromQueryString);
});

const requestToken = exports.requestToken = (0, _curry2.default)((requestTokenUrl, request, appId, appSecret, callback) => {
  const params = {
    oauth_callback: callback
  };
  const headers = getHeaders(requestTokenUrl, params, {}, appId, appSecret, 'POST');
  const url = `${ requestTokenUrl }?${ (0, _uri.toQueryString)(params) }`;
  return request(url, { method: 'POST', headers }).then(resp => resp.text()).then(_uri.fromQueryString).then((0, _tap2.default)(verifyCallback));
});

const setupForTesting = exports.setupForTesting = (nonce, now) => {
  testNonce = nonce;
  testNow = now;
};