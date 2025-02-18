const AsyncQueue = require("webpack/lib/util/AsyncQueue");

let queue = new AsyncQueue({
  name: '调度器',
  processor: function(item, callback) {
    setTimeout(() => {
      item.deal = item.key + "===>被处理器处理了"
      callback(null, item)
    },2000)
  },
  // 并发数量
  parallelism: 1,
  getKey:item => item.key
})

queue.add({key: 'task1'}, function(err, result) {
  console.log(result)
})

queue.add({key: 'task2'}, function(err, result) {
  console.log(result)
})

queue.add({key: 'task3'}, function(err, result) {
  console.log(result)
})

queue.add({key: 'task1'}, function(err, result) {
  console.log(result)
})