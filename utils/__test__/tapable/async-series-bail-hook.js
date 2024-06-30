/**
 * @description 同步串行熔断钩子，如果前面注册的钩子返回值不为 undefined 则后续注册的钩子不再执行
 */
const { AsyncSeriesBailHook } = require("tapable")

const hook = new AsyncSeriesBailHook(['arg'])

console.time('AsyncSeriesBailHook')
hook.tapAsync('AsyncSeriesBailHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncSeriesBailHook cb1执行完毕===>', arg)
    // 值不为undefined 则熔断
    // callback(null, 'cb1')
    callback()
  }, 1000)
})

hook.tapPromise('AsyncSeriesBailHook',function(arg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('AsyncSeriesBailHook cb2执行完毕===>', arg)
      // 值不为undefined 则熔断
      resolve('cb2')
    }, 1000)
  })
})
hook.tapAsync('AsyncSeriesBailHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncSeriesBailHook cb3执行完毕===>', arg)
    callback()
  }, 1000)
})


hook.callAsync('init', ()=> {
  console.log("-----执行完毕-----")
  console.timeEnd('AsyncSeriesBailHook')
})