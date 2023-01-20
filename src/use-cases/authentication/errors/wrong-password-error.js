"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongPasswordError = void 0;
class WrongPasswordError extends Error {
    constructor() {
        super('Wrong password.');
        this.name = 'WrongPasswordError';
    }
}
exports.WrongPasswordError = WrongPasswordError;
