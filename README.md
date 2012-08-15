Optimized [PINF](http://pinf.org/)/[CommonJS](http://commonjs.org/) Loader for JavaScript
=========================================================================================

*Status: ALPHA* [![Build Status](https://secure.travis-ci.org/sourcemint/loader-js.png)](http://travis-ci.org/sourcemint/loader-js)

The `Sourcemint JavaScript Loader` is an optimized *(intended for production use)* **CommonJS package mappings** 
based **JavaScript module loader** for the browser in only **1720 bytes** *(minified and zipped)*.

  * Copyright: 2011 [Christoph Dorn](http://www.christophdorn.com/)
  * Code License: [MIT](http://www.opensource.org/licenses/mit-license.php) and [MPL](http://mozilla.org/MPL/2.0/)
  * Docs License: [Creative Commons Attribution-NonCommercial-ShareAlike 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/)
  * Sponsor: [Sourcemint](http://sourcemint.com/)
  * Mailing list: [groups.google.com/group/sourcemint](http://groups.google.com/group/sourcemint)

**Online Demo: [sourcemint.github.com/loader-js/workspace/www](http://sourcemint.github.com/loader-js/workspace/www/index.html)**

**Examples: [github.com/sourcemint/examples-js](http://github.com/sourcemint/examples-js/)**


What
----

The `Sourcemint JavaScript Loader` provides a **minimal CommonJS environment** that requests **optimized static JavaScript code files** 
called **Bundles** from a server via **GET requests** and boots these into sandboxes in the browser identified by the requested URL.

Supported Environments:

  * Browser:
      * Firefox
      * Google Chrome
      * Internet Explorer
        * **BUG** [https://github.com/sourcemint/loader-js/issues/1](https://github.com/sourcemint/loader-js/issues/1)
      * Safari
      * Opera
	    * **BUG:** [https://github.com/sourcemint/loader-js/issues/8](https://github.com/sourcemint/loader-js/issues/8)

Supported features:

  * Load bundled JavaScript programs from static URLs
  * Asynchronously load more program code bundles as needed
  * Load bundles cross-domain
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
    * `require.id(ModuleIdentifierString)` (returns *PackageIdentifier/ModuleIdentifier*)
  * [(Un)CommonJS(kriskowal)/Modules](https://github.com/kriskowal/uncommonjs/blob/master/modules/specification.md)
    * `require.async(ModuleIdentifierString, function loaded(ModuleAPI) {}, function error(e) {})`
  * Proposed:
    * `[global.]require.sandbox(SandboxURI, function loaded(sandbox) {}, SandboxOptions)`
    * `[global.]require.sandbox.id` to hold *SandboxURI*
    * `sandbox.main()`
    * `require.bundle("BundleIdentifier", function ConsistentModuleSet(require) {})`

Applications may be **coded directly in the bundle format**. Alternatively the bundle format may be treated as a **compile target**.
The following tools can generate `Sourcemint JavaScript Loader` compatible bundles:

  * [Sourcemint NodeJS Platform](https://github.com/sourcemint/platform-nodejs)
    
    Supports:
    
      * [NodeJS Modules](http://nodejs.org/docs/latest/api/modules.html)
      * [CommonJS Modules (CJS)](http://wiki.commonjs.org/wiki/Modules/1.1)
      * [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/wiki/AMD)


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

In Browser
----------

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

On Server
---------

`./index.js`

    var LOADER = require("sourcemint-platform-nodejs/loader");  // NPM package
    
    LOADER.sandbox("./app.js", function(sandbox)
    {
        sandbox.main();
    });

`./app.js`

    require.bundle("", function(require)
    {
        require.memoize("/main.js", function(require, exports, module)
        {
            var __filename = require.sandbox.id + "/main.js";
            var __dirname = require.sandbox.id + "";

            exports.main = function(options)
            {
                console.log("HelloWorld!");
            }
        });
    });


Tests
-----

The command-line test suite for the loader uses the [Sourcemint NodeJS Platform](https://github.com/sourcemint/platform-nodejs)
to bootstrap the loader for [NodeJS](http://nodejs.org/).

    git clone git://github.com/sourcemint/loader-js.git sourcemint-loader-js
    cd sourcemint-loader-js
    npm install
    npm test


Examples
========

There are various examples that double as unit tests in `./examples`.

For an online demo of the loader features see [sourcemint.github.com/loader-js/workspace/www](http://sourcemint.github.com/loader-js/workspace/www/index.html).

For end-user examples of common use-cases see [github.com/sourcemint/examples-js](http://github.com/sourcemint/examples-js/).

More examples and documentation will be available in time.


Tips
====

  * When testing an application use the `./loader.js` file to get all error messages.
  * When deploying an application us the `./loader.min.gz` file for optimum performance.
  * When using a different loader during development make sure only supported API features
    of this loader are used. Load extra features along with your application by
    [augmenting a sandbox](https://github.com/sourcemint/loader-js/blob/master/examples/10-Sandbox.js).
  * When writing or generating bundles make sure one consistent set of statically linked modules
    is contained in each bundle file. Dynamic links to other modules or bundles must be made via
    `require.async()` or `require.sandbox()` respectively. The hierarchy of how your application nests
    these dynamic links will determine which modules must be included in subsequently loaded bundles
    to avoid sending the same modules twice.
  * A module can only be memoized once for each *Canonical Identifier* (comprising of *SandboxIdentifier/PackageIdentifier/ModuleIdentifier*).
    When placing modules into bundles make sure bundle filenames do not overlap with module filenames (and the reverse) as these 
    have the potential to conflict (modules and bundles share the same logical file hierarchy). The idea is that a set of statically 
    linked modules can always be combined into one file which is placed into the file that first requires the dependencies 
    and represents the entry point into the bundle.


FAQ
===

Why does the loader not support feature X?
------------------------------------------

This loader is pretty much complete in terms of what needs to be implemented at the core
loader level. Convenience features can be loaded along with the application by
[augmenting a sandbox](https://github.com/sourcemint/loader-js/blob/master/examples/10-Sandbox.js).

Why does the loader not support [AMD-style Loader Plugins](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins)?
-------------------------------------------------------------------------------------------------------------------

Because loader plugins that are invoked by modifying the string literal passed to `require()` are not necessary
and combine two concepts that should really be separate and implemented differently. For more information see
[this discussion](http://groups.google.com/group/requirejs/browse_thread/thread/3a06691288655a74).

The AMD-style Loader Plugins can be replaced by:

  * [Augmenting a sandbox](https://github.com/sourcemint/loader-js/blob/master/examples/10-Sandbox.js)
  * Loading helper modules within the application.
  * Using a loader that can run package-declared plugins.
  * Using a server helper to run plugins as modules are requested.

*NOTE: Modules using some of the RequireJS loader plugins can be automatically converted to run on this loader using
[github.com/sourcemint/sdk-requirejs](http://github.com/sourcemint/sdk-requirejs/).*

How does the loader compare to [almond](https://github.com/jrburke/almond)?
----------------------------------------------------------------------------------------------

While the [RequireJS](https://github.com/jrburke/requirejs) + 
[almond](https://github.com/jrburke/almond) combination focuses on loading of optimized [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
formatted modules this loader focuses on loading of optimized [CJS](http://wiki.commonjs.org/wiki/Modules/1.1) formatted modules.

The *AMD Specification* is a small subset combining several *CommonJS Concepts* in a different form.

*CommonJS* represents a more pure and modular approach to devising arbitrary JavaScript application architectures by
carefully layering a few core concepts into a framework that provides one small existential foundation
for all other concepts. It allows for isolated namespaces, nested package dependency structures and runtime sandboxes 
as well as automatic conversion from source trees to optimized bundles. This loader is one *existential foundation implementation*
and fully compatible with the *CommonJS Concepts*.

In contrast *RequireJS + almond* focuses on optimally loading (primarily into the browser) a list of packages containing 
JavaScript modules and resource files into a single namespace. In optimized form (for *almond*), several 
key *RequireJS* features are not supported.


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

**Discussions:**

  * [groups.google.com/group/commonjs - Introducing the Sourcemint JavaScript Loader](http://groups.google.com/group/commonjs/browse_thread/thread/153ff1a966e56cb)
  * [groups.google.com/group/requirejs - Alternative production loader to almond](http://groups.google.com/group/requirejs/browse_thread/thread/3a06691288655a74)
  * [groups.google.com/group/firebug-working-group - Better Firebug Loader & Module Packaging](https://groups.google.com/d/topic/firebug-working-group/qWR1wdB-WQA/discussion)


Contribute
==========

To work on the loader use the `./workspace/` (**Development Workspace**). Instructions on how to launch it on your local
system can be found here: 
[https://github.com/sourcemint/loader-js/tree/master/workspace](https://github.com/sourcemint/loader-js/tree/master/workspace)

When done send a pull request.
