
require.bundle("27980559-C22C-4DDC-9340-248F4BF2A5E6", function(require)
{

	require.memoize("/package.json", {
		main: "/main.js"
	});

	require.memoize("/main.js", function(require, exports, module)
	{
		exports.main = function(options)
		{
			module.log("Hello from Avoid-SplitBundles!");

			if (options.debug === true)
			{
			    __TEST__Avoid_SplitBundles();
			}
		}
	});
	
});

function __TEST__Avoid_SplitBundles() {

    var error;
    try {
    	require.bundle("27980559-C22C-4DDC-9340-248F4BF2A5E6", function(require)
    	{
    	});
    } catch(e) {
    	error = e;
    } finally {
    	if (!error || error.message !== "You cannot split require.bundle(UID) calls where UID is constant!")
    	{
    		throw new Error("Loader should have thrown: You cannot split require.bundle(UID) calls where UID is constant!");
    	}
    }

}
