
require.bundle("", function(require)
{
	require.memoize("/ExtraBundle.js", function(require, exports, module)
	{
		var MAIN = require("./main.js");
		
		exports.init = function()
		{
			module.log(MAIN.getExtraBundleGreeting());
		}
	});
});
