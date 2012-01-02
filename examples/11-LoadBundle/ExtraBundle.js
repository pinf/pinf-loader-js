
require.bundle("", function(require)
{
	require.memoize("/ExtraBundle.js", function(require, exports, module)
	{
		exports.init = function()
		{
			module.log("Hello from ExtraBundle!");
		}
	});
});
