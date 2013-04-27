
PINF.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		var Q;

		exports.main = function(options)
		{
			Q = require.API.Q;
			
			var result = Q.defer();

			module.log("Hello from 10-Sandbox!");

			var url = "." + require.id("./SandboxedExtraBundle");

			require.sandbox(url, {
				onInitModule: function(moduleInterface, moduleObj)
				{
					moduleInterface.log = function()
					{
						module.logForModule(moduleObj, arguments);
					}
				}
			}, function(sandbox)
			{
				sandbox.main();

				result.resolve();
			}, result.reject);

			return result.promise;
		}
	});
});
