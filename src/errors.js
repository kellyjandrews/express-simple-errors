class BadRequest extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg || 'Bad Request';
    this.code = 400;
    Error.captureStackTrace(this);
  }
}
class Unauthorized extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg || 'Unauthorized';
    this.code = 401;
    Error.captureStackTrace(this);
  }
}
class Forbidden extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg || 'Forbidden';
    this.code = 403;
    Error.captureStackTrace(this);
  }
}
class NotFound extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg || 'Not Found';
    this.code = 404;
    Error.captureStackTrace(this);
  }
}
class Conflict extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg || 'Conflict';
    this.code = 409;
    Error.captureStackTrace(this);
  }
}
class UnsupportedMediaType extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg || 'Unsupported Media Type';
    this.code = 415;
    Error.captureStackTrace(this);
  }
}


export default { BadRequest, Unauthorized, Forbidden, NotFound, Conflict, UnsupportedMediaType };
