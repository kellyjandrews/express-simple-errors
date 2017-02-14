import ErrorHandler from '../index';

describe('ErrorHandler Class', () => {
  const errors = new ErrorHandler();
  const defaultHandler = errors.handlers.get('Default').toString();
  it('returns default class', () => {
    expect(typeof errors.setHandler).toBe('function');
    expect(typeof errors.unsetHandler).toBe('function');
    expect(typeof errors.handleNotFound).toBe('function');
    expect(typeof errors.handleError).toBe('function');
    expect(typeof errors.sendResponse).toBe('function');
    expect(typeof errors.middleware).toBe('function');
    expect(defaultHandler).toBeDefined();
    expect(errors).toMatchSnapshot();
  });

  it('allows Default handler to be changed', () => {
    errors.setHandler('Default', () => {});
    expect(errors.handlers.get('Default').toString()).toEqual('function () {}');
  });

  it('restores Default handler when unset', () => {
    errors.unsetHandler('Default');
    expect(errors.handlers.get('Default').toString()).toEqual(defaultHandler);
  });

  it('allows custom handler creation', () => {
    expect(() => (errors.setHandler())).toThrow();
    expect(() => (errors.setHandler('Test'))).toThrow();
    expect(() => (errors.setHandler('Test', true))).toThrow();
    expect(() => (errors.setHandler('Test', {}))).toThrow();
    expect(() => (errors.setHandler('Test', 'Non-Function'))).toThrow();
    errors.setHandler('Test', () => {});
    expect(errors.handlers).toMatchSnapshot();
  });

  it('allows custom handler deletion', () => {
    expect(() => (errors.unsetHandler())).toThrow();
    errors.unsetHandler('Test');
    expect(errors.handlers).toMatchSnapshot();
  });
});
