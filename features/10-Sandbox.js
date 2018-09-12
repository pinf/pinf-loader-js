
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			module.log("Hello from 10-Sandbox!");

			return new Promise(function (resolve, reject) {

				var url = "." + require.id("./SandboxedExtraBundle");

				require.sandbox(url, {
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
