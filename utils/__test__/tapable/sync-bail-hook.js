/**
 * @description 同步熔断钩子，如果前面注册的钩子返回值不为 undefined 则后续注册的钩子不再执行
 */
const { SyncBailHook } = require("tapable")

const hook = new SyncBailHook(['arg'])

hook.tap('SyncBailHook',function(arg) {
  console.log('SyncBailHook cb1触发了===>', arg)
})

hook.tap('SyncBailHook',function(arg) {
  console.log('SyncBailHook cb2触发了===>', arg)
    // 熔断
  return "cb2"
})

hook.tap('SyncBailHook',function(arg) {
  console.log('SyncBailHook cb3触发了===>', arg)
})


hook.call('init')