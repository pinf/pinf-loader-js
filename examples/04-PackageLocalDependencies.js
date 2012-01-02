
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		// One-way dependency.
		var GREETINGS = require("./greetings");

		exports.main = function(options)
		{
			module.log(GREETINGS.getGreeting());
		};
	});

	// Flat.
	require.memoize("/greetings.js", function(require, exports, module)
	{
		// Circular dependency.
		var HELLO = require("./words/hello");

		exports.getGreeting = function()
		{
			return HELLO.getWord() + " from " + HELLO.getName() + "!";
		}
	
		exports.getName = function()
		{
			return "04-PackageLocalDependencies";
		}
	});

	// Sub path.
	require.memoize("/words/hello.js", function(require, exports, module)
	{
		// Circular dependency.
		var GREETINGS = require("../greetings");
	
		exports.getWord = function()
		{
			return "Hello";
		}
	
		exports.getName = function()
		{
			return GREETINGS.getName();
		}
	});

});
