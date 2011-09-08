
var ENCODER = require("insight/encoder/default"),
    WILDFIRE = require("wildfire/wildfire"),
    JSON = require("modules/json");

var encoder = ENCODER.Encoder();

var Client = exports.Client = function()
{
    this.console = {};

    var self = this;

    var httpClientChannel = WILDFIRE.HttpClientChannel();

    var dispatcher = WILDFIRE.Dispatcher();
    dispatcher.setChannel(httpClientChannel);
    dispatcher.setProtocol("http://registry.pinf.org/cadorn.org/wildfire/@meta/protocol/component/0.1.0");
    dispatcher.setSender("https://github.com/pinf/console-js/");
    dispatcher.setReceiver("http://registry.pinf.org/cadorn.org/insight/@meta/receiver/console/process/0");

    [
        "log",
        "info",
        "warn",
        "error",
        "group",
        "groupEnd"
    ].forEach(function(priority)
    {
        self.console[priority] = function()
        {
            var message = WILDFIRE.Message();
// TODO: The grouped message sending needs some work
// TODO: The client should keep a channel open and display messages logged in correct order across multiple requests
            if (priority == "group") {
                message.setMeta(JSON.encode({
                    target: "console",
                    "group.start": true
                }));
            } else
            if (priority == "groupEnd") {
                message.setMeta(JSON.encode({
                    target: "console",
                    "group.end": true
                }));
            } else {
                message.setMeta(JSON.encode({
                    target: "console",
                    priority: priority
                }));
            }
            message.setData(encoder.encode(normalizeArguments(arguments)));
            dispatcher.dispatch(message);
            httpClientChannel.flush();
        }
    });
}

function normalizeArguments(arguments)
{
    var args = [];
    for (var i=0, ic=arguments.length ; i<ic ; i++)
        args.push(arguments[i]);
    return args;
}
