/**
 * @description 同步循环钩子， 如果钩子的返回值不为undefined 则循环调用改钩子本身，直到返回undefined 才继续执行下一个钩子
 */
const { SyncLoopHook } = require("tapable")

const hook = new SyncLoopHook(['arg'])

let flag = 1;

hook.tap('SyncLoopHook',function(arg) {
  console.log('SyncLoopHook cb1触发了===>', arg)
  if(flag < 2) {
    return flag++
  }
})

hook.tap('SyncLoopHook',function(arg) {
  console.log('SyncLoopHook cb2触发了===>', arg)
})

hook.tap('SyncLoopHook',function(arg) {
  console.log('SyncLoopHook cb3触发了===>', arg)
})


hook.call('init')