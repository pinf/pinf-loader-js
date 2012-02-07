
// NOTE: Called via `npm run-script postinstall ...`

var PATH = require("path"),
	FS = require("fs");

function main()
{
	try {

		var basePath = process.cwd();

		if (!PATH.existsSync(basePath + "/node_modules"))
			FS.mkdirSync(basePath + "/node_modules", 0775);

		if (!PATH.existsSync(basePath + "/node_modules/sourcemint-loader-js"))
			FS.symlinkSync("../", basePath + "/node_modules/sourcemint-loader-js");

	} catch(e) {
		console.error("Fatal Error '" + e + "' linking package `./` to `./node_mdoules/sourcemint-loader-js`!");
		process.exit(1);
	}
}

main();
