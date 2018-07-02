'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _twitter = require('./twitter');

var twitter = _interopRequireWildcard(_twitter);

var _twitter2 = require('../fixtures/twitter');

var _test = require('../platforms/test');

var test = _interopRequireWildcard(_test);

var _oauth = require('../utils/oauth1');

var _login = require('../login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Twitter', () => {
  before(() => {
    test.setup(_twitter2.REQUESTS, _twitter2.DANCE);
    (0, _oauth.setupForTesting)('123ABC', 1234567890);
  });

  it('should login', () => {
    const twitterTest = (0, _login2.default)(twitter, test);
    return twitterTest({
      appId: 'APPID123',
      appSecret: 'APPSECRET123'
    }).then(user => {
      _assert2.default.equal(user.user.name, 'foo');
      _assert2.default.equal(user.credentials.oauth_token, 'ACCESSTOKEN123');
      _assert2.default.equal(user.credentials.oauth_token_secret, 'ACCESSTOKENSECRET123');
    });
  });
});