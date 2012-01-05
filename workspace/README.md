Development Workspace
=====================

Launch this workspace to work on the loader.

Requirements
------------

	npm install -g pinf-loader-js

Run
---

	commonjs -v --script serve ./ -v --port 8080 ./
	open http://localhost:8080/


Workflow
========

Make changes to source files and refresh browser.

**NOTE:** The following files are automatically generated every time `../loader.js` changes:

  * `../loader.min.js`
  * `../loader.min.js.gz`
  * `../loader.stripped.js`
  * `./www/loader.min.js.gz-size`
  * `./www/loader.stripped.js.md5`
