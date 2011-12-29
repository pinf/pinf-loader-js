
require.memoize(["/examples/BundledHelloWorld/program2.js", "/package.json"], [], {
	main: "/main.js"
});

require.memoize(["/examples/BundledHelloWorld/program2.js", "/main.js"], [
	"/examples/BundledHelloWorld/program2.js", "/greetings.js"
], function(require, exports, module)
{
	var GREETINGS = require("./greetings");

	exports.main = function(options)
	{
		console.log(GREETINGS.getGreeting());
	}
});

require.memoize(["/examples/BundledHelloWorld/program2.js", "/greetings.js"], [
	"/examples/BundledHelloWorld/program2.js", "/words/hello.js"
], function(require, exports, module)
{
	var HELLO = require("./words/hello");

	exports.getGreeting = function()
	{
		return HELLO.getWord() + " from Souremint Loader " + HELLO.getName() + "!";
	}
	
	exports.getName = function()
	{
		return "BundledHelloWorld program2 Example Application";
	}
});

require.memoize(["/examples/BundledHelloWorld/program2.js", "/words/hello.js"], [
	"/examples/BundledHelloWorld/program2.js", "/greetings.js"
], function(require, exports, module)
{
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

require.memoized();
