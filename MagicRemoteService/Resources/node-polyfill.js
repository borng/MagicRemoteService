// Polyfill deprecated util functions removed in newer Node.js versions.
// Loaded via NODE_OPTIONS=--require before WebOS CLI commands.
var util = require('util');
if (typeof util.isDate !== 'function') {
	util.isDate = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Date]';
	};
}
if (typeof util.isRegExp !== 'function') {
	util.isRegExp = function (obj) {
		return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
}
if (typeof util.isArray !== 'function') {
	util.isArray = Array.isArray;
}
if (typeof util.isBoolean !== 'function') {
	util.isBoolean = function (obj) {
		return typeof obj === 'boolean';
	};
}
if (typeof util.isNull !== 'function') {
	util.isNull = function (obj) {
		return obj === null;
	};
}
if (typeof util.isNullOrUndefined !== 'function') {
	util.isNullOrUndefined = function (obj) {
		return obj === null || obj === undefined;
	};
}
if (typeof util.isNumber !== 'function') {
	util.isNumber = function (obj) {
		return typeof obj === 'number';
	};
}
if (typeof util.isString !== 'function') {
	util.isString = function (obj) {
		return typeof obj === 'string';
	};
}
if (typeof util.isUndefined !== 'function') {
	util.isUndefined = function (obj) {
		return obj === undefined;
	};
}
if (typeof util.isObject !== 'function') {
	util.isObject = function (obj) {
		return obj !== null && typeof obj === 'object';
	};
}
if (typeof util.isFunction !== 'function') {
	util.isFunction = function (obj) {
		return typeof obj === 'function';
	};
}
if (typeof util.isBuffer !== 'function') {
	util.isBuffer = Buffer.isBuffer;
}
if (typeof util.isError !== 'function') {
	util.isError = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Error]' || obj instanceof Error;
	};
}
if (typeof util.isPrimitive !== 'function') {
	util.isPrimitive = function (obj) {
		return obj === null || (typeof obj !== 'object' && typeof obj !== 'function');
	};
}
if (typeof util.isSymbol !== 'function') {
	util.isSymbol = function (obj) {
		return typeof obj === 'symbol';
	};
}
