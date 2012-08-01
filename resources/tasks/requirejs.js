/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.config.set("requirejs", {
		mainConfigFile: "project/static/js/config.js",
		urlArgs: null,
		paths: {
			"jquery": "empty:"
		},
		optimize : "uglify",
		name : grunt.task.directive("<config:meta.projectName>") + "/site",
		out : "project/static/js/site.min.js",
		skipModuleInsertion : true
	});

	grunt.config.set("build.requirejs", "requirejs");

	grunt.loadNpmTasks("grunt-requirejs");

};
