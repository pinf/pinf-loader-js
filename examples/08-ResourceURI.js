
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			var url = require.sandbox.id + require.id("./hello.txt");

			if (typeof require.API.JQUERY === "undefined")
			{
				// TODO: Check for consistent `url` value.
				module.log("SKIPPED - 08-ResourceURI");
			}
			else
			{
				require.API.JQUERY(function($)
				{
					$.get(url, function(data) {
						module.log(data + " from 08-ResourceURI!");
					});
				});
			}
		}
	});
});
