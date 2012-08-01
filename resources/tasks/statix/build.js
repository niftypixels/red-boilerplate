desc("Build your Statix project");
task("build", function () {

	exec("node", ["../../node_modules/statix/bin/statix-cli.js", "build"], "./resources/config/statix/", function (success) {
		process.exit();
	});


});