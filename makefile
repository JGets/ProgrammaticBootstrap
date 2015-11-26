
.PHONY: all docs build test release clean

FINALNAME = ProgBS
SRCDIR = src/
SRCFILES = 	${SRCDIR}BSObject.js \
			${SRCDIR}BSContentObject.js \
			${SRCDIR}BSButton.js \
			${SRCDIR}BSFormInput.js \
			${SRCDIR}BSInput.js \
			${SRCDIR}BSCheckbox.js \
			${SRCDIR}BSRadio.js \
			${SRCDIR}BSSelect.js \
			${SRCDIR}BSTextArea.js \
			${SRCDIR}BSForm.js

all: clean release

docs: 
	@jsdoc -d docs/ src/*

#Build:
#	* concatenates all source .js files into a single file, in order
#	* uses babel to transpile from ES6 to ES5
#	* uses UglifyJS to clean up / beautify, remove comments, and prepend the license
build: 
	@cat ${SRCFILES} > build/${FINALNAME}.es6.js
	@babel build/${FINALNAME}.es6.js -o build/${FINALNAME}.es5.js
	@uglifyjs --beautify --preamble "/*`cat LICENSE`*/" --o build/${FINALNAME}.js -- build/${FINALNAME}.es5.js

test: build
	@echo No Tests Yet

# Release:
#	* copies our final build file from the build/ directory
#	* creates a minified & obfuscated version
release: docs build test
	@cp build/${FINALNAME}.js release/
	@uglifyjs --comments all --compress --mangle --output release/${FINALNAME}.min.js -- release/${FINALNAME}.js

clean:
	-@rm docs/* build/* release/* 2>/dev/null || true

