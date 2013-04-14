
((function() {

	function run(callback) {

		var options = {
			debug: true
		};

	    return Q.when(Q.all([
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
			"Avoid-NestedBundles",
			"Avoid-SplitBundles"
		].map(function(name) {

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

				require.sandbox("../../examples/" + name + ".js", function(sandbox) {
					try {
						Q.when(sandbox.main(options), result.resolve, result.reject);
					} catch(e) {
						result.reject(e);
					}
				}, {
					onInitModule: function(moduleInterface, moduleObj) {
						moduleObj.require.API = {
							Q: Q,
							JQUERY: $
						};
						moduleInterface.log = function() {
							logToOutput(moduleObj, arguments);
						};
						moduleInterface.logForModule = function(moduleObj, arguments) {
							logToOutput(moduleObj, arguments);
						};
					}
				});

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
				$("#loader-min").html(data);
			}, "text");
			$.get("loader.min.js-size", function(data) {
				$("#loader-min-size").html(data);
			}, "text");
		    $.get("loader.min.js.gz-size", function(data) {
		        $("#loader-min-gz-size").html(data);
		    }, "text");

			run(function(err) {
				if (err) {
					console.error(err);
					$("#output").addClass("fail");
					$("#error-alert").show();
				} else {
					$("#output").addClass("success");
					$("#report").html(jsDump.parse(sourcemint.getReport()));
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
