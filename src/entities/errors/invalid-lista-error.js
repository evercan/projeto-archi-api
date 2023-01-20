"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidListaError = void 0;
class InvalidListaError extends Error {
    constructor(lista) {
        super('Invalid lista: ' + lista + '.');
        this.lista = 'InvalidListaError';
    }
}
exports.InvalidListaError = InvalidListaError;
