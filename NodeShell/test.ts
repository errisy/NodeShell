import * as child_process from 'child_process';

function tick() {
    console.log('FF332 22  !');
    setTimeout(tick, 1000);
}

console.log('Hello 2!');

tick();