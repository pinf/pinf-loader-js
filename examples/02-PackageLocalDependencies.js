
require.memoize("/package.json", {
	main: "/main.js"
});

require.memoize("/main.js", function(require, exports, module)
{
	// A one-way dependency.
	var GREETINGS = require("./greetings");

	exports.main = function(options)
	{
		console.log(GREETINGS.getGreeting());
	}
});

// Flat.
require.memoize("/greetings.js", function(require, exports, module)
{
	// A circular dependency.
	var HELLO = require("./words/hello");

	exports.getGreeting = function()
	{
		return HELLO.getWord() + " from " + HELLO.getName() + "!";
	}
	
	exports.getName = function()
	{
		return "02-PackageLocalDependencies";
	}
});

// Sub path.
require.memoize("/words/hello.js", function(require, exports, module)
{
	// A circular dependency.
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
