
require.bundle("4699E5FC-46F1-4B35-B073-B6395E19F921", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			module.log("Hello from 01-HelloWorld!");
		}
	});

});
