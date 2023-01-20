"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTituloError = void 0;
class InvalidTituloError extends Error {
    constructor(titulo) {
        super('Invalid titulo: ' + titulo + '.');
        this.titulo = 'InvalidTituloError';
    }
}
exports.InvalidTituloError = InvalidTituloError;
