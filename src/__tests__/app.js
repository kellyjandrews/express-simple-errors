import express from 'express';
import ErrorHandler, { errors } from '../index';

const app = express();
const errorHandler = new ErrorHandler();

app.get('/badrequest', () => {throw new errors.BadRequest()});
app.get('/badrequestcustom', () => {throw new errors.BadRequest('Custom')});
app.get('/servererror', () => {throw new Error()});

app.use(errorHandler.middleware());

export default app;
