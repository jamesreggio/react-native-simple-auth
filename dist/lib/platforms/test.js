'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.opts = exports.setup = exports.dance = exports.request = undefined;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let requests;
let danceFixture;

const request = exports.request = (url, opts = {}) => {
  const [expectedUrl, expectedOpts, response, msg] = requests.shift();
  _assert2.default.equal(url, expectedUrl, `url for ${ msg } request`);
  _assert2.default.deepEqual(opts, expectedOpts, `opts for ${ msg } request`);
  return Promise.resolve({
    json() {
      return Promise.resolve(response);
    },
    text() {
      return Promise.resolve(response);
    }
  });
};

const dance = exports.dance = url => {
  const [expectedUrl, response] = danceFixture;
  _assert2.default.equal(url, expectedUrl, 'authorization url for dance');
  return Promise.resolve(response);
};

const setup = exports.setup = (REQUESTS, DANCE) => {
  requests = REQUESTS.slice(0);
  danceFixture = DANCE.slice(0);
};

const opts = exports.opts = {
  callback: 'http://localhost:3000/callback'
};