
require.bundle("", function(require)
{

	require.memoize("/package.json", {
		main: "/main.js",
		mappings: {
			"helpers": "packageA"
		}
	});

	require.memoize("/main.js", function(require, exports, module)
	{
		// One-way dependency.
		var GREETINGS = require("helpers/greetings");

		exports.main = function(options)
		{
			console.log(GREETINGS.getGreeting());
		}
	});

	require.memoize("packageA/package.json", {
		mappings: {
			"package": "packageB",
		},
		directories: {
			lib: ""
		}
	});

	require.memoize("packageA/greetings.js", function(require, exports, module)
	{
		var HELLO = require("package/hello");

		exports.getGreeting = function()
		{
			return HELLO.getWord() + " from " + HELLO.getName() + "!";
		}
	
		exports.getName = function()
		{
			return "03-CrossPackageDependencies";
		}
	});

	require.memoize("packageB/package.json", {
		mappings: {
			"package": "packageA",
			"letters": "packageC"
		},
		directories: {
			lib: "words"
		}
	});

	require.memoize("packageB/words/hello.js", function(require, exports, module)
	{
		var GREETINGS = require("package/greetings");
	
		exports.getWord = function()
		{
			return require("letters/H").getLetter() + "ello";
		}
	
		exports.getName = function()
		{
			return GREETINGS.getName();
		}
	});

	require.memoize("packageC/lib/H.js", function(require, exports, module)
	{
		exports.getLetter = function()
		{
			return "H";
		}
	});

});
