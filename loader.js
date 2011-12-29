/**
 * Copyright: Christoph Dorn <christoph@christophdorn.com>
 * License: MIT
 */

// NOTE: Remove lines marked /*DEBUG*/ when compiling loader for 'min' release!

// Ignore all globals except for `require`, `exports` and `sourcemint`.
// Declare `require` global but ignore if it already exists.
var require;
// Set `sourcemint` global no matter what.
var sourcemint = null;
// Combat pollution if used via <script> tag.
(function (global, document) {

	var Module = function(sandbox, identifier, dependencies, initializer) {

		var identifierSegment = identifier.replace(/\/[^\/]*$/, "/").split("/"),
			module = {
				id: [sandbox.id, identifier],
				exports: {}
			};
		
		module.require = function(moduleIdentifier) {
			if (/^\./.test(moduleIdentifier)) {
				var segments = moduleIdentifier.replace(/^\.\//, "").split("../");
				moduleIdentifier = identifierSegment.slice(0, identifierSegment.length-segments.length-1) + "/" + segments[segments.length-1];
				return sandbox.require(moduleIdentifier + ".js").exports;
			} else {
				/*DEBUG*/ throw new Error("Only relative identifiers are supported at this time!");
			}
		};

		module.load = function() {
			if (typeof initializer === "function") {
				initializer(module.require, module.exports, {
					id: module.id
				});
			} else {
				module.exports = initializer;
			}
		}

		return module;
	};


	// A set of modules working together.
	var Sandbox = function(programIdentifier, loadedCallback) {

		var moduleInitializers = {},
			initializedModules = {},
			descriptor = {},
			sandbox = {
				id: programIdentifier
			};
		
		sandbox.memoize = function(canonicalModuleIdentifier, moduleDependencies, moduleInitializer) {
			moduleInitializers[canonicalModuleIdentifier] = [moduleDependencies, moduleInitializer];
		}

		// All memoize() calls for a consistent set of modules have been made
		sandbox.memoized = function(canonicalModuleIdentifier, moduleInitializer) {
			/*DEBUG*/ if (!moduleInitializers["/package.json"]) {
			/*DEBUG*/ 	throw new Error("'/package.json' not found in sandbox '" + sandbox.id + "'!");
			/*DEBUG*/ }
			descriptor = moduleInitializers["/package.json"][1];
			loadedCallback(this);
		}

		// Get a module and initialize it if it is not already so
		sandbox.require = function(moduleIdentifier) {
			if (!initializedModules[moduleIdentifier]) {
				/*DEBUG*/ if (!moduleInitializers[moduleIdentifier]) {
				/*DEBUG*/ 	throw new Error("Module '" + moduleIdentifier + "' not found in sandbox '" + sandbox.id + "'!");
				/*DEBUG*/ }
				initializedModules[moduleIdentifier] = Module(sandbox, moduleIdentifier, moduleInitializers[moduleIdentifier][0], moduleInitializers[moduleIdentifier][1]);
				initializedModules[moduleIdentifier].load();
			}
			return initializedModules[moduleIdentifier];
		}

		// Call the 'main' module of the program
		sandbox.main = function(options) {
			/*DEBUG*/ if (typeof descriptor.main !== "string") {
			/*DEBUG*/ 	throw new Error("No 'main' property declared in '/package.json' in sandbox '" + sandbox.id + "'!");
			/*DEBUG*/ }
			var main = sandbox.require(descriptor.main);
			/*DEBUG*/ if (typeof descriptor.main !== "string") {
			/*DEBUG*/ 	throw new Error("Main module '" + descriptor.main + "' does not export 'main()' in sandbox '" + sandbox.id + "'!");
			/*DEBUG*/ }
			return main.exports.main(options);
		};		
		
		sourcemint.load(programIdentifier);

		return sandbox;
	};


	// The global `require` for the 'external' (to the loader) environment.
	var Loader = function() {

		var sandboxes = {},
			lastMemoizeSandbox = null,
			require = {
			// TODO: @see URL_TO_SPEC
			supports: "ucjs2-pinf-0"
		};

		// Create a new environment to memoize modules to.
		require.sandbox = function(programIdentifier, loadedCallback) {
			return sandboxes[programIdentifier] = Sandbox(programIdentifier, loadedCallback);
		}

		// Record module in sandbox
		require.memoize = function(canonicalModuleIdentifier, moduleDependencies, moduleInitializer) {
			/*DEBUG*/ if (!sandboxes[canonicalModuleIdentifier[0]]) {
			/*DEBUG*/ 	throw new Error("Cannot memoize module as sandbox not found!", canonicalModuleIdentifier);
			/*DEBUG*/ }
			lastMemoizeSandbox = sandboxes[canonicalModuleIdentifier[0]];
			lastMemoizeSandbox.memoize(canonicalModuleIdentifier[1], moduleDependencies, moduleInitializer);
		}

		// Notify that a consistent set of modules has been memoized
		require.memoized = function() {
			lastMemoizeSandbox.memoized();
		}

		return require;
	}


	sourcemint = Loader();


	// These may be overwritten by the environment of the loader.
	// Defaults to browser use.
	// @credit https://github.com/unscriptable/curl/blob/62caf808a8fd358ec782693399670be6806f1845/src/curl.js#L319-360
	var _head = null;
	sourcemint.load = function(uri) {
		if (_head === null) {
			_head = document.getElementsByTagName("head")[0];
		}
		uri = document.location.protocol + "//" + document.location.host + uri;
		var element = document.createElement("script");
		element.type = "text/javascript";
		element.onerror = function(e) {
			/*DEBUG*/ throw new Error("Syntax error or http error: " + uri);
		}
		element.charset = "utf-8";
		element.async = true;
		element.src = uri;
		_head.insertBefore(element, _head.firstChild);
	}


	// Ignore `require` global if already exists.
    if (!require) {
        require = sourcemint;
    }

	// Export `require` for CommonJS if `exports` global exists.
	if (typeof exports === "object") {
		exports.require = sourcemint;
	}

}(this, document));
