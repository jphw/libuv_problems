# libuv_problems
Sample project for demostration of libuv event loop issue in Electron 9

# original dev env
1. Visual Studio 2017 with "Desktop development with C++" component
2. Node.js 10.18.1
3. NPM 6.11.3
4. node-gyp 5.0.3 (installed globally)
5. python 2.7.16

# how to run
1. npm i
2. npm run start
3. open build/binding.sln in MSVS
4. attach MSVS debugger to all "electron" processes
5. in the app window press "execute" 5 times, and check the debugger "Output" window - it will show 5 "myAfterWorkCb" lines
6. press "reload", and check that debugger "Output" window for "LibuvProblemsModuleDeInit" and "LibuvProblemsModuleInit" lines
7. press "execute" 5 times, and check the debugger "Output" window - it will not show 5 "myAfterWorkCb" because uv_after_work_cb is not called