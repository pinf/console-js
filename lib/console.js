
var WILDFIRE_CLIENT = require("./client/wildfire"),
	UTIL = require("modules/util"),
	LOADER = require("pinf/loader");

// TODO: Do not use `nodejs` API directly here.
var NODEJS_UTIL = require("nodejs/util");


var client = new WILDFIRE_CLIENT.Client();

[
    "log",
    "info",
    "warn",
    "error",
    "group",
    "groupEnd"
].forEach(function(priority)
{
    exports[priority] = function()
    {
    	// TODO: Only send to wildfire if configured to do so.
        return client.console[priority].apply(null, arguments);
    }
});


/*

// See: github.com/pinf/loader-js/lib/pinf-loader-js/console.js
// NOTE: Console argument normalization should happen in the above module.
// TODO: Register handler on above module to direct messages to insight/wildfire.

var originalAPI = {};

exports.bind = function()
{
	var api = {};

	originalAPI.log = console.log;
	console.log = api.log = function()
	{
		var args = normalizeArguments.apply(null, arguments);
		originalAPI.log.apply(null, args);
	}

	originalAPI.info = console.info;
	console.info = api.info = function()
	{
		var args = normalizeArguments.apply(null, arguments);
		originalAPI.info.apply(null, args);
	}
	
	originalAPI.warn = console.warn;
	console.warn = api.warn = function()
	{
		var args = normalizeArguments.apply(null, arguments);
		originalAPI.warn.apply(null, args);
	}

	originalAPI.error = console.error;
	console.error = api.error = function()
	{
		var args = normalizeArguments.apply(null, arguments);
		NODEJS_UTIL.debug(args);
	}
}

exports.unbind = function()
{
	UTIL.forEach(originalAPI, function(method)
	{
		console[method[0]] = method[1];
	});
	originalAPI = {};

	LOADER.setConsole(console);
}

*/