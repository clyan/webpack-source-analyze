/**
 * @description 异步并行熔断钩子，如果钩子有返回值，则直接先执行callAsync的回调，然后会继续执行完剩下的钩子(因为是并行的，触发callAsync时，函数已经被调用，所以会被继续执行完)
 */
const { AsyncParallelBailHook } = require("tapable")

const hook = new AsyncParallelBailHook(['arg'])

console.time('AsyncParallelBailHook')
hook.tapAsync('AsyncParallelBailHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncParallelBailHook cb1执行完毕===>', arg)
    callback(null, "cb2")
  }, 1000)
})

hook.tapPromise('AsyncParallelBailHook',function(arg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('AsyncParallelBailHook cb2执行完毕===>', arg)
      resolve()
    }, 1000)
  })
})
hook.tapAsync('AsyncParallelBailHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncParallelBailHook cb3执行完毕===>', arg)
    callback()
  }, 1000)
})


hook.callAsync('init', ()=> {
  console.log("-----执行完毕-----")
  // 执行时间约1s
  console.timeEnd('AsyncParallelBailHook')
})