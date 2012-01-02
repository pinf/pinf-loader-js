
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			var uri = require.uri("./hello.txt").join(""),
				url = document.location.protocol + "/" + uri;

			jQuery.get(url, function(data) {
				module.log(data + " from 09-ResourceURI!");
			});
		}
	});
});
