"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conteudo = void 0;
const shared_1 = require("@/shared");
const errors_1 = require("@/entities/errors");
class Conteudo {
    constructor(conteudo) {
        this.value = conteudo;
    }
    static create(conteudo) {
        if (!Conteudo.validate(conteudo)) {
            return (0, shared_1.left)(new errors_1.InvalidConteudoError(conteudo));
        }
        return (0, shared_1.right)(new Conteudo(conteudo));
    }
    static validate(conteudo) {
        if (!conteudo) {
            return false;
        }
        if (conteudo.trim().length < 2 || conteudo.trim().length > 256) {
            return false;
        }
        return true;
    }
}
exports.Conteudo = Conteudo;
