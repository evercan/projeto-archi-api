"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidConteudoError = void 0;
class InvalidConteudoError extends Error {
    constructor(conteudo) {
        super('Invalid conteudo: ' + conteudo + '.');
        this.conteudo = 'InvalidConteudoError';
    }
}
exports.InvalidConteudoError = InvalidConteudoError;
