'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _google = require('./google');

var google = _interopRequireWildcard(_google);

var _google2 = require('../fixtures/google');

var _test = require('../platforms/test');

var test = _interopRequireWildcard(_test);

var _login = require('../login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Google', () => {
  before(() => {
    test.setup(_google2.REQUESTS, _google2.DANCE);
  });

  it('should login', () => {
    const googleTest = (0, _login2.default)(google, test);
    return googleTest({
      appId: 'APPID123'
    }).then(user => {
      _assert2.default.equal(user.user.id, 'USER123');
      _assert2.default.equal(user.user.name, 'foo');
      _assert2.default.equal(user.user.email, 'foo@gmail.com');
      _assert2.default.equal(user.credentials.access_token, 'ACCESSTOKEN123');
      _assert2.default.equal(user.credentials.refresh_token, 'REFRESHTOKEN123');
    });
  });
});