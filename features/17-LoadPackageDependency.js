
PINF.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		var Q;

		exports.main = function(options)
		{
			Q = require.API.Q;
			
			var result = Q.defer();

			module.log("Hello from 17-LoadPackageDependency!");

			var extraModuleID = "ExtraPackageAlias/ExtraModule";

			require.async(extraModuleID, function(EXTRA_MODULE)
			{
				EXTRA_MODULE.init();

				result.resolve();
			}, result.reject);

			return result.promise;
		}
		
		exports.getExtraModuleGreeting = function()
		{
			return "Hello from 17-LoadPackageDependency/ExtraPackageID/ExtraModule!";
		}
	});

	require.memoize("/package.json", {
		main: "/main.js",
		mappings: {
			"ExtraPackageAlias": "ExtraPackageID"
		}
	});
});
