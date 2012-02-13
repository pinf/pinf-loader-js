
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			module.log("Hello from 10-Sandbox/SandboxedExtraBundle!");
		}
	});
});
