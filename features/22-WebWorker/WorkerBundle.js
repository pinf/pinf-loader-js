
PINF.bundle("", function (require) {

	require.memoize("/main.js", function (require, exports, module) {

		exports.main = function (options) {

			postMessage(["log", module, "Hello from 22-WebWorker/WorkerBundle!"]);
		}
	});
});
