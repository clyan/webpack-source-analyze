/**
 * @description 异步串行钩子，按注册顺序一个个执行
 */
const { AsyncSeriesHook } = require("tapable")

const hook = new AsyncSeriesHook(['arg'])

console.time('AsyncSeriesHook')
hook.tapAsync('AsyncSeriesHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncSeriesHook cb1执行完毕===>', arg)
    // callback执行后说明该函数执行完毕
    callback()
  }, 1000)
})

hook.tapPromise('AsyncSeriesHook',function(arg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('AsyncSeriesHook cb2执行完毕===>', arg)
      resolve()
    }, 1000)
  })
})

hook.tapAsync('AsyncSeriesHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncSeriesHook cb3执行完毕===>', arg)
    callback()
  }, 1000)
})


hook.callAsync('init', ()=> {
  console.log("-----执行完毕-----")
  console.timeEnd('AsyncSeriesHook')
})