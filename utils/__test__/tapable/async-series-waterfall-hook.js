/**
 * @description 异步瀑布钩子，先注册的钩子的返回值作为下一个钩子的入参
 */
const { AsyncSeriesWaterfallHook } = require("tapable")

const hook = new AsyncSeriesWaterfallHook(['arg'])

console.time('AsyncSeriesWaterfallHook')
hook.tapAsync('AsyncSeriesWaterfallHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncSeriesWaterfallHook cb1执行完毕===>', arg)
    callback(null, 'cb1')
  }, 1000)
})

hook.tapPromise('AsyncSeriesWaterfallHook',function(arg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('AsyncSeriesWaterfallHook cb2执行完毕===>', arg)
      resolve('cb2')
    }, 1000)
  })
})
hook.tapAsync('AsyncSeriesWaterfallHook',function(arg, callback) {
  setTimeout(() => {
    console.log('AsyncSeriesWaterfallHook cb3执行完毕===>', arg)
    callback(null, 'cb3')
  }, 1000)
})


hook.callAsync('init', (e, r)=> {
  console.log("-----执行完毕-----", r)
  console.timeEnd('AsyncSeriesWaterfallHook')
})