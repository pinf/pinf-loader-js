
PINF.bundle("", function(require)
{

	// [Global like] module mounted on root package.
	require.memoize("/global-letters/l.js", function(require, exports, module)
	{
		// Ensure mappings from root package work.
		var GREETINGS = require("helpers/greetings");

		exports.getLetter = function(letter)
		{
			if (letter) {
				return GREETINGS.getLetter(letter);
			}
			return "l";
		}
	});

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
		var HELLO = require("package/hello"),
			// Global (non-mapped package) dependency fallback.
			L = require("global-letters/l");

		exports.getGreeting = function()
		{
			return HELLO.getWord() + " from " + HELLO.getName() + "!";
		}
	
		exports.getName = function()
		{
			return "15-GlobalDepe" + L.getLetter("n") + "dencyFa" + L.getLetter() + "lback";
		}

		exports.getLetter = function(letter) {
			return letter;
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
			"letters": "packageC"
		},
		directories: {
			lib: "words"
		}
	});

	require.memoize("packageB/words/hello.js", function(require, exports, module)
	{
		var GREETINGS = require("package/greetings"),
			// Global (non-mapped package) dependency fallback.
			L = require("global-letters/l");

		exports.getWord = function()
		{
			return require("letters/H").getLetter() + "e" + L.getLetter() + "l" + L.getLetter("o");
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

});
