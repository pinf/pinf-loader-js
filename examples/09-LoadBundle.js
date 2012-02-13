
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		var Q;

		exports.main = function(options)
		{
			Q = require.API.Q;
			
			var result = Q.defer();

			module.log("Hello from 09-LoadBundle!");

			var extraBundleID = "./ExtraBundle";

			require.async(extraBundleID, function(EXTRA_BUNDLE)
			{
				EXTRA_BUNDLE.init();

				result.resolve();
			});

			return result.promise;
		}
		
		exports.getExtraBundleGreeting = function()
		{
			return "Hello from 09-LoadBundle/ExtraBundle!";
		}
	});
});
