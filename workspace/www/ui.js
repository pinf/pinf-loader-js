
((function() {

	function run(callback) {

		return window.fetch("../../.features.json").then(function (response) {
			return response.json();
		}).then(function (features) {

			return Promise.all(features.map(function(name) {

				function wrap(test) {
					if (typeof mocha === "undefined") {
						return test();
					}
					window.it(name, function(done) {
						return Promise.resolve(test()).then(function() {
							return done();
						}, done);
					});
				}
	
				return wrap(function() {
	
					return new Promise(function (resolve, reject) {
	
						PINF.sandbox("../../features/" + name + ".js", {
							onInitModule: function(moduleInterface, moduleObj) {
								moduleObj.require.API = {
									FETCH: function(uri, callback) {
										return window.fetch(uri).then(function (response) {
											return response.text();
										});
									}
								};
								moduleInterface.log = function() {
									logToOutput(moduleObj, arguments);
								};
								moduleInterface.logForModule = function(moduleObj, arguments) {
									logToOutput(moduleObj, arguments);
								};
							}
						}, function(sandbox) {
							try {
								return Promise.resolve(sandbox.main({})).then(resolve, reject);
							} catch(err) {
								return reject(err);
							}
						}, reject);
					});
				});

			}));			
		}).then(function () {
			callback(null);
		}, callback);
	}

	if (typeof mocha !== "undefined") {

			mocha.setup("tdd");

			window.describe = Mocha.describe;
			window.it = Mocha.it;

	    window.describe("run-all", function() {
	    	this.timeout(10 * 1000);
	    	run();
	    });
	} else {
		$(document).ready(function() {

			$.get("../../loader.min.js", function(data) {
				$("#loader-min").html(data.replace(/</g, "&#60;"));
			}, "text");
			$.get(".loader.min.js-size", function(data) {
				$("#loader-min-size").html(data);
			}, "text");
		    $.get(".loader.min.js.gz-size", function(data) {
		        $("#loader-min-gz-size").html(data);
		    }, "text");
		    $.get(".loader.min.js.br-size", function(data) {
		        $("#loader-min-br-size").html(data);
		    }, "text");

			run(function(err) {
				if (err) {
					console.error(err.stack);
					console.error(err);
					$("#output").addClass("fail");
					$("#error-alert").show();
				} else {
					$("#output").addClass("success");
					$("#report").html(jsDump.parse(PINF.getReport()));
				}
			});
		});
	}

	function logToOutput(moduleObj, arguments) {
		if (typeof mocha !== "undefined") {
			return;
		}
		var args = [],
			i;
		for (i in arguments) {
			args.push(arguments[i]);
		}
		$("#output").append([
			"<div><div class=\"from\">",
			moduleObj.require.sandbox.id + " : " + moduleObj.id,
			"</div><div class=\"message\">",
			args.join(", "),
			"</div></div>"
		].join(""));
	}

})());
