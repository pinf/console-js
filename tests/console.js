
var CONSOLE = require("../lib/console");


exports.run = function(ASSERT, harness)
{
	harness.runAll(exports);
}

exports["test error"] = function(ASSERT)
{
//	CONSOLE.bind();

	console.error("Test error!", new Error("Test error object"));
	
//	CONSOLE.unbind();
}

exports["test log"] = function(ASSERT)
{
	console.log("Test error!", new Error("Test error object"));
}
