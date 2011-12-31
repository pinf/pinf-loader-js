
require.bundle("25D74165-D3CE-4731-92A5-F7309C1DBF75", function(require)
{
	require.memoize("/package.json", {
		main: "/main.js"
	});

	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			module.log("Hello from Avoid-NestedBundles!");
		}
	});

	var error;
	try {
		require.bundle("25D74165-D3CE-4731-92A5-F7309C1DBF76", function(require)
		{
		});
	} catch(e) {
		error = e;
	} finally {
		if (error.message !== "You cannot nest require.bundle() calls!")
		{
			throw new Error("Loader should have thrown: You cannot nest require.bundle() calls!");
		}
	}

});
