Express Simple Errors
=====================

[ ![Codeship Status for kellyjandrews/express-simple-errors](https://app.codeship.com/projects/189af840-d5c2-0134-7072-760f9433d903/status?branch=master)](https://app.codeship.com/projects/202568)
[![Jest Code Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)]()
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

### Using Error Handling Middleware
```js
import express from 'express';
import ErrorHandler, { errors } from 'express-simple-errors';

const app = express();
const errorHandler = new ErrorHandler();

app.use(errorHandler.middleware());
```

The `middleware` method will handle `NotFound` errors, all errors from routing, and then send the response.  You can use these as one simple function, or you can use them individually.

```js
import express from 'express';
import ErrorHandler, { errors } from 'express-simple-errors';

const app = express();
const errorHandler = new ErrorHandler();

app.use(errorHandler.handleNotFound()); //creates new NotFound() error
app.use(errorHandler.handleError()); // builds error response and stores it in res.locals.errors
app.use(errorHandler.sendResponse()); //sends error code and response
```

You could inject middleware after the `handleError` method. The original `err` object will be intact for you to consume before passing to `sendResponse`.

The stackTrace is included with the default handler method.  You can turn this off when you initialize.

```js
const errorHandler = new ErrorHandler({stackTrace: false});
```


### Customizing the Response Object
You can modify the default handler, or create a custom one for more specific needs.  The handlers are called based on the errors `name` property. All error classes included with this module are "Error", and the handler used will be "Default".

```js
const defaultHandler = (err, stack) => {
  const res = {};
  res.status= err.name;
  res.message= err.message;
  res.code= err.code;
  if (stack) res.stackTrace= err.stack;
  return res;
};
```
Each handler will be passed two parameters - the `err` object, and the `stackTrace` flag.

To modify the `Default` handler, or create a custom handler, you can use the `setHandler` method.

```js

errors.setHandler('Default', (err, stack) => {
  return {
    status: 'error',
    data: err.message
  }
});

errors.setHandler('Custom', (err, stack) => ('You have encountered an error.')});
```



### Creating Error Responses

```js
import { errors } from 'express-simple-errors';

// basic example
function foo(bar) {
  if !(bar) throw new errors.Conflict();
}

//custom message
function foo(bar) {
  if !(bar) throw new errors.Conflict('You are missing something!');
}

//used as route middleware functions
function checkUser(req, res, next) {
  try {
    const user = //do stuff to check for unser;
    if (!user) return next(new errors.NotFound('This user does not exist'));
    next();
  } catch(e) {
    next(e);
  }
}

router.route(/)
  .get(checkUser)

```

### Supported Error Codes
+ **400** BadRequest
+ **401** Unauthorized
+ **403** Forbidden
+ **404** NotFound
+ **409** Conflict
+ **415** UnsupportedMediaType
