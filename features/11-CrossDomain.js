
PINF.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		var Q;

		exports.main = function(options)
		{
			Q = require.API.Q;

			module.log("Hello from 11-CrossDomain!");

		    return Q.all([
				"https://raw.github.com/pinf/pinf-loader-js/master/features/11-CrossDomain/CrossDomainBundle.js"
			].map(function(url) {
				var result = Q.defer();

				require.sandbox(url, function(sandbox)
				{
					sandbox.main();

					result.resolve();
				}, {
					onInitModule: function(moduleInterface, moduleObj)
					{
						moduleInterface.log = function()
						{
							module.logForModule(moduleObj, arguments);
						}
					}
				});

				return result.promise;
		    }));
		}
	});
});
