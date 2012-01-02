
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		var WORD = require("./word").word;

		exports.main = function(options)
		{
			module.log(WORD + " from 07-JsonModule!");
		}
	});

	require.memoize("/word.js", {
		word: "Hello"
	});
});
