import * as fs from 'fs';
import * as child_process from 'child_process';

if (!process.argv[0]) process.exit();

let filename: string = process.argv[2];

let currentChild: child_process.ChildProcess;

function killChild() {

    if (currentChild) {

        console.log('File changed => Kill process: ', currentChild.pid);
        currentChild.send('exit');
        //currentChild.kill();
        //currentChild.emit('exit');
        //currentChild.stderr.removeAllListeners();
        //currentChild.stdout.removeAllListeners();
        //currentChild.removeAllListeners();
        process.kill(currentChild.pid);
        currentChild = undefined;
    }
}
function executeFile() {
    console.log('Executing file: ', filename);
    currentChild = child_process.fork(filename); //'node ' + 
    //currentChild.stdout.on('data', (value: Buffer) => {
    //    console.log(value.toString());
    //});
    //currentChild.stderr.on('data', (value: Buffer) => {
    //    console.log(value.toString());
    //});
}
fs.watchFile(filename, (curr, prev) => {
    killChild();
    if (fs.existsSync(filename)) executeFile();
});

executeFile();

process.on('exit', () => {
    killChild();
});
