Optimized [PINF](http://pinf.org/)/[CommonJS](http://commonjs.org/) Loader for JavaScript
=========================================================================================

*Status: ALPHA*

The `Sourcemint JavaScript Loader` is an optimized *(intended for production use)* **CommonJS package mappings** 
based **JavaScript module loader** for the browser in only **1150 bytes** *(minified and zipped)*.

  * Copyright: 2011 [Christoph Dorn](http://www.christophdorn.com/)
  * Code License: [MIT License](http://www.opensource.org/licenses/mit-license.php)
  * Docs License: [Creative Commons Attribution-NonCommercial-ShareAlike 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/)
  * Sponsor: [Sourcemint](http://sourcemint.com/)
  * Mailing list: [groups.google.com/group/pinf-dev](http://groups.google.com/group/pinf-dev/)

**Demo: [sourcemint.github.com/loader-js/workspace/www](http://sourcemint.github.com/loader-js/workspace/www/index.html)**


What
----

The `Sourcemint JavaScript Loader` provides a **minimal CommonJS environment** that requests **optimized static JavaScript code files** 
called **Bundles** from a server via **GET requests** and boots these into sandboxes in the browser identified by the requested URL.

Supported Environments:

  * Browser:
      * Firefox
      * Google Chrome
      * Internet Explorer
      * Safari
      * Opera

Supported features:

  * Load bundled JavaScript programs from static URLs
  * Asynchronously load more program code bundles as needed
  * Isolated module scopes
  * Isolated package namespaces
  * Isolated sandbox namespaces
  * Nested and circular dependency trees
  * Consistent mapping of static application resource URLs to loader namespaces
  * [CommonJS/Modues/1.1](http://wiki.commonjs.org/wiki/Modules/1.1)
    * `function(require, exports, module) {}`
    * `var ModuleAPI = require("./Module")`
  * [CommonJS/Packages/Mappings/C (proposal)](http://wiki.commonjs.org/wiki/Packages/Mappings/C)
    * `package.json ~ {mappings:{"PackageAlias": "PackageIdentifier"}}`
    * `var ModuleAPI = require("PackageAlias/Module")`
  * [CommonJS/Modues/2.0draft8 (draft)](http://www.page.ca/~wes/CommonJS/modules-2.0-draft8/)
    * `global.require.memoize("PackageIdentifier/ModuleIdentifier", ModuleInitializer)` (no dependency argument)
    * `require.uri(ModuleIdentifierString)` (returns `["SandboxURI", "PackageIdentifier/ModuleIdentifier"]`)
  * [(Un)CommonJS(kriskowal)/Modules](https://github.com/kriskowal/uncommonjs/blob/master/modules/specification.md)
    * `require.async(ModuleIdentifierString, function loaded(ModuleAPI) {}, function error(e) {})`
  * Proposed:
    * `[global.]require.sandbox(SandboxURI, function loaded(sandbox) {}, SandboxOptions)`
    * `sandbox.main()`
    * `require.bundle("BundleIdentifier", function ConsistentModuleSet(require) {})`

Applications may be **coded directly in the bundle format**. Alternatively the bundle format may be treated as a **compile target**.
The following tools can generate `Sourcemint JavaScript Loader` compatible bundles:

  * [PINF JavaScript Loader](https://github.com/pinf/loader-js) (**JUST ABOUT FUNCTIONAL: DOCS COMING SOON**)

    Supports:

	  * [CommonJS Modules (CJS)](http://wiki.commonjs.org/wiki/Modules/1.1)
	  * [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/wiki/AMD)

	Dynamically generates bundles for your application from a project source tree and its dependencies.


Why
---

Namespace isolation is essential for modular development when integrating arbitrary JavaScript libraries.

To achieve namespace isolation you need JavaScript libraries written in conventions that:
  
  * do not pollute the global namespace and 
  * expose the library's API consistently

There are two evolving standards that specify such conventions:

  * [CommonJS Modules (CJS)](http://wiki.commonjs.org/wiki/Modules/1.1)
  * [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/wiki/AMD)

When coding using these standards you need to keep in mind the two primary environments that the application will run in:

  1) **Development** - Needs a loader that will, on demand, locate in the source tree, assemble and transport module source 
	 files to the browser for rapid development.

  2) **Production** - Needs a build step that collects modules from the source tree and generates static optimized bundles that will be fetched
	 by a loader optimized for production runtime performance.

The `Sourcemint JavaScript Loader` is intended to run your application in **production**. 


Usage
=====

`http://localhost/index.html`

	<script type="text/javascript" src="loader.js"></script>
	<script type="text/javascript">
		require.sandbox("app.js", function(sandbox)
		{
			sandbox.main();
		});
	</script>

`http://localhost/app.js`

	require.bundle("", function(require)
	{
		require.memoize("/main.js", function(require, exports, module)
		{
			exports.main = function(options)
			{
				console.log("HelloWorld!");
			}
		});
	});

For more examples see: [github.com/sourcemint/loader-js/tree/master/examples](https://github.com/sourcemint/loader-js/tree/master/examples)


Tips
====

  * When testing an application use the `./loader.js` file to get all error messages.
  * When deploying an application us the `./loader.min.gz` file for optimum performance.
  * When using a different loader during development make sure only supported API features
    of this loader are used. Load extra features along with your application by
    [augmenting a sandbox](https://github.com/sourcemint/loader-js/blob/master/examples/12-Sandbox.js).
  * When writing or generating bundles make sure one consistent set of statically linked modules
    is contained in each bundle file. Dynamic links to other modules or bundles must be made via
    `require.async()` or `require.sandbox()` respectively. The hierarchy of how your application nests
    these dynamic links will determine which modules must be included in subsequently loaded bundles
    to avoid sending the same modules twice.


FAQ
===

Why does the loader not support feature X?
------------------------------------------

This loader is pretty much complete in terms of what needs to be implemented at the core
loader level. Convenience features can be loaded along with the application by
[augmenting a sandbox](https://github.com/sourcemint/loader-js/blob/master/examples/12-Sandbox.js).

Why does the loader not support [AMD-style Loader Plugins](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins)?
-------------------------------------------------------------------------------------------------------------------

Because code that uses loader plugins that are triggered by modifying the string literal passed to `require()` cannot be
uniformly and easily optimized when generating bundles. Loader plugins require that:

  * They are present and can be executed when generating bundles.
  * Module/resource source code is bundled in a specific format potentially leading to duplicate source code in bundles.

Also, it is not necessary to have these kinds of loader plugins at the core loader level.

As an alternative it is trivial to load some extra convenience features within the application to do what you need.

How does the loader compare to [github.com/jrburke/almond](https://github.com/jrburke/almond)?
----------------------------------------------------------------------------------------------

While the [RequireJS](https://github.com/jrburke/requirejs) + 
[Almond](https://github.com/jrburke/almond) combination focuses on loading of optimized [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
formatted modules this loader focuses on loading of optimized [CJS](http://wiki.commonjs.org/wiki/Modules/1.1) formatted modules.

The *AMD Specification* is a small subset combining several *CommonJS Concepts* in a different form.

*CommonJS* represents a more pure and modular approach to devising arbitrary JavaScript application architectures by
carefully layering a few core concepts into a framework that provides one small existential foundation
for all other concepts. It allows for isolated namespaces, nested package dependency structures and runtime sandboxes 
as well as automatic conversion from source trees to optimized bundles. This loader is one *existential foundation implementation*
and fully compatible with the *CommonJS Concepts*.

In contrast *RequireJS + Almond* focuses on optimally loading a list of packages containing JavaScript modules and 
resource files primarily into the browser. In optimized form (for *Almond*), several key *RequireJS* features are not supported.


Links
=====

**Influential Specifications:**

  * [CommonJS/Modues/1.1 (approved)](http://wiki.commonjs.org/wiki/Modules/1.1)
  * [(Un)CommonJS(kriskowal)/Modules](https://github.com/kriskowal/uncommonjs/blob/master/modules/specification.md)
  * [CommonJS/Modues/2.0draft8 (draft)](http://www.page.ca/~wes/CommonJS/modules-2.0-draft8/) with changes that will become `CommonJS/Modues/2/B`
  * [CommonJS/Packages/1.1 (draft)](http://wiki.commonjs.org/wiki/Packages/1.1) with changes that will become `CommonJS/Packages/1.2`
  * [CommonJS/Packages/Mappings/C (proposal)](http://wiki.commonjs.org/wiki/Packages/Mappings/C) with changes that will become `Packages/Mappings/E`
  * [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/wiki/AMD)

**Prior Art:**

  * https://github.com/unscriptable/curl
  * https://github.com/jrburke/almond
  * https://github.com/jrburke/requirejs
  * http://code.google.com/p/bravojs/
  * https://github.com/NobleJS/Noble-Modules
  * https://github.com/pinf/loader-js
  * https://github.com/kriszyp/nodules


TODO
====

**Bugs:**

  * Internet Explorer needs further testing (at least one bug in dev UI or loader).
  * `./examples/DevUI.js#/lib/q.js` does not work in Opera:

		Error thrown at line 7, column 622 in <anonymous function: l>(a) in http://localhost:8080/workspace/www/q.min.js:
    		B.port2.postMessage()
		called from line 6, column 47 in g(a, b, d) in http://localhost:8080/workspace/www/q.min.js
		called from line 6, column 882 in v(a) in http://localhost:8080/workspace/www/q.min.js

  * `#output` tag in `http://localhost:8080/workspace/www/` does not render properly in `Safari`.

**Features:**

  * Download mirrors
  * Multiple hostnames
