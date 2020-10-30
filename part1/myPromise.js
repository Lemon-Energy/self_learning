const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// promise是一个类
class myPromise {
  // 调用声明一个promise的时候需要传入一个执行器，并且立即执行
  constructor(executor) {
    // 在执行器执行阶段就要开始校验错误，使用try catch
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(escape);
    }
  }

  // promise的状态
  status = PENDING;

  // 成功后的值
  value = undefined;

  // 失败后的信息
  reason = undefined;

  // 成功后要调用的方法的临时存储--用于异步时延后调用（这是单次调用的模式）
  // successCallback = undefined
  // 多次调用应改为
  successCallback = [];

  // 失败后要调用的方法的临时存储--用于异步时延后调用（这是单次调用的模式）
  // failCallback = undefined
  // 多次调用应改为
  failCallback = [];

  resolve = (value) => {
    // 如果状态已变，就不执行
    if (this.status !== PENDING) return;
    // 更改状态为成功
    this.status = FULFILLED;
    // 将成功值存储
    this.value = value;
    // 在有异步延时的情况下，判断successCallback是否存在，存在就调用
    // this.successCallback && this.successCallback(this.value)
    // 更改为then多次调用的情况

    while (this.successCallback.length) this.successCallback.shift()();
  };

  reject = (reason) => {
    // 如果状态已变，就不执行
    if (this.status !== PENDING) return;
    // 更改状态为失败
    this.status = REJECTED;
    // 将失败信息存储
    this.reason = reason;
    // 在有异步延时的情况下，判断failCallback是否存在，存在就调用
    // this.failCallback && this.failCallback(this.reason)
    // 更改为then多次调用的情况
    while (this.failCallback.length) this.failCallback.shift()();
  };

  then(successCallback, failCallback) {
    // 将then两个参数变为可选参数，在官方promise中，then不传任何参数，表示将当前then的值传入下一个then中
    // 判断successCallback
    successCallback = successCallback ? successCallback : (value) => value;
    // 判断failCallback
    failCallback = failCallback
      ? failCallback
      : (reason) => {
          throw reason;
        };
    // then要返回promise，才能链式调用then
    // 因为then链式调用，是上一个then的返回值所以要再promise2中传入成功和失败两个回调
    let promise2 = new myPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          // 在then中也要校验错误
          try {
            // 下一个then的值成功值是上一个成功回调的结果所以要接收这个结果
            let x = successCallback(this.value);
            // 对于x，有两种可能，一种是普通值，一种是promise
            // 需要先判断x是普通值还是promise
            // 如果是普通值，直接调用resolve
            // 如果是promise, 要先判断状态，成功就调用resolve，失败调用reject
            // 在外层定义一个判断公共方法，因为在成功、失败、有异步的情况下都要使用
            // 还需要判断一下，promise是否循环调用了，即上一个promise返回了自己
            // 这里的promise2处于创建过程，是不能直接获取到的，需要把当前同步代码改为异步代码，借助setTimeout，设置时间为0

            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          // 在then中也要校验错误
          try {
            // 下一个then的失败值是上一个失败回调的结果所以要接收这个结果
            let x = failCallback(this.reason);
            // 对于x，有两种可能，一种是普通值，一种是promise
            // 需要先判断x是普通值还是promise
            // 如果是普通值，直接调用resolve
            // 如果是promise, 要先判断状态，成功就调用resolve，失败调用reject
            // 在外层定义一个判断公共方法，因为在成功、失败、有异步的情况下都要使用
            // 还需要判断一下，promise是否循环调用了，即上一个promise返回了自己
            // 这里的promise2处于创建过程，是不能直接获取到的，需要把当前同步代码改为异步代码，借助setTimeout，设置时间为0

            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else {
        //   this.successCallback = successCallback
        //   this.failCallback = failCallback
        // 更改为then方法多次调用
        this.successCallback.push(() => {
          setTimeout(() => {
            // 在then中也要校验错误
            try {
              // 下一个then的值成功值是上一个成功回调的结果所以要接收这个结果
              let x = successCallback(this.value);
              // 对于x，有两种可能，一种是普通值，一种是promise
              // 需要先判断x是普通值还是promise
              // 如果是普通值，直接调用resolve
              // 如果是promise, 要先判断状态，成功就调用resolve，失败调用reject
              // 在外层定义一个判断公共方法，因为在成功、失败、有异步的情况下都要使用
              // 还需要判断一下，promise是否循环调用了，即上一个promise返回了自己
              // 这里的promise2处于创建过程，是不能直接获取到的，需要把当前同步代码改为异步代码，借助setTimeout，设置时间为0

              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            // 在then中也要校验错误
            try {
              // 下一个then的失败值是上一个失败回调的结果所以要接收这个结果
              let x = failCallback(this.reason);
              // 对于x，有两种可能，一种是普通值，一种是promise
              // 需要先判断x是普通值还是promise
              // 如果是普通值，直接调用resolve
              // 如果是promise, 要先判断状态，成功就调用resolve，失败调用reject
              // 在外层定义一个判断公共方法，因为在成功、失败、有异步的情况下都要使用
              // 还需要判断一下，promise是否循环调用了，即上一个promise返回了自己
              // 这里的promise2处于创建过程，是不能直接获取到的，需要把当前同步代码改为异步代码，借助setTimeout，设置时间为0

              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  // 无论promise是什么结果，链式调用时finally中的方法都会执行，并且finally方法还可以继续then获得promise的结果（无论成功还是失败）
  finally(callBack) {
    return this.then(value => {
      // callBack()
      // return value
      // 因为存在可能传入异步代码的情况，所以不能像上方代码那样直接返回
      return myPromise.resolve(callBack()).then(() => value)
    }, reason => {
      // callBack()
      // throw reason
      // 与成功同理
      return myPromise.resolve(callBack()).then(() => {throw reason})
    })
  }

  catch(failCallback) {
    return this.then(undefined, failCallback)
  }

  static all(array) {
    let result = [];
    let index = 0; // 用于判断array中的内容是否都执行完毕

    return new myPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        // 当array都执行完毕才返回结果
        if (index === array.length) {
          resolve(result);
        }
      }

      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof myPromise) {
          // promise
          current.then(
            (value) => addData(i, value),
            (reason) => reject(reason)
          );
        } else {
          // 普通值
          addData(i, array[i]);
        }
      }
    });
  }

  static resolve(value) {
    if (value instanceof myPromise) return value
    return new myPromise(resolve => resolve(value))
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 先判断promise2是否和x相等，相等即为返回了自己
  if (promise2 === x) {
    return reject(new TypeError("promise循环调用了，英文请去复制系统的"));
  }
  if (x instanceof myPromise) {
    // x 是 promise对象
    x.then(
      (value) => resolve(value),
      (reason) => reject(reason)
    );
  } else {
    // x 是 普通值
    resolve(x);
  }
}
