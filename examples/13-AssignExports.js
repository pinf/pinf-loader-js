
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		module.exports = {
			main: function(options)
			{
				module.log("Hello from 13-AssignExports!");
			}
		};
	});
});
