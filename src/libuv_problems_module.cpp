#include "nan.h"
#include <windows.h>

static NAN_INLINE void myWorkCb(uv_work_t*)
{
    OutputDebugString(L"myWorkCb\n");
}

static NAN_INLINE void myAfterWorkCb(uv_work_t *req, int status)
{
    OutputDebugString(L"myAfterWorkCb\n");
    delete req;
}

static void testExecute(const v8::FunctionCallbackInfo<v8::Value> & args)
{
    OutputDebugString(L"testExecute\n");
    
    uv_work_t * work = new uv_work_t();
    auto loop = Nan::GetCurrentEventLoop();
    int queueRet = uv_queue_work(loop, work, myWorkCb, myAfterWorkCb);
    
    args.GetReturnValue().Set(Nan::New(std::string("uv_queue_work = ") + std::to_string(queueRet)).ToLocalChecked());
}

void LibuvProblemsModuleDeInit(void*)
{
    OutputDebugString(L"LibuvProblemsModuleDeInit\n");
}

NAN_MODULE_INIT( LibuvProblemsModuleInit )
{
    OutputDebugString(L"LibuvProblemsModuleInit\n");

    NODE_SET_METHOD(target, "testExecute", testExecute);

    node::AddEnvironmentCleanupHook(v8::Isolate::GetCurrent(), LibuvProblemsModuleDeInit, nullptr);
}

NAN_MODULE_WORKER_ENABLED( LibuvProblemsModule, LibuvProblemsModuleInit );
