/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.config.set("compass", {
		dev: {
			src: "resources/compass/sass",
			dest: "project/static/css",
			linecomments: true,
			forcecompile: true,
			images: "project/static/img",
			outputstyle: "expanded",
			relativeassets: true
		},
		prod: {
			src: "<config:compass.dev.src>",
			dest: "<config:compass.dev.dest>",
			outputstyle: "compressed",
			linecomments: false,
			forcecompile: true,
			images: "<config:compass.dev.images>",
			relativeassets: true
		}
	});

	grunt.config.set("watch.compass", {
		files: "resources/compass/sass/**/*.scss",
		tasks: ["compass:dev"]
	});

	grunt.config.set("build.compass", "compass:prod");

	grunt.loadNpmTasks("grunt-compass");

};
