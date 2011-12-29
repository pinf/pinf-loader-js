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

	var loadingSandboxIdentifiers = [],
		// @see https://github.com/unscriptable/curl/blob/62caf808a8fd358ec782693399670be6806f1845/src/curl.js#L69
		readyStates = { 'loaded': 1, 'interactive': 1, 'complete': 1 };

	function normalizeSandboxIdentifier(id) {
		return id.replace(/^[^:]*:\//, "").replace(/\.js$/, "");
	}

	var Module = function(sandbox, identifier, initializer) {

		var identifierSegment = identifier.replace(/\/[^\/]*$/, "/").split("/"),
			module = {
				id: [sandbox.id, identifier],
				exports: {}
			};
		
		// Statically link a module and its dependencies
		module.require = function(moduleIdentifier) {
			// Check for relative module path to module within same package
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
	var Sandbox = function(sandboxIdentifier, loadedCallback) {

		var moduleInitializers = {},
			initializedModules = {},
			descriptor = {},
			sandbox = {
				id: sandboxIdentifier
			};

		sandbox.memoize = function(moduleIdentifier, moduleInitializer) {
			moduleInitializers[moduleIdentifier] = moduleInitializer;
		}

		// Get a module and initialize it (statically link its dependencies) if it is not already so
		sandbox.require = function(moduleIdentifier) {
			if (!initializedModules[moduleIdentifier]) {
				/*DEBUG*/ if (!moduleInitializers[moduleIdentifier]) {
				/*DEBUG*/ 	throw new Error("Module '" + moduleIdentifier + "' not found in sandbox '" + sandbox.id + "'!");
				/*DEBUG*/ }
				initializedModules[moduleIdentifier] = Module(sandbox, moduleIdentifier, moduleInitializers[moduleIdentifier]);
				initializedModules[moduleIdentifier].load();
			}
			return initializedModules[moduleIdentifier];
		}

		// Call the 'main' module of the program
		sandbox.main = function(options) {
			/*DEBUG*/ if (typeof descriptor.main !== "string") {
			/*DEBUG*/ 	throw new Error("No 'main' property declared in '/package.json' in sandbox '" + sandbox.id + "'!");
			/*DEBUG*/ }
			/*DEBUG*/ if (typeof sandbox.require(descriptor.main).exports.main !== "function") {
			/*DEBUG*/ 	throw new Error("Main module '" + descriptor.main + "' does not export 'main()' in sandbox '" + sandbox.id + "'!");
			/*DEBUG*/ }
			return sandbox.require(descriptor.main).exports.main(options);
		};		

		sandbox.scriptTag = sourcemint.load(sandboxIdentifier + ".js", function() {
			// Assume a consistent statically linked set of modules has been memoized.
			loadingSandboxIdentifiers.shift();
			/*DEBUG*/ if (!moduleInitializers["/package.json"]) {
			/*DEBUG*/ 	throw new Error("'/package.json' not found in sandbox '" + sandbox.id + "'!");
			/*DEBUG*/ }
			descriptor = moduleInitializers["/package.json"];
			loadedCallback(sandbox);
		});

		loadingSandboxIdentifiers.push(sandboxIdentifier);

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
			var sandboxIdentifier = normalizeSandboxIdentifier(programIdentifier);
			return sandboxes[sandboxIdentifier] = Sandbox(sandboxIdentifier, loadedCallback);
		}

		// Record module in sandbox
		require.memoize = function(moduleIdentifier, moduleInitializer) {
			/*DEBUG*/ if (!sandboxes[loadingSandboxIdentifiers[0]]) {
			/*DEBUG*/ 	throw new Error("Cannot memoize module as sandbox not found!", loadingSandboxIdentifiers[0]);
			/*DEBUG*/ }
			lastMemoizeSandbox = sandboxes[loadingSandboxIdentifiers[0]];
			lastMemoizeSandbox.memoize(moduleIdentifier, moduleInitializer);
		}

		return require;
	}


	sourcemint = Loader();


	// These may be overwritten by the environment of the loader.
	// Defaults to browser use.
	// @credit https://github.com/unscriptable/curl/blob/62caf808a8fd358ec782693399670be6806f1845/src/curl.js#L319-360
	var _head = null;
	sourcemint.load = function(uri, loadedCallback) {
		if (_head === null) {
			_head = document.getElementsByTagName("head")[0];
		}
		uri = document.location.protocol + "/" + uri;
		var element = document.createElement("script");
		element.type = "text/javascript";
		element.onload = element.onreadystatechange = function(ev) {
			ev = ev || global.event;
			if (ev.type === "load" || readyStates[this.readyState]) {
				this.onload = this.onreadystatechange = this.onerror = null;
				loadedCallback();
			}
		}
		element.onerror = function(e) {
			/*DEBUG*/ throw new Error("Syntax error or http error: " + uri);
		}
		element.charset = "utf-8";
		element.async = true;
		element.src = uri;
		_head.insertBefore(element, _head.firstChild);
		return element;
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
