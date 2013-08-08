
PINF.bundle("", function(require)
{
	require.memoize("ExtraPackageID/ExtraModule.js", function(require, exports, module)
	{
		var MAIN = require("root/main");
		
		exports.init = function()
		{
			module.log(MAIN.getExtraModuleGreeting());
		}
	});

	require.memoize("ExtraPackageID/package.json", {
		main: "ExtraPackageID/ExtraModule.js",
		mappings: {
			"root": ""
		}
	});
});
