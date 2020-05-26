const { BrowserWindow, app, getCurrentWindow, getCurrentWebContents } = require('electron').remote;

let myModule = null;
try {
    myModule = require('../build/Debug/libuv_problems');
} 
catch (e) {
    console.log('libuv_problems module load failed', e);
}

console.log('home js');
console.log('myModule', myModule);

document.addEventListener('DOMContentLoaded', () => {
    const reload = document.getElementById('reload');
    reload.onclick = e => {
        console.log('on reload');
        getCurrentWindow().reload();
    };

    const execute = document.getElementById('execute');
    execute.onclick = e => {
        console.log('on execute')
        let ret = myModule.testExecute();
        console.log('ret', ret);
    };

    const devtools = document.getElementById('devtools');
    devtools.onclick = e => {
        console.log('on devtools')
        getCurrentWebContents().toggleDevTools();
    };

    const quit = document.getElementById('quit');
    quit.onclick = e => {
        console.log('on quit');
        app.quit();
    };
});