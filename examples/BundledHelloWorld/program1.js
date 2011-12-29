
require.memoize(["/examples/BundledHelloWorld/program1.js","/package.json"], [], {
	main: "/main.js"
});

require.memoize(["/examples/BundledHelloWorld/program1.js","/main.js"], [], function(require, exports, module)
{
	exports.main = function(options)
	{
		console.log("Hello from Souremint Loader BundledHelloWorld program1 Example Application!");
	}
});

require.memoized();
