
if (! (require.supports.indexOf("ucjs2-pinf-0") >= 0))
{
	throw new Error("`require.supports` does not contain '" + "ucjs2-pinf-0" + "'!");
}

// Value of `require.sandbox.id` is unspecified.

require.bundle("", function(require)
{
	if (require.sandbox)
	{
		throw new Error("`require.sandbox` may not be set here!");
	}

	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{			
			module.log("Hello from 12-Environment!");
			
			if (module.id !== "/main.js")
			{
				throw new Error("`module.id` has incorrect value!");
			}
			
			if (typeof require !== "function")
			{
				throw new Error("`require` is not a function!");
			}

			if (typeof require.id !== "function")
			{
				throw new Error("`require.id` is not a function!");
			}
			
			if (typeof require.async !== "function")
			{
				throw new Error("`require.async` is not a function!");
			}

			if (typeof require.sandbox !== "function")
			{
				throw new Error("`require.sandbox` is not a function!");
			}
			
			if (typeof require.sandbox.id !== "string")
			{
				throw new Error("`require.sandbox.id` is not a string!");
			}
		}
	});
});
