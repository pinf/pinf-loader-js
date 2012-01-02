Optimized [PINF](http://pinf.org/)/[CommonJS](http://commonjs.org/) Loader for JavaScript
=========================================================================================

*Status: DEV*

The `Sourcemint JavaScript Loader` is an optimized *(intended for production use)* **CommonJS package mappings** based **JavaScript module loader** for the browser in only **1100 bytes** *(minified and zipped)*.

  * Copyright: 2011 [Christoph Dorn](http://www.christophdorn.com/)
  * Code License: [MIT License](http://www.opensource.org/licenses/mit-license.php)
  * Docs License: [Creative Commons Attribution-NonCommercial-ShareAlike 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/)
  * Sponsor: [Sourcemint](http://sourcemint.com/)
  * Mailing list: [groups.google.com/group/pinf-dev](http://groups.google.com/group/pinf-dev/)

**Demo: [sourcemint.github.com/loader-js/workspace/www](http://sourcemint.github.com/loader-js/workspace/www/index.html)**


What
----

The `Sourcemint JavaScript Loader` provides a **minimal CommonJS environment** that requests **optimized static JS code files** *(bundles containing modules)* from a server via **GET requests** and boots these into sandboxes in the browser identified by the requested URL.

Supported features:

  * *TODO*

Supported Browsers:

  * *TODO*


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

The `Sourcemint JavaScript Loader` is intended to run your application in **production**. To generate bundles for your application
from a project source tree and its dependencies you can use:

  * [PINF JavaScript Loader](https://github.com/pinf/loader-js)

    Supports: CJS & AMD

	*TODO: Development & build instructions.*


Usage
=====

`http://localhost/index.html`

	<script type="text/javascript" src="loader.js"></script>
	<script type="text/javascript">
		require.sandbox(/localhost/app.js", function(program)
		{
			program.main();
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


Links
=====

**Influential Specifications**

  * [CommonJS/Modues/1.1.1 (approved)](http://wiki.commonjs.org/wiki/Modules/1.1.1)
  * [CommonJS/Modues/2.0draft8 (draft)](http://www.page.ca/~wes/CommonJS/modules-2.0-draft8/) with changes that will become `CommonJS/Modues/2/B`
  * [CommonJS/Packages/1.1 (draft)](http://wiki.commonjs.org/wiki/Packages/1.1) with changes that will become `CommonJS/Packages/1.2`
  * [CommonJS/Packages/Mappings/C (proposal)](http://wiki.commonjs.org/wiki/Packages/Mappings/C) with changes that will become `Packages/Mappings/E`

**Prior Art**

  * https://github.com/unscriptable/curl
  * https://github.com/jrburke/almond
  * https://github.com/jrburke/requirejs
  * http://code.google.com/p/bravojs/
  * https://github.com/NobleJS/Noble-Modules
  * https://github.com/pinf/loader-js
  * https://github.com/kriszyp/nodules
