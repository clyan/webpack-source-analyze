/**
 * @description 同步串行钩子，按注册顺序一个个执行
 */
const { SyncHook } = require("tapable")

const hook = new SyncHook(['arg'])

hook.tap('SyncHook',function(arg) {
  console.log('SyncHook cb1触发了===>', arg)
})

hook.tap('SyncHook',function(arg) {
  console.log('SyncHook cb2触发了===>', arg)
})

hook.tap('SyncHook',function(arg) {
  console.log('SyncHook cb3触发了===>', arg)
})


hook.call('init')