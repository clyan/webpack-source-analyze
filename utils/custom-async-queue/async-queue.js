const ArrayQueue = require("./array-queue");
const AsyncQueueEntry = require("./async-queue-entry").default;

const { DONE_STATE, PROCESSING_STATE, QUEUED_STATE } = require("./async-queue-entry");

class AsyncQueue {
  constructor(options) {
    this.name = options.name
    this.processor = options.processor;
    this.parallelism = options.parallelism;
    this.getKey = options.getKey;

    this._queue = new ArrayQueue();
    this._activeTasks = 0;
    // 是否开启任务执行
    this._willEnsureProcessing = false

    this._entries = new Map();
  }

  add(item, callback) {
    let key = this.getKey(item)
    let entry =  this._entries.get(key);
    if(entry) {
      if(entry.state === DONE_STATE) {
        process.nextTick(callback(entry.error, entry.result))
      } else {
        entry.callbacks.push(callback)
      }
      return
    }
    let newEntry = new AsyncQueueEntry(item, callback);
    this._queue.enqueue(newEntry);
    this._entries.set(key, newEntry)
    if(!this._willEnsureProcessing) {
      this._willEnsureProcessing = true;
      setImmediate(this._ensureProcessing.bind(this))
    }
  }

  _ensureProcessing() {
    while(this._activeTasks < this.parallelism) {
      let entry = this._queue.dequeue()
      if(!entry) {
        break;
      }
      this._activeTasks++;
      this._startProcess(entry)
      this.state = PROCESSING_STATE
    }
    this._willEnsureProcessing = false
  }

  _startProcess(entry) {
    this.processor(entry.item, (e, r) => {
      this._handleResult(entry, e, r)
    })
  }

  _handleResult(entry, e, r) {
    const callback = entry.callback;
    entry.state = DONE_STATE;
    entry.error = e;
    entry.result = r
    callback(e, r)
    this._activeTasks--;
    if(entry.callbacks.length > 0) {
      for(const cb of entry.callbacks) {
        cb(e, r)
      }
    }
    if(!this._willEnsureProcessing) {
      this._willEnsureProcessing = true
      setImmediate(this._ensureProcessing.bind(this))
    }
  }
}

module.exports = AsyncQueue;