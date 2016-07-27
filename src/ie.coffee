# polyfills / fixes

require "html5shiv/dist/html5shiv.js"
TA = require 'typedarray'
for key, value of TA
	if not window[key]
		window[key] = value
require "es5-shim"
require "es5-shim/es5-sham"

`
(function(con) {
  'use strict';
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) con[prop] = con[prop] || empty;
  while (method = methods.pop()) con[method] = con[method] || dummy;
})(window.console = window.console || {});
`