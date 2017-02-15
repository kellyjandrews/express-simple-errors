import {NotFound} from './errors';

const defaultHandler = (err, stack) => {
  const res = {};
  res.status= err.name;
  res.message= err.message;
  res.code= err.code;
  if (stack) res.stackTrace= err.stack;
  return res;
};

class Exception extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg;
    this.name = 'Express-Simple-Errors Exception';
    Error.captureStackTrace(this);
  }
}

// TODO
// Logging Middleware?
export default class ErrorHandler {
  constructor(opts) {
    this.handlers = new Map;
    this.handlers.set('Default', defaultHandler);
    this.stackTrace = true;
    if (opts && opts.stackTrace !== undefined) {
      if (typeof opts.stackTrace !== 'boolean') throw new Exception('Option stackTrace must be a boolean.');
      this.stackTrace = opts.stackTrace;
    }
  }

  setHandler(name, handler) {
    if (!name || !handler) throw new Exception('Method setHandler requires both name and handler parameters.');
    if (typeof handler !== 'function') throw new Exception('Method setHandler expects the handler parameter to be a function.');
    return this.handlers.set(name, handler);
  }

  unsetHandler(name) {
    if (!name) throw new Exception('Method unsetHandler requires name parameter');
    if (name === 'Default') return this.handlers.set('Default', defaultHandler);
    return this.handlers.delete(name);
  }

  handleNotFound(req, res, next) {
    next(new NotFound());
  }

  handleError(err, req, res, next) {
    if (!err.code) {
      err.message= 'Internal Server Error';
      err.code= 500;
    }

    const handler = this.handlers.get(err.name) || this.handlers.get('Default');
    res.locals.errors = handler(err, this.stackTrace);
    next(err);
  }

  sendResponse(err, req, res, next) { // eslint-disable-line
    res.status(err.code).json(res.locals.errors);
  }

  middleware() {
    return [this.handleNotFound, this.handleError.bind(this), this.sendResponse];
  }
}
