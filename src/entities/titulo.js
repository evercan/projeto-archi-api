"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Titulo = void 0;
const shared_1 = require("@/shared");
const errors_1 = require("@/entities/errors");
class Titulo {
    constructor(titulo) {
        this.value = titulo;
    }
    static create(titulo) {
        if (!Titulo.validate(titulo)) {
            return (0, shared_1.left)(new errors_1.InvalidTituloError(titulo));
        }
        return (0, shared_1.right)(new Titulo(titulo));
    }
    static validate(titulo) {
        if (!titulo) {
            return false;
        }
        if (titulo.trim().length < 2 || titulo.trim().length > 256) {
            return false;
        }
        return true;
    }
}
exports.Titulo = Titulo;
