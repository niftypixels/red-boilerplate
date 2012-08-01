/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.config.set("lint", {
		files: [
			"grunt.js",
			"project/static/js/" + grunt.task.directive("<config:meta.project>") + "/**/*.js"
		]
	});

	grunt.config.set("jshint", {
		options: {
			adsafe: false,
			asi: false,
			bitwise: false,
			boss: false,
			browser: true,
			cap: false,
			couch: true,
			css: false,
			curly: true,
			debug: false,
			devel: false,
			eqeqeq: true,
			es5: false,
			evil: false,
			forin: false,
			fragment: false,
			immed: true,
			indent: 4,
			lastsemic: false,
			laxbreak: false,
			loopfunc: true,
			maxerr: 100,
			maxlen: 160,
			newcap: true,
			newstat: false,
			noarg: true,
			node: true,
			noempty: true,
			nomen: false,
			nonew: true,
			on: false,
			onevar: true,
			passfail: false,
			plusplus: false,
			regexp: false,
			rhino: false,
			safe: false,
			statinexp: false,
			strict: false,
			sub: false,
			undef: true,
			white: true,
			widget: false,
			windows: false
		},
		globals: {
			$: true,
			jQuery: true,
			console: true,
			Modernizr: true,
			History: true,
			define: true
		}
	});

	grunt.config.set("watch.lint", {
		files: "<config:lint.files>",
		tasks: ["lint"]
	});

	grunt.config.set("build.lint", "lint");

};
