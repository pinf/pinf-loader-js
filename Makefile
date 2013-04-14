
REPORTER ?= list

test:
	@if [ ! -d "node_modules" ]; then npm install; fi
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		test/*.js

run-dev:
	@if [ ! -d "node_modules" ]; then npm install; fi
	@if [ ! -d "workspace/node_modules" ]; then cd workspace; npm install; fi
	@node workspace

build:
	@if [ ! -d "node_modules" ]; then npm install; fi
	@node scripts/build

publish-www:
	git checkout gh-pages
	git merge master
	git checkout master
	git push origin

.PHONY: test run-dev build publish-www
