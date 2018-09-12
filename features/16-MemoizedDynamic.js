PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			module.log("Hello from 16-MemoizedDynamic!");

			return new Promise(function (resolve, reject) {

				var extraDynamicID = "./Dynamic";

				require.async(extraDynamicID, function (EXTRA_DYNAMIC) {

					EXTRA_DYNAMIC.init();
	
					resolve();
				}, reject);
			});
		}

		exports.getMemoizedDynamicGreeting = function () {
			return "Hello from 16-MemoizedDynamic/Dynamic!";
		}
	});

	require.memoize("/Dynamic.js", function (require, exports, module) {

		var MAIN = require("./main.js");
		
		exports.init = function () {

			module.log(MAIN.getMemoizedDynamicGreeting());
		}
	});
});
