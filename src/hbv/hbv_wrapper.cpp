#include "hbv_wrapper.h"

Napi::FunctionReference HBitVectorWrapper::constructor;

Napi::Object HBitVectorWrapper::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func = DefineClass(env, "create", {
    InstanceMethod("contains", &HBitVectorWrapper::Contains),
    InstanceMethod("insert", &HBitVectorWrapper::Insert),
    InstanceMethod("delete", &HBitVectorWrapper::Delete),
    InstanceMethod("inserts", &HBitVectorWrapper::Inserts),
    InstanceMethod("deletes", &HBitVectorWrapper::Deletes),
    InstanceMethod("min", &HBitVectorWrapper::Min),
    InstanceMethod("succ", &HBitVectorWrapper::Succ)
  });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("create", func);
  return exports;
}


HBitVectorWrapper::HBitVectorWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<HBitVectorWrapper>(info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);
  int length = info.Length();

  if (length == 0) { // maximal length hbv by default
    this->hbv_ = new HBitVector(31);
  } else if (length == 1) {
    Napi::Number value = info[0].As<Napi::Number>();
    this->hbv_ = new HBitVector(value.Int32Value());
  } else {
    Napi::TypeError::New(env, "Constructor takes at most one argument").ThrowAsJavaScriptException();
  }
}


Napi::Value HBitVectorWrapper::Contains(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (info.Length() != 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Integer expected").ThrowAsJavaScriptException();
  }

  Napi::Number inputVal = info[0].As<Napi::Number>();
  bool returnVal = this->hbv_->contains(inputVal.Int32Value());

  return Napi::Number::New(info.Env(), returnVal);
}


Napi::Value HBitVectorWrapper::Min(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);
  int length = info.Length();
  int inputVal = 0;

  if (length == 1 && info[0].IsNumber()) {
    Napi::Number input = info[0].As<Napi::Number>();
    inputVal = input.Int32Value();
  } else if (length > 0) {
    Napi::TypeError::New(env, "Integer expected").ThrowAsJavaScriptException();
  }

  int returnVal = this->hbv_->min(inputVal);
  return Napi::Number::New(info.Env(), returnVal);
}


Napi::Value HBitVectorWrapper::Succ(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (info.Length() != 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Integer expected").ThrowAsJavaScriptException();
  }

  Napi::Number inputVal = info[0].As<Napi::Number>();
  int returnVal = this->hbv_->succ(inputVal.Int32Value());

  return Napi::Number::New(info.Env(), returnVal);
}


void HBitVectorWrapper::Insert(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (info.Length() != 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Integer expected").ThrowAsJavaScriptException();
  }

  Napi::Number inputVal = info[0].As<Napi::Number>();
  this->hbv_->insert(inputVal.Int32Value());
}


void HBitVectorWrapper::Delete(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (info.Length() != 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Integer expected").ThrowAsJavaScriptException();
  }

  Napi::Number inputVal = info[0].As<Napi::Number>();
  this->hbv_->remove(inputVal.Int32Value());
}


void HBitVectorWrapper::Inserts(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (info.Length() != 1) {
    Napi::TypeError::New(env, "Exactly one argument is expected").ThrowAsJavaScriptException();
  }

  Napi::Array inputArr = info[0].As<Napi::Array>();

  for (uint32_t i=0; i<inputArr.Length(); i++) {
    Napi::Value inputVal = inputArr[i];
    if (inputVal.IsNumber()) {
      int v = (int) inputVal.As<Napi::Number>();
      this->hbv_->insert(v);
    } else {
      Napi::TypeError::New(env, "Unexpected type in array").ThrowAsJavaScriptException();
    }
  }
}


void HBitVectorWrapper::Deletes(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (info.Length() != 1) {
    Napi::TypeError::New(env, "Exactly one argument is expected").ThrowAsJavaScriptException();
  }

  Napi::Array inputArr = info[0].As<Napi::Array>();

  for (uint32_t i=0; i<inputArr.Length(); i++) {
    Napi::Value inputVal = inputArr[i];
    if (inputVal.IsNumber()) {
      int v = (int) inputVal.As<Napi::Number>();
      this->hbv_->remove(v);
    } else {
      Napi::TypeError::New(env, "Unexpected type in array").ThrowAsJavaScriptException();
    }
  }
}


HBitVector* HBitVectorWrapper::GetInternalInstance() {
  return this->hbv_;
}
