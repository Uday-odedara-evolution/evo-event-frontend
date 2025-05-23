export const eventEmitter = {
  _events: {},
  dispatch(event, data) {
    if (!this._events[event]) return;
    this._events[event].forEach(callback => {
      return callback(data);
    });
  },
  subscribe(event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
  unsubscribe(event) {
    if (!this._events[event]) return;
    delete this._events[event];
  },
};
