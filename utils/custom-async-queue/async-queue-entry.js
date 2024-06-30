const QUEUED_STATE = 0;

const PROCESSING_STATE = 1;

const DONE_STATE = 2;

class AsyncQueueEntry {
  constructor(item, callback) {
    this.item= item;
    this.callback = callback

    this.state = QUEUED_STATE;
    this.error = undefined;
    this.result = undefined;
    this.callbacks = []
  }
}


module.exports = {
  PROCESSING_STATE,
  QUEUED_STATE,
  DONE_STATE
};

module.exports.default = AsyncQueueEntry