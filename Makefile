
REPORTER ?= list

install:
	@$(MAKE) install-all

install-all:
	@if [ ! -d "node_modules" ]; then npm install; fi
	@if [ ! -d "workspace/node_modules" ]; then cd workspace; npm install; fi

test:
	@$(MAKE) install-all
	@./node_modules/.bin/mocha --reporter $(REPORTER) test/features.js
	@if [ ! -z $(TRAVIS) ]; then make test-browsers; fi

test-browsers:
	@$(MAKE) install-all
	@./node_modules/.bin/mocha --reporter $(REPORTER) test/features-saucelabs.js

run-dev:
	@$(MAKE) install-all
	@node workspace

build:
	@$(MAKE) install-all
	@node scripts/build

publish-www:
	git checkout gh-pages
	git merge master
	git checkout master
	git push origin

.PHONY: install-all test test-browsers run-dev build publish-www
