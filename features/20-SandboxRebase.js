
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			module.log("Hello from 20-SandboxRebase!");

			return new Promise(function (resolve, reject) {

				var url = "SandboxedExtraBundle.js";

				require.sandbox(url, {
					baseUrl: "../../features/20-SandboxRebase",
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
