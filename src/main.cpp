#include <napi.h>
#include "hbv/hbv_wrapper.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return HBitVectorWrapper::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)
