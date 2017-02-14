import { errors } from '../index';

describe('Error Classes', () => {
  it('allow Bad Request error', () => {
    const BadRequest = new errors.BadRequest();
    expect(BadRequest).toMatchSnapshot();
    expect(BadRequest.code).toBe(400);
    expect(BadRequest.message).toBe('Bad Request');
  });
  it('allow Unauthorized error', () => {
    const Unauthorized = new errors.Unauthorized();
    expect(Unauthorized).toMatchSnapshot();
    expect(Unauthorized.code).toBe(401);
    expect(Unauthorized.message).toBe('Unauthorized');
  });
  it('allow Forbidden error', () => {
    const Forbidden = new errors.Forbidden();
    expect(Forbidden).toMatchSnapshot();
    expect(Forbidden.code).toBe(403);
    expect(Forbidden.message).toBe('Forbidden');
  });
  it('allow Not Found error', () => {
    const NotFound = new errors.NotFound();
    expect(NotFound).toMatchSnapshot();
    expect(NotFound.code).toBe(404);
    expect(NotFound.message).toBe('Not Found');
  });
  it('allow Conflict error', () => {
    const Conflict = new errors.Conflict();
    expect(Conflict).toMatchSnapshot();
    expect(Conflict.code).toBe(409);
    expect(Conflict.message).toBe('Conflict');
  });
  it('allow Unsupported Media Type error', () => {
    const UnsupportedMediaType = new errors.UnsupportedMediaType();
    expect(UnsupportedMediaType).toMatchSnapshot();
    expect(UnsupportedMediaType.code).toBe(415);
    expect(UnsupportedMediaType.message).toBe('Unsupported Media Type');
  });
});
