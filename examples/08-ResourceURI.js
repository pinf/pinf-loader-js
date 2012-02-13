
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			var deferred = require.API.Q.defer();

			var uri = require.sandbox.id + require.id("./hello.txt");

			require.API.JQUERY(function($)
			{
				$.get(uri, function(data)
				{
					require.API.Q.call(function()
					{
						if (data !== "Hello")
						{
							throw new Error("Loaded resource does not have correct content!");
						}

						module.log(data + " from 08-ResourceURI!");

					}).then(deferred.resolve, deferred.reject);
				});
			});
			
			return deferred.promise;
		}
	});
});
