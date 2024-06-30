/**
 * @description 同步瀑布钩子，先注册的钩子的返回值作为下一个钩子的入参
 */
const { SyncWaterfallHook } = require("tapable")

const hook = new SyncWaterfallHook(['arg'])

hook.tap('SyncWaterfallHook',function(arg) {
  console.log('SyncWaterfallHook cb1触发了===>', arg)
  return 'cb1'
})

hook.tap('SyncWaterfallHook',function(arg) {
  console.log('SyncWaterfallHook cb2触发了===>', arg)
  return "cb2"
})

hook.tap('SyncWaterfallHook',function(arg) {
  console.log('SyncWaterfallHook cb3触发了===>', arg)
    return "cb3"
})


hook.call('init')