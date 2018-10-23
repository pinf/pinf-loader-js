
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function () {

			module.log(require("./greeting").getGreeting() + " from 23-MappedPackageURL" + require("./characters").getExclamation());

			return new Promise(function (resolve, reject) {

				require.async("pkg", function (PACKAGE) {

					PACKAGE.main();
	
					resolve();
				}, reject);
			});
		}

	});

	require.memoize("/greeting.js", function (require, exports, module) {

		exports.getGreeting = function () {
			return 'Hello';
		}
	});

	require.memoize("/characters.js", function (require, exports, module) {

		exports.getExclamation = function () {
			return '!';
		}
	});

	require.memoize("/package.json", {
		main: "/main.js",
		mappings: {
			"pkg": "@bundle:/features/23-MappedPackageURL/PackageBundle"
		}
	});
});
