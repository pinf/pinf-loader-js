
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			module.log("Hello from 11-CrossDomain!");

		    return Promise.all([
				"//rawgithub.com/pinf/pinf-loader-js/master/features/11-CrossDomain/CrossDomainBundle.js"
			].map(function (url) {

				return new Promise(function (resolve, reject) {

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
		    }));
		}
	});
});
