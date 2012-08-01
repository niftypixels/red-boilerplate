desc("Run a local webserver of your Statix project");
task("server", function (p) {

	var port = p || 8000;

	exec("node", ["../../node_modules/statix/bin/statix-cli.js", "server", "-p", port,], "./resources/config/statix/", function (success) {
		process.exit();
	});

});