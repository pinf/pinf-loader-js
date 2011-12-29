
require.memoize("/package.json", {
	main: "/main.js"
});

require.memoize("/main.js", function(require, exports, module)
{
	exports.main = function(options)
	{
		console.log("Hello from 01-HelloWorld!");
	}
});
