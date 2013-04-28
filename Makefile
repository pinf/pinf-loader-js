
REPORTER ?= list

install-all:
	@if [ ! -d "node_modules" ]; then npm install; fi
	@if [ ! -d "workspace/node_modules" ]; then cd workspace; npm install; fi

test:
	@$(MAKE) install-all
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		test/*.js

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

.PHONY: install-all test run-dev build publish-www
