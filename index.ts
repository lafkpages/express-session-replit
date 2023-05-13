import { SessionData, Store } from "express-session";
import { Client } from "replit-storage";

type ReplitDBStoreOptions = {
  url?: string;
  prefix?: string;
};

class ReplitDBStore extends Store {
  prefix: string;
  repldb: Client;

  constructor(opts: ReplitDBStoreOptions = {}) {
    super();

    opts = {
      url: undefined,
      prefix: "session_",
      ...opts,
    };

    this.prefix = opts.prefix || "";

    this.repldb = new Client(opts.url);
  }

  getKey(sid: string) {
    return `${this.prefix}${sid}`;
  }

  get(sid: string, cb: Function) {
    const key = this.getKey(sid);

    this.repldb
      .get(key)
      .then((data) => {
        cb(null, data);
      })
      .catch(cb);
  }

  set(sid: string, data: SessionData, cb: Function | undefined) {
    const key = this.getKey(sid);

    this.repldb
      .set({
        [key]: data,
      })
      .then(() => {
        cb && cb(null);
      })
      .catch(cb);
  }

  destroy(sid: string, cb: Function | undefined) {
    const key = this.getKey(sid);

    this.repldb
      .delete(key)
      .then(() => {
        cb && cb(null);
      })
      .catch(cb);
  }

  clear(cb: Function | undefined) {
    this.repldb
      .list({
        prefix: this.prefix,
      })
      .then((keys) => {
        this.repldb
          .deleteMany(keys)
          .then(() => {
            cb && cb(null);
          })
          .catch(cb);
      });
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
