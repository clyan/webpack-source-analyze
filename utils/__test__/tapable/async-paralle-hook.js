/**
 * @description 异步并行钩子, 多个注册的钩子同时执行
 */
const { AsyncParallelHook } = require("tapable")

const hook = new AsyncParallelHook(['arg'])

console.time('AsyncParallelHook')
hook.tapAsync('AsyncParallelHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncParallelHook cb1执行完毕===>', arg)
    callback()
  }, 1000)
})

hook.tapPromise('AsyncParallelHook',function(arg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('AsyncParallelHook cb2执行完毕===>', arg)
      resolve()
    }, 1000)
  })
})
hook.tapAsync('AsyncParallelHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncParallelHook cb3执行完毕===>', arg)
    callback()
  }, 1000)
})


hook.callAsync('init', ()=> {
  console.log("-----执行完毕-----")
  // 执行时间约1s
  console.timeEnd('AsyncParallelHook')
})