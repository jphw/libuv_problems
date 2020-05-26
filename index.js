/**
 * 'npm start -- D' or 'yarn start D' for debug run 
 */

const fs = require('fs');
const {remote} = require('electron');

let isDebugRun = false;
let isRendererProcess = remote ? true: false;

try {
    const argv = isRendererProcess ? remote.process.argv : process.argv;
    if (argv.length >= 3 && (argv.includes("D") || argv.includes("debug"))) {
        isDebugRun = true;
        console.log("loading Debug build of plugin rcv-desktop-tools.node");
    }
} catch (err) { };

const debugPath = __dirname + '/build/Debug/rcv-desktop-tools.node';
const releasePath =__dirname + '/build/Release/rcv-desktop-tools.node';

let so_path ;

if( isDebugRun ){
    if( fs.existsSync( debugPath ) === true )
        so_path = debugPath;
    else
        so_path = releasePath;
}
else
{
    if( fs.existsSync( releasePath ) === true )
        so_path = releasePath;
    else
        so_path = debugPath;
}

console.log("rcv-desktop-tools.node path is: " + so_path );

const rcv_desktop_tools = require(so_path);
const remote_rcv_desktop_tools = remote ? remote.require(so_path) : rcv_desktop_tools;

class CustomDisplayCast extends rcv_desktop_tools.DisplayCast {
    constructor (captureSource) {        
        if (captureSource.blackListedWindows === undefined) {
            const handle = remote.getCurrentWindow().getNativeWindowHandle();
            const windowId = remote_rcv_desktop_tools.nativeHandleToWindowIdStr(handle);
            captureSource.blackListedWindows = [windowId];
        }
        super(captureSource);
    }
}
rcv_desktop_tools.DisplayCast = CustomDisplayCast;
module.exports = { M: rcv_desktop_tools, P: remote_rcv_desktop_tools };
