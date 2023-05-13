import { SessionData, Store } from "express-session";
import { Client } from "replit-storage";

type ReplitDBStoreOptions = {
  url?: string;
  prefix?: string;
};

const noop = (_err?: unknown, _data?: any) => {};

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

  get(sid: string, cb = noop) {
    const key = this.getKey(sid);

    this.repldb
      .get(key)
      .then((data) => {
        cb(null, data);
      })
      .catch(cb);
  }

  set(sid: string, data: SessionData, cb = noop) {
    const key = this.getKey(sid);

    this.repldb
      .set({
        [key]: data,
      })
      .then(() => {
        if (cb) {
          cb && cb(null);
        }
      })
      .catch(cb);
  }

  destroy(sid: string, cb = noop) {
    const key = this.getKey(sid);

    this.repldb
      .delete(key)
      .then(() => {
        if (cb) {
          cb && cb(null);
        }
      })
      .catch(cb);
  }

  clear(cb = noop) {
    this.repldb
      .list({
        prefix: this.prefix,
      })
      .then((keys) => {
        this.repldb
          .deleteMany(keys)
          .then(() => {
            if (cb) {
              cb && cb(null);
            }
          })
          .catch(cb);
      });
  }

  length(cb = noop) {
    this.repldb
      .list()
      .then((keys) => {
        cb(null, keys.length);
      })
      .catch(cb);
  }
}

export default ReplitDBStore;
