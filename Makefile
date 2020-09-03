-include .makefiles/Makefile
-include .makefiles/pkg/js/v1/Makefile
-include .makefiles/pkg/js/v1/with-yarn.mk
-include .makefiles/pkg/js/v1/with-webpack.mk

.makefiles/%:
	@curl -sfL https://makefiles.dev/v1 | bash /dev/stdin "$@"

################################################################################

# bundlesize --- Check bundle sizes against pre-defined budgets.
.PHONY: bundlesize
bundlesize: artifacts/bundlesize.touch

# ci --- Perform tasks that should be run as part of continuous integration.
.PHONY: ci
ci:: artifacts/bundlesize.touch

# precommit --- Perform tasks that need to be executed before committing.
.PHONY: precommit
precommit:: artifacts/bundlesize.touch

# run --- Run the application locally.
.PHONY: run
run: webpack-dev-server

# webpack-dev-server --- Run the Webpack development server.
.PHONY: webpack-dev-server
webpack-dev-server: node_modules
	node_modules/.bin/webpack-dev-server --hot

################################################################################

artifacts/bundlesize.touch: artifacts/webpack/build/production
	GITHUB_TOKEN= node_modules/.bin/bundlesize

	@mkdir -p "$(@D)"
	@touch "$@"

artifacts/site: artifacts/webpack/build/production README.md
	@mkdir -p "$(@D)"

	cp -a "$<" "$@"
	cp README.md "$@"
