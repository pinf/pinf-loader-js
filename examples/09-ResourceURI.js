
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			var url = require.sandbox.id + require.id("./hello.txt");

			jQuery.get(url, function(data) {
				module.log(data + " from 09-ResourceURI!");
			});
		}
	});
});
