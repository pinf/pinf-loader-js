
((function() {

	function run(callback) {

		var options = {
			debug: true
		};

		var tests = [
			"01-HelloWorld",
			"02-ReturnExports",
			"03-SpecifyMain",
			"04-PackageLocalDependencies",
			"05-CrossPackageDependencies",
			"06-JsonModule",
			"07-TextModule",
			"08-ResourceURI",
			"09-LoadBundle",
			"10-Sandbox",
			"11-CrossDomain",
			"12-Environment",
			"13-AssignExports",
			"14-NamedBundle",
			"15-GlobalDependencyFallback",
			"16-MemoizedDynamic",
			"17-LoadPackageDependency"
		];

		if (!/test.html$/.test(window.location.pathname)) {
			tests.push("Avoid-SplitBundles");
		}

	    return Q.when(Q.all(tests.map(function(name) {

			function wrap(test) {
				if (typeof mocha === "undefined") {
					return test();
				}
				it(name, function(done) {
					return Q.when(test(), function() {
						return done();
					}, done);
				});
			}

			return wrap(function() {
				var result = Q.defer();

				PINF.sandbox("../../features/" + name + ".js", {
					onInitModule: function(moduleInterface, moduleObj) {
						moduleObj.require.API = {
							Q: Q,
							FETCH: function(uri, callback) {
								return $.get(uri).done(function(data, textStatus, jqXHR) {
									return callback(null, data);
								}).fail(function(jqXHR, textStatus, errorThrown) {
									return callback(new Error((errorThrown && errorThrown.message) || textStatus));
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
						return Q.when(sandbox.main(options), result.resolve, result.reject);
					} catch(err) {
						return result.reject(err);
					}
				}, result.reject);

				return result.promise;
			});

	    })), function() {
			if (callback) return callback(null);
		}, function(err) {
			if (callback) return callback(err);
		});
	}

	if (typeof mocha !== "undefined") {
		mocha.setup("tdd");
	    describe("run-all", function() {
	    	this.timeout(10 * 1000);
	    	run();
	    });
	} else {
		$(document).ready(function() {

			$.get("../../loader.min.js", function(data) {
				$("#loader-min").html(data.replace(/</g, "&#60;"));
			}, "text");
			$.get("loader.min.js-size", function(data) {
				$("#loader-min-size").html(data);
			}, "text");
		    $.get("loader.min.js.gz-size", function(data) {
		        $("#loader-min-gz-size").html(data);
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
