
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			if (typeof require.API.JQUERY === "undefined")
			{
				module.log("SKIPPED - 09-ResourceURI");
			}
			else
			{
				var url = require.sandbox.id + require.id("./hello.txt");

				require.API.JQUERY(function($)
				{
					$.get(url, function(data) {
						module.log(data + " from 09-ResourceURI!");
					});
				});
			}
		}
	});
});
