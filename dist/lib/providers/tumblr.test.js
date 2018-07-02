'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tumblr = require('./tumblr');

var tumblr = _interopRequireWildcard(_tumblr);

var _tumblr2 = require('../fixtures/tumblr');

var _test = require('../platforms/test');

var test = _interopRequireWildcard(_test);

var _oauth = require('../utils/oauth1');

var _login = require('../login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tumblr', () => {
  before(() => {
    test.setup(_tumblr2.REQUESTS, _tumblr2.DANCE);
    (0, _oauth.setupForTesting)('123ABC', 1234567890);
  });

  it('should login', () => {
    const tumblrTest = (0, _login2.default)(tumblr, test);
    return tumblrTest({
      appId: 'APPID123',
      appSecret: 'APPSECRET123'
    }).then(user => {
      _assert2.default.equal(user.user.name, 'foo');
      _assert2.default.equal(user.credentials.oauth_token, 'TOKEN2123');
      _assert2.default.equal(user.credentials.oauth_token_secret, 'SECRET2123');
    });
  });
});