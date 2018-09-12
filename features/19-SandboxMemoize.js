
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			module.log("Hello from 19-SandboxMemoize!");

			return new Promise(function (resolve, reject) {

				require.sandbox(function (require) {

					require.memoize("/main.js", function (require, exports, module) {

						exports.main = function (options) {
							module.log("Hello from sandboxed 19-SandboxMemoize!");
						}
					});
				}, {
					onInitModule: function (moduleInterface, moduleObj) {

						moduleInterface.log = function () {
							module.logForModule(moduleObj, arguments);
						}
					}
				}, function (sandbox) {

					sandbox.main();

					resolve();
				}, reject);
			});
		}
	});
});
