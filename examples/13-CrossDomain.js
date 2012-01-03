require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			// TODO: Return a promise that resolves when all sandboxes have been run.

			module.log("Hello from 13-CrossDomain!");
			
			// Cross sub-domain

			// Assume DevUI/TestUI is running at http://sourcemint.github.com/loader-js/workspace/www/index.html
			require.sandbox("https://raw.github.com/sourcemint/loader-js/master/examples/13-CrossDomain/CrossDomainBundle.js", function(sandbox)
			{
				sandbox.main();
			}, {
				onInitModule: function(moduleInterface)
				{
					moduleInterface.log = function()
					{
						module.logForModule.call(null, moduleInterface, arguments);
					}
				}
			});
			
			// Cross domain

			require.sandbox("http://static.cadorn.net/CrossDomainBundle.js", function(sandbox)
			{
				sandbox.main();
			}, {
				onInitModule: function(moduleInterface)
				{
					moduleInterface.log = function()
					{
						module.logForModule.call(null, moduleInterface, arguments);
					}
				}
			});
		}
	});
});
