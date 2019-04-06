
PINF.bundle("", function (require) {

		require.memoize("/main.js", function (require, exports, module) {

				exports.main = function (options) {

						module.log("Hello from 22-WebWorker!");

						return new Promise(function (resolve, reject) {

								var bundleUrl = window.location.pathname.replace(/\/[^\/]*$/, "/") + require.sandbox.id + require.id("./WorkerBundle");
								var loaderUrl = bundleUrl.replace(/\/features\/.+$/, "/dist/loader-full.browser.js");

								// Adjustment for tests
								if (window.location.pathname.split("/").length <= 2) {
									// TODO: Get loader URL from 'PINF'
									loaderUrl = "/base/dist/loader-full.browser.js";
									bundleUrl = bundleUrl.replace(/^\/\.\.\/\.\./, "");
								}

								var worker = new Worker(loaderUrl);

								var loaded = false;
								worker.onmessage = function (event) {
									
										if (event.data === "notify://pinf-loader-js/sandbox/loaded?uri=" + encodeURIComponent(bundleUrl)) {
	
												resolve();
										} else
										if (Array.isArray(event.data) && event.data[0] === "log") {

												module.logForModule(event.data[1], [event.data[2]]);
										}
								};

								worker.postMessage("notify://pinf-loader-js/sandbox/load?uri=" + encodeURIComponent(bundleUrl));
						});
				}
		});
});
