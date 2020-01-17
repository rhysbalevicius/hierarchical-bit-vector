#include <napi.h>
#include "hbv.h"

class HBitVectorWrapper : public Napi::ObjectWrap<HBitVectorWrapper> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  HBitVectorWrapper(const Napi::CallbackInfo& info);
  HBitVector* GetInternalInstance();

 private:
  static Napi::FunctionReference constructor;
  Napi::Value Contains(const Napi::CallbackInfo& info);
  Napi::Value Min(const Napi::CallbackInfo& info);
  Napi::Value Succ(const Napi::CallbackInfo& info);
  void Insert(const Napi::CallbackInfo& info);
  void Delete(const Napi::CallbackInfo& info);
  void Inserts(const Napi::CallbackInfo& info);
  void Deletes(const Napi::CallbackInfo& info);
  HBitVector *hbv_;
};
