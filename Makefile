JS_SOURCE_FILES += $(shell PATH="$(PATH)" git-find '*.ts')

################################################################################

-include .makefiles/Makefile
-include .makefiles/pkg/js/v1/Makefile
-include .makefiles/pkg/js/v1/with-yarn.mk

.makefiles/%:
	@curl -sfL https://makefiles.dev/v1 | bash /dev/stdin "$@"

################################################################################

# # bundlesize --- Check bundle sizes against pre-defined budgets.
# .PHONY: bundlesize
# bundlesize: artifacts/bundlesize.touch

# # ci --- Perform tasks that should be run as part of continuous integration.
# .PHONY: ci
# ci:: artifacts/bundlesize.touch

# # precommit --- Perform tasks that need to be executed before committing.
# .PHONY: precommit
# precommit:: artifacts/bundlesize.touch

# # run --- Run the application locally.
# .PHONY: run
# run: webpack-serve

# # webpack-serve --- Run the Webpack development server.
# .PHONY: webpack-serve
# webpack-serve: node_modules
# 	node_modules/.bin/webpack serve

################################################################################

# artifacts/bundlesize.touch: artifacts/vite/build/production
# 	GITHUB_TOKEN= node_modules/.bin/bundlesize

# 	@mkdir -p "$(@D)"
# 	@touch "$@"

# artifacts/site: artifacts/vite/build/production README.md
# 	@rm -rf "$@"
# 	@mkdir -p "$(@D)"

# 	cp -a "$<" "$@"
# 	cp README.md "$@"
# 	touch "$@/.nojekyll"
