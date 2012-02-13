
require.bundle("7242C938-E147-43B4-9EC6-77EBDEB4FAFC", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			module.log("Hello from NamedBundle!");
		}
	});
});
