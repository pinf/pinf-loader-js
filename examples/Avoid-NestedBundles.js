
require.bundle("", function(require)
{
	require.memoize("/package.json", {
		main: "/main.js"
	});

	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			module.log("Hello from Avoid-NestedBundles!");
			
            if (options.debug === true)
            {
                test();
            }
		}
	});
	
	function test() {
    	var error;
    	try {
    		require.bundle("", function(require)
    		{
    		});
    	} catch(e) {
    		error = e;
    	} finally {
    		if (!error || error.message !== "You cannot nest require.bundle() calls!")
    		{
    			throw new Error("Loader should have thrown: You cannot nest require.bundle() calls!");
    		}
    	}
	}
});
