-include .makefiles/Makefile
-include .makefiles/pkg/js/v1/Makefile
-include .makefiles/pkg/js/v1/with-npm.mk
-include .makefiles/pkg/js/v1/with-webpack.mk

.makefiles/%:
	@curl -sfL https://makefiles.dev/v1 | bash /dev/stdin "$@"

################################################################################

# run --- Run the application locally.
.PHONY: run
run: webpack-serve

# webpack-serve --- Run the Webpack development server.
.PHONY: webpack-serve
webpack-serve: artifacts/link-dependencies.touch
	$(JS_EXEC) webpack serve

################################################################################

artifacts/site: artifacts/webpack/build/production README.md
	@rm -rf "$@"
	@mkdir -p "$(@D)"

	cp -a "$<" "$@"
	cp README.md "$@"
	touch "$@/.nojekyll"
