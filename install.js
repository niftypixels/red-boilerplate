/*jslint node: true, onevar: false */
/*global jake, desc, task, error, pkg, installModule, parseFiles */
"use strict";

var fs = require("fs");
var cp = require("child_process");

var exec = function (ex, args, cwd, suppress, doneCB) {

	var child = cp.spawn(ex, args || [], {cwd: cwd});

	child.stdout.addListener("data", function (chunk) {
		if (!suppress && chunk) {
			console.log(chunk.toString());
		}
	});

	child.stderr.addListener("data", function (chunk) {
		if (!suppress && chunk) {
			console.error(chunk.toString());
		}
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
