//#!/usr/bin/env phantomjs

var SYSTEM = require("system");
var WEBPAGE = require("webpage");
var FS = require("fs");


function main(callback) {

	var messages = [];
	var page = WEBPAGE.create();

	page.onLoadStarted = function () {
	    console.log("Start loading ..."); 
	};

	page.onConsoleMessage = function (msg) {
		messages.push(msg);
		console.log(msg);
	};

	page.onLoadFinished = function (status) {
	    console.log("Loading finished. Running tests ...");

	    try {

		    // Check some basic things.
			if (status !== "success") {
				return callback("Page did not load with 'success'!");
			}
			if (page.content.length <= 1000) {
				return callback("Page content is less than 1,000 chars! Something did not load correctly? Content: " + page.content);
			}

			var report = page.evaluate(function () {
				return sourcemint.getReport();
			});

			var count = 0;
			for (var key in report.sandboxes) {
				count++;
				console.log("Sandbox: " + key);
			}

			if (count !== 20) {
				return callback("Did not load " + count + " sandboxes.");
			}

			messages = [];
			page.evaluate(function () {
				require.sandbox("../../examples/DevUI/../01-HelloWorld", function(sandbox) {
					try {
						sandbox.main({});
					} catch(err) {
						console.error(err);
					}
				}, {
					onInitModule: function(moduleInterface, moduleObj) {
						moduleInterface.log = function() {
							console.log(arguments[0]);
						};
					}
				});
			});

			setTimeout(function() {
				if (messages[0] !== "Hello from 01-HelloWorld!") {
					return callback("HelloWorld module message mis-match!");
				}
				callback(null);
			}, 200);

		} catch(err) {
			callback(err);
		}
	};

	page.open("http://127.0.0.1:8080/workspace/www/");
}

main(function(err) {
	if (err) {
		console.error((typeof err === "object" && err.stack)?err.stack:err);
		phantom.exit(1);
	}
	phantom.exit(0);
});
