/*jslint node: true, onevar: false */
/*global jake, desc, task, error, pkg, installModule, parseFiles */
"use strict";

var fs = require("fs");
var cp = require("child_process");
var path = require("path");

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

function detectGemPermission(cb) {
	var exec = require("child_process").exec,
		child;

	child = exec("which gem", function (error, stdout, stderr) {
		if (stdout.toString().trim() === "/usr/bin/gem") {
			console.log("");
			console.log("*********************************************************************");
			console.log("This next bit might require sudo privileges.");
			console.log("If so, the installer will ask your password for each gem it installs.");
			console.log("*********************************************************************");
			console.log("");
		}

		if (error !== null) {
			console.error(error);
		}

		if (cb) {
			cb();
		}
	});
}

function installGems() {
	var gemfile = path.join("resources", "tasks", "config", "Gemfile");

	exec("bundle", ["install", "--system", "--gemfile", gemfile], null, false, function (success) {
		if (!success) {
			console.error("Error installing gems. Perhaps you need sudo privileges? (Ugh)");
		}

		process.exit();
	});
}

exec("ruby", ["-v"], null, true, function (success) {
	if (success) {
		exec("gem", ["-v"], null, true, function (success) {
			if (success) {
				detectGemPermission(function () {
					exec("bundle", ["-v"], null, true, function (success) {
						if (success) {
							installGems();
						} else {
							exec("gem", ["install", "bundler"], null, false, function (success) {
								if (success) {
									installGems();
								} else {
									process.exit();
								}
							});
						}
					});
				});
			} else {
				console.error("You need to install Ruby Gems before installing the Compass Module.");
				process.exit();
			}
		});
	} else {
		console.error("You need to install Ruby before installing the Compass Module.");
		process.exit();
	}
});
