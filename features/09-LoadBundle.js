
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			module.log("Hello from 09-LoadBundle!");

			return new Promise(function (resolve, reject) {

				var extraBundleID = "./ExtraBundle";

				require.async(extraBundleID, function (EXTRA_BUNDLE) {

					EXTRA_BUNDLE.init();
	
					resolve();
				}, reject);
			});
		}
		
		exports.getExtraBundleGreeting = function () {
			return "Hello from 09-LoadBundle/ExtraBundle!";
		}
	});
});
