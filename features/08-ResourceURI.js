
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			var uri = require.sandbox.id + require.id("./hello.txt");

			return require.API.FETCH(uri).then(function (data) {

				if (data !== "Hello") {
					throw new Error("Loaded resource does not have correct content!");
				}

				module.log(data + " from 08-ResourceURI!");
			});
		}
	});
});
