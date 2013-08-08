
PINF.bundle("", function(require)
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
		var GREETINGS = require("helpers/greetings"),
			LOGGER = require("helpers/logger");

		exports.main = function(options)
		{
			LOGGER.log(GREETINGS.getGreeting());
		}
	});

	require.memoize("packageA/package.json", {
		mappings: {
			"package": "packageB",
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
			return "05-CrossPackageDependencies";
		}
	});

	require.memoize("packageA/logger.js", function(require, exports, module)
	{
		exports.log = function(message)
		{
			module.log(message);
		}
	});

	require.memoize("packageB/package.json", {
		mappings: {
			"package": "packageA",
			"letters": "packageC",
			"letter-o": "packageD"
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
			return require("letters/H").getLetter() + "ell" + require("letter-o").getLetter();
		}
	
		exports.getName = function()
		{
			return GREETINGS.getName();
		}
	});

	require.memoize("packageC/H.js", function(require, exports, module)
	{
		exports.getLetter = function()
		{
			return "H";
		}
	});

	require.memoize("packageD/o.js", function(require, exports, module)
	{
		exports.getLetter = function()
		{
			return "o";
		}
	});

	require.memoize("packageD/package.json", {
		main: "packageD/o.js"
	});

});
