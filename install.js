/*jslint node: true, onevar: false */
/*global jake, desc, task, error, pkg, installModule, parseFiles */
"use strict";

var fs = require("fs");
var cp = require("child_process");

var exec = function (exec, args, cwd, suppress, doneCB) {
	process.stdin.resume();

	var child = cp.spawn(exec, args || [], {
		cwd: cwd,
		env: null,
		setsid: true,
		stdio: (suppress) ? null : "inherit"
	});

	child.addListener("exit", function (code) {
		doneCB(!code);
	});
};

function installComplete(cb) {
	process.exit();
}

exec("python", ["--version"], null, true, function (success) {
	if (success) {
		exec("python", ["red_start_settings.py", "no_prompt=True"], null, false, function (success) {
			if (!success) {
				console.error("Something went wrong trying to run red_start_settings.py");
			}

			installComplete();
		});
	} else {
		console.error("You need to install Python before installing RED Start.");
		installComplete();
	}
});
