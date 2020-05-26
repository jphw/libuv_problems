console.log("bootstrapping libuv_problems");

let appRun = false;
try {
    const { app } = require('electron');
    if (app && app.getName() === "libuv_problems") {
        appRun = true;
        console.log("running libuv_problems test application");
    }
} catch (err) {
    console.log('error checkig app name', err);
}

if (appRun) {
    require(__dirname + '/test-app/main.js');
} else {
    module.exports = require(__dirname + '/index.js');
}