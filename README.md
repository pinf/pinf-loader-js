Optimized JavaScript Bundle Loader
==================================

[![Circle CI](https://circleci.com/gh/pinf/pinf-loader-js.svg?style=svg)](https://circleci.com/gh/pinf/pinf-loader-js)
[![Build Status](https://secure.travis-ci.org/pinf/pinf-loader-js.svg)](http://travis-ci.org/pinf/pinf-loader-js)

The `PINF JavaScript Loader` is part of the [PINF Platform for JavaScript](http://pinf.js.org/)
and is a tiny optimized *(intended for production use)* **CommonJS package mappings** 
based **JavaScript module loader** for the browser.

  * Mailing list: [groups.google.com/group/pinf](http://groups.google.com/group/pinf)

**Online Demo: [pinf.js.org/pinf-loader-js/](https://pinf.js.org/pinf-loader-js/)** ([Code Coverage](https://pinf.js.org/pinf-loader-js/workspace/www/coverage/firefox/dist/loader-full.browser.js.html))


Why
===

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

The `PINF JavaScript Loader` is intended to run your application in **development** and **production** and may be fed
by various `Bundlers` (see above).


What
====

The `PINF JavaScript Loader` provides a **minimal CommonJS environment** that requests **optimized static JavaScript code files** 
called **Bundles** from a server using **SCRIPT injection (GET requests)** and boots these into sandboxes in the browser identified by the requested URL.

### Supported Environments

  * Browser:
      * Firefox 3.6+
      * Google Chrome 
      * Internet Explorer 6+
      * Safari 5+
      * Opera
      * iPad
      * iPhone
      * Android
  * Web Worker

### Supported Features

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
    * `[global.]require.sandbox(SandboxURI, SandboxOptions, function loaded(sandbox) {}, function error(e) {})`
    * `[global.]require.sandbox.id` to hold *SandboxURI*
    * `sandbox.main()`
    * `require.bundle("BundleIdentifier", function ConsistentModuleSet(require) {})`


Usage
=====

**http://localhost/index.html**
```
<script src="dist/loader-core.js"></script>
<script>
    PINF.sandbox("app.js", function (sandbox) {
        sandbox.main();
    });
</script>
```

**http://localhost/app.js**
```
PINF.bundle("", function (require) {
    require.memoize("/main.js", function (require, exports, module) {
        exports.main = function () {
            console.log("HelloWorld!");
        }
    });
});
```

Examples
--------

There are various feature examples that double as tests in `./features`.

For an online demo of these loader features see [pinf.js.org/pinf-loader-js/](https://pinf.js.org/pinf-loader-js/).

Integrate
---------

There are adapters for streamlined integration with other tools:

  * [RequireJS](http://requirejs.org/) plugin: [github.com/pinf/pinf-for-requirejs](https://github.com/pinf/pinf-for-requirejs) (status: *DEV*)
  * [NodeJS](http://nodejs.org/) package: [github.com/pinf/pinf-for-nodejs](https://github.com/pinf/pinf-for-nodejs) (status: *DEV*)
  * [jQuery](http://jquery.com/) plugin: [github.com/pinf/pinf-for-jquery](https://github.com/pinf/pinf-for-jquery) (status: *DEV*)

Bundlers
--------

Applications may be *coded directly in the bundle format*. Alternatively the bundle format may be treated as a **compile target** (typical).
The following tools can generate `PINF JavaScript Loader` compatible bundles:

  * [PINF.it Bundler](https://github.com/pinf-it/pinf-it-bundler) (status: *DEV*)
    
    Supports:
    
      * [NodeJS Modules](http://nodejs.org/docs/latest/api/modules.html)
      * [CommonJS Modules (CJS)](http://wiki.commonjs.org/wiki/Modules/1.1)
      * [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/wiki/AMD)
      * Plain old JavaScript
      * Various other formats


Tips
====

  * When testing an application use the `./dist/loader-full.browser.js` file to get all error messages.
  * When deploying a standalone loader us the `./loader-core.browser.min.gz` or `./loader-core.browser.min.br` files for optimum performance.
  * When using a different loader during development make sure only supported API features
    of this loader are used. Load extra features along with your application by
    [augmenting a sandbox](https://github.com/pinf/pinf-loader-js/blob/master/features/10-Sandbox.js).
  * When writing or generating bundles make sure one consistent set of statically linked modules
    is contained in each bundle file. Dynamic links to other modules or bundles must be made using
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
[augmenting a sandbox](https://github.com/pinf/pinf-loader-js/blob/master/features/10-Sandbox.js).

Why does the loader not support [AMD-style Loader Plugins](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins)?
-------------------------------------------------------------------------------------------------------------------

Because loader plugins that are invoked by modifying the string literal passed to `require()` are not necessary
and combine two concepts that should really be separate and implemented differently.

The AMD-style Loader Plugins can be replaced by:

  * [Augmenting a sandbox](https://github.com/pinf/pinf-loader-js/blob/master/features/10-Sandbox.js)
  * Loading helper modules within the application.
  * Using a loader that can run package-declared plugins.
  * Using a server helper to run plugins as modules are requested.

*NOTE: Modules using some of the RequireJS loader plugins can be automatically converted to run on this loader using
[github.com/pinf-it/pinf-it-bundler](http://github.com/pinf-it/pinf-it-bundler).*

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
  * [CommonJS/Modues/2.0draft8 (draft)](http://www.page.ca/~wes/CommonJS/modules-2.0-draft8/)
  * [CommonJS/Packages/1.1 (draft)](http://wiki.commonjs.org/wiki/Packages/1.1)
  * [CommonJS/Packages/Mappings/C (proposal)](http://wiki.commonjs.org/wiki/Packages/Mappings/C)
  * [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/wiki/AMD)

**Prior Art:**

  * https://github.com/unscriptable/curl
  * https://github.com/jrburke/almond
  * https://github.com/jrburke/requirejs
  * http://code.google.com/p/bravojs/
  * https://github.com/NobleJS/Noble-Modules
  * https://github.com/pinf/loader-js
  * https://github.com/kriszyp/nodules


Test & Development
==================

Requirements:

  * [nvm](https://github.com/creationix/nvm)

Install:

    nvm use
    npm install

Run tests:

    # Headless Chrome
    npm test

    # Firefox, Chrome, Safari
    npm run test-all

Launch development workspace (uses [puppeteer](https://github.com/GoogleChrome/puppeteer)):

    npm run dev

Then make changes to source code and browser page will reload.

To make a release use:

    npm run release

This will first build the `dist/` files (via `npm run build`) and then increment, tag, push and publish.


Provenance
==========

Original source logic under [Zero-Clause BSD](https://opensource.org/licenses/0BSD) by [Christoph Dorn](http://christophdorn.com) since 2011.
