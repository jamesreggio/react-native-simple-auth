'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mergeAll = require('ramda/src/mergeAll');

var _mergeAll2 = _interopRequireDefault(_mergeAll);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _curry2.default)((provider, platform, opts) => provider.authorize(platform, (0, _mergeAll2.default)([provider.opts, platform.opts, opts])).then(provider.identify(platform.request)));