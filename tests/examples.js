
var LOADER = require("../loader"),
	Q = require("q");


exports.main = function(API)
{
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
	
	[
		"01-HelloWorld",
		"02-ReturnExports",
		"03-SpecifyMain",
		"04-PackageLocalDependencies",
		"05-CrossPackageDependencies",
		"07-JsonModule",
		"08-TextModule",
		"09-ResourceURI",
		"10-NamedBundle",
		"11-LoadBundle",
		"12-Sandbox",
		"13-CrossDomain",
		"14-Environment",
		"Avoid-NestedBundles",
		"Avoid-SplitBundles"
	].forEach(function(name)
	{
		done = Q.when(done, function()
		{
			var result = Q.defer();
			
			try
			{
				API.LOADER.sandbox("github.com/sourcemint/loader-js/0/-raw/examples/" + name + ".js", function(sandbox)
				{
					try {
						Q.when(sandbox.main(), result.resolve, result.reject);
					} catch(e) {
						result.reject(e);
					}
				}, {
					onInitModule: function(moduleInterface, moduleObj)
					{
						moduleObj.require.API = {
							Q: Q
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
