const execSync = require('child_process').execSync;
const pjson = require(__dirname + '/package.json');
const fs = require('fs');

const arch = 'x64';
const electron_version = pjson.dependencies.electron
    ? pjson.dependencies.electron
    : pjson.devDependencies.electron;


console.log('using electron: ' + electron_version + ', arch: ' + arch);
console.log('Command line:');
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

const isMac = process.platform === 'darwin';
const isWin = process.platform === 'win32';

if (isMac) {
    console.log('Mac configuration');
    execSync( `node-gyp configure --target=${electron_version} --arch=${arch} --dist-url=https://atom.io/download/atom-shell -- -f xcode`, { stdio: 'inherit' } );
    execSync(`cd build; xcodebuild -project binding.xcodeproj -configuration Debug build`, { stdio: 'inherit' });
}

if (isWin) {
    console.log('Windows configuration');
    execSync( `node-gyp configure --target=${electron_version} --arch=${arch} --dist-url=https://atom.io/download/atom-shell`, { stdio: 'inherit' } );
    execSync( `node-gyp build --verbose --target=${electron_version} --arch=${arch} --jobs=max --dist-url=https://atom.io/download/atom-shell --debug`, { stdio: 'inherit' } );
}
