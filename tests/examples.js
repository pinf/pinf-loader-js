
var LOADER = require("../loader"),
	Q = require("q"),
	LOADER = require("sourcemint-platform-nodejs/lib/loader"),
    ERROR = require("sourcemint-platform-nodejs/lib/util/error");


exports.main = function(API, options)
{
	API = API || {};
	API.LOADER = API.LOADER || LOADER;

	options = options || {};
    if (typeof options.debug === "undefined")
    {
        options.debug = true;
    }

	var deferred = Q.defer();

	function logToOutput(moduleObj, arguments)
	{
		var args = [],
			i;
		for (i in arguments) {
			args.push(arguments[i]);
		}
		console.log.apply(null, ["[" + moduleObj.require.sandbox.id + " : " + moduleObj.id + "]"].concat(args));
	}
	
	function logError()
	{
		var args = [],
			i;
		for (i in arguments) {
			args.push(arguments[i]);
		}
		if (typeof args[0] === "object" && typeof args[0].stack !== "undefined") {
			args.push(args[0].stack);
		}
		console.error.apply(null, ["[01-PortableLoaderTests]"].concat(args));
	}

	var done = Q.ref();

	(options.uris || [
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
		"NamedBundle",
		"Avoid-NestedBundles",
		"Avoid-SplitBundles"
	].map(function(name)
	{
		return "github.com/sourcemint/loader-js/0/-raw/examples/" + name + ".js";
	})).forEach(function(uri)
	{
		done = Q.when(done, function()
		{
			var result = Q.defer();
			
			try
			{
				API.LOADER.sandbox(uri, function(sandbox)
				{
					try {
						Q.when(sandbox.main(options), result.resolve, result.reject);
					} catch(e) {
						result.reject(e);
					}
				}, {
					onInitModule: function(moduleInterface, moduleObj)
					{
						moduleObj.require.API = {
							Q: Q,
							JQUERY: function(callback) {
								callback({
									get: function(uri, callback)
									{
										LOADER.resolveURI(uri, function(err, uri)
										{
											if (err)
											{
												throw err;
											}
											LOADER.loadBundleCode(uri, function(err, code)
											{
												if (err)
												{
													throw err;
												}
												callback(code);
											});
										});
									}
								});
							}
						};
						moduleInterface.log = function()
						{
							logToOutput(moduleObj, arguments);
						};
						moduleInterface.logForModule = function(moduleObj, arguments)
						{
							logToOutput(moduleObj, arguments);
						};
					}
				});
			}
			catch(e)
			{
				console.error(e);
				result.reject(e);
			}
		
			return result.promise;
		});
	});

	Q.when(done, function()
	{
	
		console.log(API.LOADER.getReport());

		deferred.resolve();
		
	}, function(e)
	{
		logError(e);

		deferred.reject(e);
	});
	
	return deferred.promise;
}


if (require.main === module)
{
    Q.call(exports.main).fail(ERROR.exitProcessWithError);
}
