// Core
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { callInitializeWorker } from '../saga/workers/initialize';

const saga = cloneableGenerator(callInitializeWorker)();
const clone = saga.clone();

describe.skip('initialize saga:', () => {
    describe('should authenticate if localStorage contains a token', () => {
        localStorage.setItem('token', __.token);
        localStorage.setItem('remember', true);

        test('should extract a remember flag from localStorage', () => {
            expect(clone.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "CALL": Object {
    "args": Array [
      "remember",
    ],
    "context": null,
    "fn": [Function],
  },
}
`);
        });

        test('should extract a token from localStorage', () => {
            expect(clone.next(true).value).toMatchSnapshot();
        });

        test('should call authenticateAsync action', () => {
            expect(clone.next(__.token).value).toMatchSnapshot();
        });

        test('should finish', () => {
            const finish = clone.next();

            expect(finish.done).toBe(true);
        });
    });

    describe('should initialize if localStorage does not contain a token', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('remember');

        test('should extract no remember flag from localStorage', () => {
            expect(saga.next().value).toMatchSnapshot();
        });

        test('should extract no token from localStorage', () => {
            expect(saga.next().value).toMatchSnapshot();
        });

        test('should dispatch initialize action', () => {
            expect(saga.next().value).toMatchSnapshot();
        });

        test('should finish', () => {
            expect(saga.next().done).toBe(true);
        });
    });
});
