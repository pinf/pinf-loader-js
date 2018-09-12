
PINF.bundle("", function (require) {

		require.memoize("/main.js", function (require, exports, module) {

				exports.main = function (options) {

						if (window.EventEmitter) {
								module.log("Hello from 18-MappedScriptURI!");
								return;
						}

						throw new Error("'window.EventEmitter' not available!");
				}
		});

		require.memoize("/package.json", {
				main: "/main.js",
				mappings: {
						"EventEmitter": "//cdnjs.cloudflare.com/ajax/libs/EventEmitter/5.1.0/EventEmitter.min.js"
				}
		});
});
