"use strict";
var fs = require('fs');
var child_process = require('child_process');
if (!process.argv[0])
    process.exit();
var filename = process.argv[2];
var currentChild;
function killChild() {
    if (currentChild) {
        console.log('File changed => Kill process: ', currentChild.pid);
        //currentChild.kill();
        currentChild.stderr.removeAllListeners();
        currentChild.stdout.removeAllListeners();
        process.kill(currentChild.pid);
        currentChild = undefined;
    }
}
function executeFile() {
    console.log('Executing file: ', filename);
    currentChild = child_process.exec('node ' + filename);
    //currentChild.on('data', (value) => {
    //    console.log(value);
    //});
    //currentChild.on('end', (value) => {
    //    console.log(value);
    //});
    currentChild.stdout.on('data', function (value) {
        console.log(value.toString());
    });
    currentChild.stderr.on('data', function (value) {
        console.log(value.toString());
    });
}
fs.watchFile(filename, function (curr, prev) {
    killChild();
    if (fs.existsSync(filename))
        executeFile();
});
executeFile();
process.on('exit', function () {
    killChild();
});
//# sourceMappingURL=watch.js.map