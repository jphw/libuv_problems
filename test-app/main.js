const { app, BrowserWindow, Menu } = require('electron');

console.log('main js');

let homeWindow;

Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuBar()));

app.on('ready', () => {
    logEverywhere('app on ready start');

    homeWindow = new BrowserWindow({
        x: 100,
        y: 100,
        width: 1024,
        height: 768,
        autoHideMenuBar: false,
        frame: false,
        webPreferences: { nodeIntegration: true }
    });

    homeWindow.loadFile(__dirname + '/home.html');
    homeWindow.webContents.openDevTools();

    homeWindow.on('closed', () => {
        homeWindow = null;
    });

    logEverywhere('app on ready end');
});

function createMenuBar() {
    const result = [];

    return result;
}

// Log both at dev console and at running node console instance
function logEverywhere(s) {
    console.log(s);
    if (homeWindow && homeWindow.webContents) {
        homeWindow.webContents.executeJavaScript(`console.log("${s}")`);
    }
}
