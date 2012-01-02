
require.bundle("", function(require)
{
	require.memoize("/main.js", function(require, exports, module)
	{
		var TEXT = require("./hello.txt");

		exports.main = function(options)
		{
			TEXT = TEXT.replace(" \" 0 - _ . ! ~ * ' ( ) ; , / ? : @ & = + $", "")

			module.log(TEXT + " from 08-TextModule!");
		}
	});

	//	require.memoize("/hello.txt", encodeURIComponent("Hello \" 0 - _ . ! ~ * ' ( ) ; , / ? : @ & = + $"));
	require.memoize("/hello.txt", "Hello%20%22%200%20-%20_%20.%20!%20~%20*%20'%20(%20)%20%3B%20%2C%20%2F%20%3F%20%3A%20%40%20%26%20%3D%20%2B%20%24");
});
