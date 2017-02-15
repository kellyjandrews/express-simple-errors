import request from 'supertest';
import {app, appProd} from './app';

const contentType = 'application/json; charset=utf-8';

describe('ErrorHandler Middleware', () => {
  it('catches 404 errors', (done) => {
    request(app)
    .get('/doesnotexist')
    .expect(404)
    .expect('Content-Type', contentType)
    .end((err, res) => {
      const body = res.body;
      expect(err).toBeNull();
      expect(body.status).toEqual('Error');
      expect(body.message).toEqual('Not Found');
      expect(body.code).toEqual(404);
      expect(body.stackTrace).toContain('Error: Not Found');
      done();
    });
  });

  it('catches errors from routes', (done) => {
    request(app)
    .get('/badrequest')
    .expect(400)
    .expect('Content-Type', contentType)
    .end((err, res) => {
      const body = res.body;
      expect(err).toBeNull();
      expect(body.status).toEqual('Error');
      expect(body.message).toEqual('Bad Request');
      expect(body.code).toEqual(400);
      expect(body.stackTrace).toContain('Error: Bad Request');
      done();
    });
  });

  it('catches 500 errors', (done) => {
    request(app)
    .get('/servererror')
    .expect(500)
    .expect('Content-Type', contentType)
    .end((err, res) => {
      const body = res.body;
      expect(err).toBeNull();
      expect(body.status).toEqual('Error');
      expect(body.message).toEqual('Internal Server Error');
      expect(body.code).toEqual(500);
      expect(body.stackTrace).toContain('Error: Internal Server Error');
      done();
    });
  });

  it('removes stacktrace from response if production mode', (done) => {
    request(appProd)
    .get('/badrequest')
    .expect(400)
    .expect('Content-Type', contentType)
    .end((err, res) => {
      const body = res.body;
      expect(err).toBeNull();
      expect(body.status).toEqual('Error');
      expect(body.message).toEqual('Bad Request');
      expect(body.code).toEqual(400);
      expect(body.stackTrace).toBeUndefined();
      done();
    });
  });
});
