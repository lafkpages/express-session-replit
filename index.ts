import { SessionData, Store } from "express-session";
import { Client } from "replit-storage";

class ReplitDBStore extends Store {
  repldb: Client;

  constructor() {
    super();

    this.repldb = new Client();
  }

  get(sid: string, cb: Function) {
    this.repldb
      .get(sid)
      .then((data) => {
        cb(null, data);
      })
      .catch(cb);
  }

  set(sid: string, data: SessionData, cb: Function | undefined) {
    this.repldb
      .set({
        [sid]: data,
      })
      .then(() => {
        cb && cb(null);
      })
      .catch(cb);
  }

  destroy(sid: string, cb: Function | undefined) {
    this.repldb
      .delete(sid)
      .then(() => {
        cb && cb(null);
      })
      .catch(cb);
  }

  clear(cb: Function | undefined) {
    this.repldb
      .empty()
      .then(() => {
        cb && cb(null);
      })
      .catch(cb);
  }

  length(cb: Function) {
    this.repldb
      .list()
      .then((keys) => {
        cb(null, keys.length);
      })
      .catch(cb);
  }
}

export default ReplitDBStore;
