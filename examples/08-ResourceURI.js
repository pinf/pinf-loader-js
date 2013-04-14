
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			var deferred = require.API.Q.defer();

			var uri = require.sandbox.id + require.id("./hello.txt");

			require.API.JQUERY.get(uri).done(function(data, textStatus, jqXHR)
			{
				if (data !== "Hello")
				{
					return deferred.reject(new Error("Loaded resource does not have correct content!"));
				}

				module.log(data + " from 08-ResourceURI!");

				return deferred.resolve();

			}).fail(function(jqXHR, textStatus, errorThrown) {
				return deferred.reject(new Error((errorThrown && errorThrown.message) || textStatus));
			});

			return deferred.promise;
		}
	});
});
