
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			require("./sub").announce();
		}
	});

	require.memoize("/sub.js", function (require, exports, module) {

		exports.announce = function () {

			const greeting = require("greeting");
			const characters = require("root/characters");

			module.log(greeting.getGreeting() + " from 23-MappedPackageURL/PackageBundle" + characters.getExclamation());
		}
	});

	require.memoize("/package.json", {
		mappings: {
			"root": ""
		}
	});	

});
