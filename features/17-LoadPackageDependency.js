
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			module.log("Hello from 17-LoadPackageDependency!");

			return new Promise(function (resolve, reject) {

				var extraModuleID = "ExtraPackageAlias/ExtraModule";

				require.async(extraModuleID, function (EXTRA_MODULE) {

					EXTRA_MODULE.init();

					resolve();
				}, reject);
			});
		}
		
		exports.getExtraModuleGreeting = function () {
			return "Hello from 17-LoadPackageDependency/ExtraPackageID/ExtraModule!";
		}
	});

	require.memoize("/package.json", {
		main: "/main.js",
		mappings: {
			"ExtraPackageAlias": "ExtraPackageID"
		}
	});
});
