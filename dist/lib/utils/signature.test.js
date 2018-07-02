'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _signature = require('./signature');

var _signature2 = _interopRequireDefault(_signature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Signature', () => {
  it('should calculate the oauth signature', () => {
    const url = 'https://api.twitter.com/1/statuses/update.json';
    const params = { include_entities: true };
    const consumerKey = 'xvz1evFS4wEEPTGEFPHBog';
    const consumerSecret = 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw';
    const oauthToken = '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb';
    const oauthSecret = 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE';
    const data = {
      status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
    };
    const nonce = 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg';
    const now = 1318622958;

    const expected = 'tnnArxj06cWHq44gCs1OSKk/jLY=';
    const actual = (0, _signature2.default)({
      url,
      params,
      consumerKey,
      consumerSecret,
      oauthToken,
      oauthSecret,
      data,
      nonce,
      now
    });

    _assert2.default.equal(actual, expected);
  });
});