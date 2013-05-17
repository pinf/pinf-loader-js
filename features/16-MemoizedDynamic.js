PINF.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		var Q;

		exports.main = function(options)
		{
			Q = require.API.Q;
			
			var result = Q.defer();

			module.log("Hello from 16-MemoizedDynamic!");

			var extraDynamicID = "./Dynamic";

			require.async(extraDynamicID, function(EXTRA_DYNAMIC)
			{
				EXTRA_DYNAMIC.init();

				result.resolve();
			}, result.reject);

			return result.promise;
		}

		exports.getMemoizedDynamicGreeting = function()
		{
			return "Hello from 16-MemoizedDynamic/Dynamic!";
		}
	});

	require.memoize("/Dynamic.js", function(require, exports, module)
	{
		var MAIN = require("./main.js");
		
		exports.init = function()
		{
			module.log(MAIN.getMemoizedDynamicGreeting());
		}
	});
});
